from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from django.apps import apps
from channels.db import database_sync_to_async
import json
from math import radians, sin, cos, sqrt, atan2
import random
import asyncio

class LocationConsumer(AsyncJsonWebsocketConsumer):
    drivers_location = {}
    expected_drivers = set()
    user_data = {}
    drivers = set()
    drivers_distance = []
    driver_count = set()
    user_id = 0
    
    @sync_to_async
    def otp_validate(self,data):
        from .serializer import OTPValidationSerializer
        
        otp_data ={
            'tripOTP':data['Otp_data']['otp'],
            'driver' : data['Otp_data']['driver_id']
        }
        print(otp_data,'otp_data')
        serializer= OTPValidationSerializer(data=otp_data)
        
        if serializer.is_valid():
            return serializer.validated_data
        
        else:
            return {'error':serializer.errors}
        
        
    @sync_to_async
    def Save_trip(self,tripdata):
        from .serializer import TripSerializer
        
        serializer = TripSerializer(data=tripdata)
        if serializer.is_valid():
            serializer.save()
            
            return serializer.data
        else:
            print(serializer.errors)
            return None
    
    @sync_to_async
    def Get_driverdata(self, data):
        print(data, 'call is coming get driver data')
        from Authentication_app.models import CustomUser, DriverData
        
        try:
            return list(DriverData.objects.filter(customuser=data).prefetch_related('customuser'))
        except Exception as e:
            print(f"error get driver {e}")
            return None
            
    @sync_to_async
    def serialize_driver_data(self, driver):
        print(driver, 'call is coming serializer')
        from Driver_app.serializer import DriverDataSerializer
        
        return DriverDataSerializer(driver, many=True).data
    
    async def Ride_Acceptance(self, data):
        try:
            userData = LocationConsumer.user_data['userRequest']
            user_id = LocationConsumer.user_id
            
            OTP = str(random.randint(1000, 9999))

            if user_id and data:
                tripdata = {
                    'user': user_id,
                    'driver': data['driver_id'],
                    'location': userData['places']['location'],
                    'destination': userData['places']['destination'],
                    'distance': userData['distance']['distance']['text'],
                    'duration': userData['distance']['duration']['text'],
                    'amount': userData['price'],
                    'tripOTP': OTP,
                    'status': 'pending'
                }

                save_trip = await self.Save_trip(tripdata)
                print(save_trip, 'tripdata')

                if save_trip:
                    driverdata = await self.Get_driverdata(save_trip['driver'])
                    print(driverdata, 'driver data is working')

                    if driverdata:
                        print(driverdata, 'driver data')
                        driver = await self.serialize_driver_data(driverdata)
                        
                        return {
                            'trip_data': save_trip,
                            'driver_data': driver
                        }
                    else:
                        print('No driver data found')
                else:
                    print('Failed to save trip')
            else:
                print('Ride Acceptance Error: User or Driver is None')

        except Exception as e:
            print(f"Ride Acceptance Error: {e}")
            return None
        
    @database_sync_to_async
    def save_driver_location(self, Driver_id, Location):
        from User_app.models import DriverLocation
        try:
            DriverLocation.objects.create(
                driver_id=Driver_id,
                location=Location
            )
        except Exception as e:
            print(f'Driver location saving error: {e}')
    
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.user_type = await self.get_user_type(self.user_id)
        
        if self.user_type == 'driver':
            LocationConsumer.driver_count.add(int(self.user_id))
            self.room_group_name = f'driver_{self.user_id}'
            await self.channel_layer.group_add('all_drivers', self.channel_name)
        else:
            LocationConsumer.user_id = self.user_id
            self.room_group_name = f'user_{self.user_id}'
            await self.channel_layer.group_add('all_users', self.channel_name)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        if self.user_type == 'driver':
            await self.channel_layer.group_discard('all_drivers', self.channel_name)
        else:
            await self.channel_layer.group_discard('all_users', self.channel_name)
    
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            print(data, 'received data')
            
            if 'Driverlocation' in data:
                await self.handle_driver_location(data)
                
            elif 'userRequest' in data:
                LocationConsumer.drivers_distance.clear()
                LocationConsumer.drivers_location.clear()
                LocationConsumer.drivers.clear()
                await self.handle_user_request(data)
                
            elif 'rideRequestResponse' in data:
                if data['rideRequestResponse'] == 'accepted':
                    result = await self.Ride_Acceptance(data)
                    print(result,'result')

                    if result:
                        
                        await self.channel_layer.group_send(
                            f'user_{LocationConsumer.user_id}', 
                            {
                                'type': 'notify_user',
                                'user_data': data,
                                'tripdata' : result
                            }
                        )
                    else:
                        print("error result is empty")
       

                                
                elif data['rideRequestResponse'] == 'declined':
                    if LocationConsumer.drivers_distance:
                        value = list(LocationConsumer.drivers_distance.pop(0))
                        await self.channel_layer.group_send(
                            f'driver_{value[0]}',
                            {
                                'type': 'Ride_request',
                                'driver_id': value[0],
                                'user_data': LocationConsumer.user_data
                            }
                        )
                    else:
                        print(LocationConsumer.user_id, 'user id')
                        
            elif 'Otp_data' in data:
                result = await self.otp_validate(data)
                
                if 'tripOTP' in result and 'driver' in result:
                    
                    await self.channel_layer.group_send(
                            f'user_{LocationConsumer.user_id}', 
                            {
                                'type': 'OTP_success',
                                'message': 'OTP validation succeeded. Trip is confirmed.',

                                
                            }
                        )
                    
                    id=data['Otp_data']['driver_id']
                    await self.channel_layer.group_send(
                       f'driver_{id}',
                       {
                        
                        'type' : 'OTP_success',
                        'message': 'OTP validation succeeded. You can start the trip.',

                       }
                       
                    )
                    
                elif 'error' in result:
                    id=data['Otp_data']['driver_id']
                    await self.channel_layer.group_send(
                       f'driver_{id}',
                       {
                        
                        'type' : 'OTP_faild'

                       }
                       
                    )
                
            else:
                print(f"Received unknown data format: {data}")
        except json.JSONDecodeError:
            print(f"Failed to decode JSON: {text_data}")
        except Exception as e:
            print(f"Error in receive: {e}")

    async def handle_driver_location(self, data):
        print('handle driver location is working')
        driver_id = data.get('id')
        location = data.get('Driverlocation')
        
        
        
        if driver_id and location:
            await self.save_driver_location(driver_id, location)
            LocationConsumer.drivers_location[driver_id] = location
            
            if LocationConsumer.driver_count.issubset(LocationConsumer.drivers_location.keys()):
                await self.all_drivers_location()

    async def handle_user_request(self, data):
        print("yes handle user is working")
        
        LocationConsumer.user_data = data
        await self.channel_layer.group_send(
            'all_drivers',
            {
                'type': 'request_location',
                'user_id': self.user_id
            }
        )

    async def send_driver_location(self, event):
        await self.send(text_data=json.dumps({
            'type': 'driver_location',
            'driver_id': event['driver_id'],
            'location': event['location']
        }))

    async def request_location(self, event):
        await self.send(text_data=json.dumps({
            'type': 'location_request',
            'user_id': event['user_id']
        }))

    @sync_to_async
    def get_user_type(self, user_id):
        DriverData = apps.get_model('Authentication_app', 'DriverData')
        try:
            driver = DriverData.objects.filter(customuser=user_id, current_Status=True).first()
            return 'driver' if driver else 'user'
        except Exception as e:
            print(f"Error in get_user_type: {e}")
            return 'user'
    
    async def all_drivers_location(self):
        print('all drivers is working')
        LocationConsumer.drivers_distance.clear()
        LocationConsumer.drivers.clear()
        DriverLocation = apps.get_model('User_app', 'DriverLocation')

        userLocation = LocationConsumer.user_data.get('userRequest', {}).get('place_code', {}).get('location')
        if not userLocation:
            print("User location not available")
            return

        user_lat = userLocation.get('lat')
        user_lng = userLocation.get('lng')
        if not user_lat or not user_lng:
            print("User latitude and longitude missing")
            return

        for driver_id, location in LocationConsumer.drivers_location.items():
            driver_lat = location.get('latitude')
            driver_lng = location.get('longitude')
            if driver_lat and driver_lng:
                distance = await self.distance_calculation(user_lat, user_lng, driver_lat, driver_lng)
                LocationConsumer.drivers.add((driver_id, distance))
                
        if LocationConsumer.drivers:
            LocationConsumer.drivers_distance = list(LocationConsumer.drivers)
            LocationConsumer.drivers_distance.sort(key=lambda x: x[1])
            value = list(LocationConsumer.drivers_distance.pop(0))
            await sync_to_async(lambda: DriverLocation.objects.all().delete())()
              
            await self.channel_layer.group_send(
                f'driver_{value[0]}',
                {
                    'type': 'Ride_request',
                    'driver_id': value[0],
                    'user_data': LocationConsumer.user_data
                }
            )
        else:
            print("No drivers found")

    async def distance_calculation(self, user_lat, user_lng, driver_lat, driver_lng):
        R = 6371
        dlat = radians(driver_lat - user_lat)
        dlon = radians(driver_lng - user_lng)
        a = sin(dlat / 2) ** 2 + cos(radians(user_lat)) * cos(radians(driver_lat)) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        return distance

    async def Ride_request(self, event):
        print("Ride request sent to driver")
        await self.send(text_data=json.dumps({
            'type': 'Riding_request',
            'driver_id': event['driver_id'],
            'user_data': LocationConsumer.user_data
        }))
    
    async def notify_user(self, event):
        print(event, "notify user is working")
        await self.send(text_data=json.dumps({
            'type': 'ride_accepted',
            'data': event
        }))


    async def OTP_faild(self,event):
        
        await self.send(text_data=json.dumps({
            
            'type' : 'otp validation faild '
            
        }))
    
    async def OTP_success(self, event):
        await self.send(text_data=json.dumps({
            'type': event['type'],
            'message': event['message'],
        }))