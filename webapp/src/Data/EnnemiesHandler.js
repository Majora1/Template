import { Vector3 } from '@babylonjs/core';
import { Ennemy } from './../Elements/Ennemy.js';

let EnnemiesHandler = function(scene, model){
    this.scene = scene;
    this.model = model;
    this.ennemies = {};
    this.arrayEnnemies = [];
}

EnnemiesHandler.prototype.updateEnnemies = function(newData){
    this.arrayEnnemies = []
    newData.forEach(data => {
        let d = data[0];
        let id = data[1];
        if (!(id in this.ennemies)){
            let newEnnemy = new Ennemy(this.scene, new Vector3(d.position.x, d.position.y, d.position.z), {...this.model}, id);
            this.ennemies[id] = newEnnemy;
        }
        this.ennemies[id].updateInformation(d);
        this.arrayEnnemies.push(this.ennemies[id]);
    });
}

EnnemiesHandler.prototype.getEnnemies = function(){
    return this.arrayEnnemies;
}

export { EnnemiesHandler };