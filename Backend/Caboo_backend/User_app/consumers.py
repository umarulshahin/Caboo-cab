import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from django.apps import apps
from channels.db import database_sync_to_async

class LocationConsumer(AsyncJsonWebsocketConsumer):        
    
    @database_sync_to_async
    def save_driver_location(self,Driver_id,Location):
        from User_app.models import DriverLocation

        try:
            DriverLocation.objects.create(
                driver_id=Driver_id,
                location=Location 
            )
        except Exception as e:
            print(f'driver location saving error:{e}')
        
        
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']

        self.user_type = await self.get_user_type(self.user_id)
        if self.user_type == 'driver':
            self.room_group_name = f'driver_{self.user_id}'
            await self.channel_layer.group_add('all_drivers', self.channel_name)
        else:
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
            print(data,'all data')
            if 'Driverlocation' in data:
                await self.handle_driver_location(data)
            elif 'userRequest' in data:
                await self.handle_user_request(data)
            else:
                print(f"Received unknown data format: {data}")
        except json.JSONDecodeError:
            print(f"Failed to decode JSON: {text_data}")
        except Exception as e:
            print(f"Error in receive: {e}")

    async def handle_driver_location(self, data):
        
        driver_id = data.get('id')
        location = data.get('Driverlocation')
        
        try:
            await self.save_driver_location(driver_id,location)

        except Exception as e:
            print( f"somthing wrong {e}")        
        
        
    async def handle_user_request(self, data):
        # Broadcast location request to all drivers
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
            return 'user'  # Default to user if there's an error
        
