let Behaviors = function(client){

}

Behaviors.prototype.swordHitEnnemy = function(sword, ennemy, client, ennemyHander){
    client.sendKill(ennemy.id);
}

export { Behaviors };
