# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract user_id and driver_id from the URL or request
        self.roomId = self.scope['url_route']['kwargs']['roomId']
        # self.driver_id = self.scope['url_route']['kwargs']['driver_id']

        # Generate a unique room name for the chat between the user and driver
        self.room_name = f'chat_{self.roomId}'
        self.room_group_name = self.room_name  # Unique room for each conversation

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
      
        print(data,'message')
        connect_id=data['connectId']
        await self.channel_layer.group_send(
            f'chat_{connect_id}',
            {
                'type': 'chat_message',
                'message': data,
                'user_id': connect_id,
            }
        )

    # Handle receiving a message from the room group
    async def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user_id': user_id,
        }))
