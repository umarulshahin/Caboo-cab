import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        from django.contrib.auth.models import AnonymousUser

        self.user = self.scope['user']
        print(self.user,'user in chat')
        if isinstance(self.user, AnonymousUser):
            await self.close()
            return 

        self.roomId = self.scope['url_route']['kwargs']['roomId']
        self.room_name = f'chat_{self.roomId}'
        self.room_group_name = self.room_name 

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Check if room_group_name is set before using it
        if hasattr(self, 'room_group_name'):
            # Leave the room group
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data, 'chat data received ')
        connect_id = data['connectId']
        await self.channel_layer.group_send(
            f'chat_{connect_id}',
            {
                'type': 'chat_message',
                'message': data,
                'user_id': connect_id,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user_id': user_id,
        }))
