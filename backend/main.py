from aiohttp import web
import socketio
from multiprocessing import Queue
import random


HOST = '192.168.0.56'
PORT = 5050

sio = socketio.AsyncServer(cors_allowed_origins = 'http://localhost:8080')

app = web.Application()
sio.attach(app)

clients = set()
clientsData = {}

@sio.event
def connect(sid, environ):
    clients.add(sid)
    print(sid, "connected")
    print(clients)

@sio.event
async def disconnect(sid):
    clients.remove(sid)
    clientsData.pop(sid)
    for client in clients:
        if client != sid:
            await sio.emit("playerKilled", sid, to=client)

@sio.on('updatePlayerInfo')
async def update(sid, data):
    client = clientsData.get(sid, None)
    if client is not None:
        clientsData.pop(sid)
    await sio.emit("updateEnnemiesData", list(clientsData.values()), to=sid);
    clientsData[sid] = (data, sid)

@sio.on('kill')
async def kill(sid, sidKilled):
    print(f"{sidKilled} was killed !")
    clientsData.pop(sidKilled)
    await sio.emit("die", to=sidKilled)
    for client in clients:
        if client != sidKilled:
            await sio.emit("playerKilled", sidKilled, to=client)

if __name__ == '__main__':
    web.run_app(app, port = PORT)