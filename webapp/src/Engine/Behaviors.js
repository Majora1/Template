import { Client } from './../Network/Client.js'

let Behaviors = function(client){

}

Behaviors.prototype.swordHitEnnemy = function(sword, ennemy, client){
    client.sendKill(ennemy.id);
}

export { Behaviors };
