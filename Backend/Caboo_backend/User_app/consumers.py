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
    trip_id = None
    
    @sync_to_async
    def get_tripdata(self,trip_id):
       from User_app.models import TripDetails
       
       try:
           trip_data=TripDetails.objects.filter(id=trip_id).first()
           print(trip_data,"trip data get")
           data={
               "user_id":trip_data.user_id,
               "driver_id":trip_data.driver_id
           }
           return data
       except Exception as e:
           print(f"get trip data error {e}")  
      
    
    @sync_to_async
    def RideStatus(self,user):
        from Authentication_app.models import CustomUser
        try:
            return CustomUser.objects.filter(id=user,ride=False).first()
        except Exception as e:
            print(f"Ride status error {e}")
    
    @sync_to_async
    def updateRide(self,user_id,driver_id,data):
        
        from User_app.serializer import UserSerializer,WalletSerializer
        from Authentication_app.models import CustomUser
        from User_app.models import UserWallet
        print('yes it is working ')
        print(user_id,'user_id')
        print(driver_id,'driver_id')
        print(data,'data')
        try:
           if user_id and driver_id:
                user = CustomUser.objects.get(id=user_id)
                driver = CustomUser.objects.get(id=driver_id)
              
                if user and driver:
                    if 'wallet' in data:
                        pay_amount = int(data['wallet'])
                        print(pay_amount,'pay amount')
                        data['wallet']=int(user.wallet) - int(data['wallet'])
                        print(data,'data after updation')
                        
                    userserializer = UserSerializer(user, data, partial=True)
                if userserializer.is_valid():
                    userserializer.save()
                else:
                    print('User serializer error:', userserializer.errors)
                    return False
                
                # Update driver data
                ride = data.get('ride', {})
                print(ride,'user ride status')
                driverserializer = UserSerializer(driver,{'ride': ride}, partial=True)
                if driverserializer.is_valid():
                    driverserializer.save()
                else:
                    print('Driver serializer error:', driverserializer.errors)
                    return False
                
                # Handle wallet transaction if 'wallet' is in data
                if 'wallet' in data:
                    print(pay_amount,'pay amount')

                    wallet_data = {
                        "customuser": user.id,
                        "amount": pay_amount,
                        "reason": "Trip payment",
                        "status": "pay"
                    }
                    print(wallet_data,'wallet data')
                    wallet_serializer = WalletSerializer(data=wallet_data)
                    if wallet_serializer.is_valid():
                        wallet_serializer.save()
                    else:
                        print('Wallet serializer error:', wallet_serializer.errors)
                        return False
                
                print('yes working all fine')
                return True
                         
        except Exception as e:
            print(f"update ride error {e}")
       
    
    @sync_to_async
    def Trip_update(self,data,trip_id):
        from .serializer import TripSerializer
        from .models import TripDetails
        print(data,'trip updation is working')
        try:
        
            if 'payment_type' in data:
                update_data = {
                    "payment_type" : data['payment_type'],
                    "status":data['status']
                }
            else:
                update_data={
                    "status":data
                }
                
            trip = TripDetails.objects.filter(id=trip_id).first()
            print(trip,'trip data ')
            serializer = TripSerializer(trip,data=update_data,partial=True)
            if serializer.is_valid():
                serializer.save()
                
                return "successfully update"

            else:
                print('Trip update error :',serializer.errors)
        except Exception as e:
        
           print(f"error {e}")

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
            LocationConsumer.trip_id=serializer.data['id']
            return serializer.data
        else:
            print(serializer.errors ,'yes this error is working')
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
        
        from Driver_app.serializer import DriverDataSerializer
        
        return DriverDataSerializer(driver, many=True).data
    
    async def Ride_Acceptance(self, data):
        try:
            print('yes ride accpet is working')
            userData = data['ride_data']['userRequest']
            driverId = data['driver_id']
            userId = data['ride_data']['userRequest']['user_id'] 
            
            OTP = str(random.randint(1000, 9999))

            if userId and driverId and data :
                print("yes working id data",data)
                print(data['driver_id'],'driver id in acceptence')
                LocationConsumer.driver_id=data['driver_id']
                tripdata = {
                    'user': userId,
                    'driver': driverId,
                    'location': userData['places']['location'],
                    'destination': userData['places']['destination'],
                    'distance': userData['distance']['distance']['text'],
                    'duration': userData['distance']['duration']['text'],
                    'amount': userData['price'],
                    'tripOTP': OTP,
                    'status': 'pending'
                }
                
                save_trip = await self.Save_trip(tripdata)

                if save_trip:
                    driverdata = await self.Get_driverdata(save_trip['driver'])

                    if driverdata:
                        print('yes diver data is working ')
                        driver = await self.serialize_driver_data(driverdata)
                        print(driver,'dirver after also working')
                        if driver:
                            print('yes it is working ',driver)
                            data={
                                    'ride':True
                                }
                            result=await self.updateRide(userId,driverId,data)
                            if result:
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
                
            elif 'userRequest' in data and 'type' in data['userRequest']:
                LocationConsumer.drivers_distance.clear()
                LocationConsumer.drivers_location.clear()
                LocationConsumer.user_data.clear()
                LocationConsumer.drivers.clear()
                LocationConsumer.driver_count.clear()

                
                user_id=data['userRequest']['user_id']
                result = await self.RideStatus(user_id)
                if result:
                   LocationConsumer.user_id=user_id
                   await self.handle_user_request(data)
                   
                else:
                    
                    await self.channel_layer.group_send(
                            f'user_{user_id}', 
                            {
                                'type': 'SuccessNotification',
                                'status': 'User already in a ride ',
                                'message': 'User already in a ride. first finish current ride then try again .',
                            }
                        )
            elif 'rideRequestResponse' in data:
                
                if data['rideRequestResponse'] == 'accepted':
                    result = await self.Ride_Acceptance(data)
                    print(result,'result')

                    if result:
                        id = result['trip_data']['id']
                        print(id,'trip id ')

                        driver_id = result['trip_data']['driver']
                        print(driver_id,'request notification for driver')
                        LocationConsumer.drivers_distance.clear()
                        LocationConsumer.driver_count.clear()
                        
                        user_id = result['trip_data']['user']

                        await asyncio.sleep(3)  
                        
                        await self.channel_layer.group_send(
                            f'driver_{driver_id}',
                            {
                                'type': 'notify_user',
                                'trip_id' : id
                            }
                        )
                        
                        await self.channel_layer.group_send(
                            f'user_{user_id}', 
                            {
                                'type': 'notify_user',
                                'user_data': data,
                                'tripdata' : result,
                                'trip_id' : id
                            }
                        )
                        
                        
                       
                    else:
                        print("error result is empty")
                  
                elif data['rideRequestResponse'] == 'declined':
                    print(LocationConsumer.drivers_distance,'decline driver distance')
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
                
                trip_data = await self.get_tripdata(data['trip_id'])
                
                print(trip_data,'trip driver and user ')
                
                if 'tripOTP' in result and 'driver' in result and trip_data:
                    
                    
                    
                    await self.channel_layer.group_send(
                            f'user_{trip_data['user_id']}', 
                            {
                                'type': 'SuccessNotification',
                                'status': 'OTP_success',
                                'message': 'OTP validation succeeded. Trip is confirmed.',
                            }
                        )
                    
                    
                    await self.channel_layer.group_send(
                       f'driver_{trip_data['driver_id']}',
                       {
                        
                        'type' : 'SuccessNotification',
                        'status': 'OTP_success',
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
                    
            elif 'ride_complete' in data:
                
                result = await self.Trip_update("complete",data['trip_id'])
                trip_data = await self.get_tripdata(data['trip_id'])
                if result == 'successfully update' and trip_data:

                    await self.channel_layer.group_send(
                            f'user_{trip_data['user_id']}', 
                            {
                                'type': 'SuccessNotification',
                                'status': 'Trip complete',
                                'message': 'Trip complete succesfully.',
                            }
                        )
                
            elif 'userRequest' in data and 'payment_type' in data['userRequest']:
                                
                    trip_data = await self.get_tripdata(data['userRequest']['trip_id'])
                    print(trip_data, 'driver id payment')

                    if data['userRequest']['payment_type']=='cashinhand' and trip_data:
                        await self.channel_layer.group_send(
                        f'driver_{trip_data['driver_id']}',
                        {
                            
                            'type' : 'SuccessNotification',
                            'status': 'Payment verification',
                            'message': data,
                            
                        }  
                        )
                    elif data['userRequest']['payment_type'] =='wallet' and trip_data:
                        
                          print(data,'payment type')
                          amount = data['userRequest']['amount']
                          result = await self.Trip_update({'payment_type' : data['userRequest']['payment_type'],'status': 'completed'},data['userRequest']['trip_id'])
                          if result == 'successfully update' and amount:
                                data = {
                                'ride':False,
                                'wallet':amount
                                }
                                update = await self.updateRide(trip_data['user_id'],trip_data['driver_id'],data) 
                                if update:
                                    await self.channel_layer.group_send(
                                        f'driver_{trip_data['driver_id']}',
                                        {
                                            
                                            'type' : 'SuccessNotification',
                                            'status': 'payment completed',
                                            'message': data,
                                            
                                        }  
                                    )       
                                    
                                    await asyncio.sleep(1)  

                                    await self.channel_layer.group_send(
                                        f'user_{trip_data['user_id']}', 
                                        {
                                            'type': 'SuccessNotification',
                                            'status': 'payment completed',
                                            'message': 'Trip complete successfylly',
                                        }
                                    )       
                                    
                                    
                    elif data['userRequest']['payment_type'] =='razorpay' and trip_data:
                        print("yes here is working")
                        amount = data['userRequest']['amount']
                        result = await self.Trip_update({'payment_type' : data['userRequest']['payment_type'],'status': 'completed'},data['userRequest']['trip_id'])
                        if result == 'successfully update' and amount:
                                data = {
                                'ride':False,
                                }
                                update = await self.updateRide(trip_data['user_id'],trip_data['driver_id'],data) 
                                if update:
                                    await self.channel_layer.group_send(
                                        f'driver_{trip_data['driver_id']}',
                                        {
                                            
                                            'type' : 'SuccessNotification',
                                            'status': 'payment completed ',
                                            'message': data,
                                            
                                        }  
                                    )       
                                    
                                    await asyncio.sleep(3)  

                                    await self.channel_layer.group_send(
                                        f'user_{trip_data['user_id']}', 
                                        {
                                            'type': 'SuccessNotification',
                                            'status': 'payment completed',
                                            'message': 'Trip complete successfylly',
                                        }
                                    )       
                                
                    else:
                        print('payment reach user side error')
            elif 'payment received' in data:
                
                result = await self.Trip_update({'payment_type' : data['payment received'],'status': 'completed'},data['trip_id'])
                trip_data = await self.get_tripdata(data['trip_id'])
                if result == 'successfully update' and trip_data:
                    data = {
                    'ride':False
                    }
                    update = await self.updateRide(trip_data['user_id'],trip_data['driver_id'],data)
                    if update:
                        await self.channel_layer.group_send(
                                f'user_{trip_data['user_id']}', 
                                {
                                    'type': 'SuccessNotification',
                                    'status': 'payment completed',
                                    'message': 'Trip complete successfylly',
                                }
                            )
                    else:
                        print('trip update error in payment received')
                        
            elif 'usertripcancel' in data:
                
                trip_id=data['usertripcancel']['trip_id']
                result = await self.Trip_update("cancelled",trip_id)
                print(result,'after updation result')
                if result == 'successfully update':
                    
                    ids= await self.get_tripdata(trip_id)
                    if ids:
                        data = {
                            'ride':False
                        }
                        update = await self.updateRide(ids['user_id'],ids['driver_id'],data)
                        print(update,'update value is working')
                        if update:
                            await self.channel_layer.group_send(
                            f'driver_{ids['driver_id']}',
                            {
                                
                                'type' : 'SuccessNotification',
                                'status': 'Trip cancel',
                                'message': 'User want cancel this trip',
                                
                            }  
                            )
                    else:
                        print('trip update error user trip cancel')
                    
            elif 'drivertripcancel' in data:
               
                trip_id=data['trip_id']
                
                result = await self.Trip_update("cancelled",trip_id)
                
                if result == 'successfully update':
                    ids= await self.get_tripdata(trip_id)
                    data = {
                            'ride':False
                        }
                    update = await self.updateRide(ids['user_id'],ids['driver_id'],data)
                    print(update,'update value is working')
                    if update:
                        await self.channel_layer.group_send(
                                f'user_{ids['user_id']}', 
                                {
                                    'type': 'SuccessNotification',
                                    'status': 'Trip cancel',
                                    'message': 'Driver want cancel this trip',
                            
                                }
                            )                
                    else:
                        print("error trip updation error in driver cancel")
                        
            elif 'paymentdetails' in data:
                
                print('yes payment coming')

            else:
                print(f"Received unknown data format: {data}")
        except json.JSONDecodeError:
            print(f"Failed to decode JSON: {text_data}")
        except Exception as e:
            print(f"Error in receive: {e}")

    async def handle_driver_location(self, data):
        driver_id = data.get('id')
        location = data.get('Driverlocation')
        
        if driver_id and location:
            await self.save_driver_location(driver_id, location)
            LocationConsumer.drivers_location[driver_id] = location
            print(LocationConsumer.driver_count,'driver count')
            print(LocationConsumer.drivers_location,'driver location')
            if LocationConsumer.driver_count.issubset(LocationConsumer.drivers_location.keys()):
                await self.all_drivers_location()

    async def handle_user_request(self, data):
        
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
        userdata = apps.get_model('Authentication_app','CustomUser')
        DriverData = apps.get_model('Authentication_app', 'DriverData')
        print(user_id,'user id in get user')
        try:
            tripstatus=None
            
            driver = DriverData.objects.filter(customuser=user_id, current_Status=True).first()
            print(driver,'driver id get type')
            if driver:
                
               tripstatus = userdata.objects.filter(email=driver.customuser,ride=False)
               
            if tripstatus:
                    return 'driver'
            elif not driver and not tripstatus :
            
                return 'user'
            
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
        
        print(event,'yes noifiy user is working ')
        await self.send(text_data=json.dumps({
            'type': 'ride_accepted',
            'data': event
        }))


    async def OTP_faild(self,event):
        
        await self.send(text_data=json.dumps({
            
            'type' : 'otp validation faild '
            
        }))
    
    async def SuccessNotification(self, event):
        
        print(event,'yes this working success')
        await self.send(text_data=json.dumps({
            'type': event['status'],
            'message': event['message'],
        }))