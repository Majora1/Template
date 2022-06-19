from aiohttp import web
import socketio
from multiprocessing import Queue
import threading
import time
from promise import Promise


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
def disconnect(sid):
    clients.remove(sid)
    clientsData.pop(sid)
    print(sid, "disconnected")

@sio.on('updatePlayerInfo')
async def update(sid, data):
    client = clientsData.get(sid, None)
    if client is not None:
        clientsData.pop(sid)
    #print("---------------------------------")
    #print(list(clientsData.values()))
    await sio.emit("updateEnnemiesData", list(clientsData.values()), to=sid);
    clientsData[sid] = (data, sid)

if __name__ == '__main__':
    web.run_app(app, port = PORT)