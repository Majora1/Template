let Behaviors = function(scene){
    this.scene = scene;
}

Behaviors.prototype.swordHitEnnemy = function(sword, ennemy){
    ennemy.dispose();
}

export { Behaviors };
