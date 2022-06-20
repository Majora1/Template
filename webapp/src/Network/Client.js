import { io } from "socket.io-client";

let Client = function(){
    var host = '192.168.1.56';
    var port = '5050';
    this.game;
    this.ennemiesData = [];
    this.socket = io(`${host}:${port}`);
    this.socket.on("connect", () => {
        console.log(this.socket.id);
    });
    this.socket.on("updateEnnemiesData", (ennemiesData) => {
        this.ennemiesData = ennemiesData;
    });
    this.socket.on("die", () => {
        console.log("I'm dead");
        this.game.killPlayer();
    });
    this.socket.on("playerKilled", (playerKilled) => {
        console.log("client playerKilled", playerKilled);
        this.game.eraseEnnemy(playerKilled);
    });
}

Client.prototype.sendText = function(text){
    this.socket.emit("sendText", text);
}

Client.prototype.sendPlayerInfo = function(playerInfo){
    if (this.game.checkState("inGame")) this.socket.emit("updatePlayerInfo", playerInfo);
}

Client.prototype.sendKill = function(idKilled){
    console.log(idKilled, "was killed !");
    this.socket.emit("kill", idKilled);
}

Client.prototype.getEnnemyData = function(){
    return this.ennemiesData;
}

Client.prototype.setGame = function(game){
    this.game = game;
}

export { Client };