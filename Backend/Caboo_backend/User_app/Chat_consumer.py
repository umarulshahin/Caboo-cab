import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        from django.contrib.auth.models import AnonymousUser

        self.user = self.scope['user']
        print(self.user,'user in chat')
        if isinstance(self.user, AnonymousUser):
            print('yes its working')
            await self.close(code=4001)
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
        if hasattr(self, 'room_group_name'):
            # Leave the room group
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data, 'chat data received ')
      
        message_type = data['type']


        print(message_type,'message type ')
        
        if message_type == 'received':
                user_id = data.get('user_id','')
                message_id = data['message_id']
                if user_id:
                    await self.channel_layer.group_send(
                    f'chat_{user_id}',
                    {
                        'type': 'delivery_confirmation',
                        'status': 'delivered',
                        'message_id': message_id,
                    }
                )
                else:
                    print('user id is missing')
                    
                    
        elif message_type == 'sendMessge'  :
            
            connect_id = data['connectId']
            message_id = data.get('messageId', '')

            
            await self.channel_layer.group_send(
            f'chat_{connect_id}',
            {
                'type': "chat_message",
                'message': data['message'],
                'user_id': self.roomId,
                'message_id': message_id
            }
        )
        
        # await self.send(text_data=json.dumps({
        #         'type': "delivery_status",
        #         'status': 'delivered',
        #         'message_id': message_id,
        #     }))

    async def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']
        message_id = event['message_id']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': message,
            'user_id': user_id,
            'message_id':message_id
        }))
          
          
        
    async def delivery_confirmation(self, event):
        await self.send(text_data=json.dumps({
            'type': 'delivery_status',
            'status': 'delivered',
            'message_id': event['message_id'],
        }))