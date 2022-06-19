import { Vector3 } from '@babylonjs/core';
import { Ennemy } from './../Elements/Ennemy.js';

let EnnemiesHandler = function(scene, model){
    this.scene = scene;
    this.model = model;
    console.log("EnnemyHandler", this.model);
    this.ennemies = {};
}

EnnemiesHandler.prototype.updateEnnemies = function(newData){
    //console.log("Update local ennemies", newData);
    newData.forEach(data => {
        let d = data[0];
        let id = data[1];
        //console.log("id", id);
        //console.log("ennemies", this.ennemies)
        if (!(id in this.ennemies)){
            let newEnnemy = new Ennemy(this.scene, new Vector3(d.position.x, d.position.y, d.position.z), this.model.clone(), id);
            this.ennemies[id] = newEnnemy;
        }
        this.ennemies[id].updateInformation(d);
    });
}

export { EnnemiesHandler };