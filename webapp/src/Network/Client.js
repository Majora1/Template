import { io } from "socket.io-client";

let Client = function(){
    var host = '192.168.1.56';
    var port = '5050';
    this.ennemiesData = [];
    this.socket = io(`${host}:${port}`);
    this.socket.on("connect", () => {
        console.log(this.socket.id);
    });
    this.socket.on("updateEnnemiesData", (ennemiesData) => {
        this.ennemiesData = ennemiesData;
        //console.log("Data received", ennemiesData);
    })
}

Client.prototype.sendText = function(text){
    this.socket.emit("sendText", text);
}

Client.prototype.sendPlayerInfo = function(playerInfo){
    //console.log(playerInfo);
    this.socket.emit("updatePlayerInfo", playerInfo);
}

Client.prototype.getEnnemyData = function(){
    return this.ennemiesData;
}

export { Client };