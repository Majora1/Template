import { Vector3 } from '@babylonjs/core';
import { Ennemy } from './../Elements/Ennemy.js';
import { loadModel } from './../utils.js';

let EnnemiesHandler = function(scene, model){
    this.scene = scene;
    this.ennemies = {};
    this.arrayEnnemies = [];
    this.deadEnnemies = [];
}

EnnemiesHandler.prototype.updateEnnemies = async function(newData){
    this.arrayEnnemies = []
    newData.forEach(data => {
        let d = data[0];
        let id = data[1];
        if (!(id in this.ennemies)){
            this.createEnnemy(d, id);
        }
        if (this.ennemies[id] != undefined){
            this.ennemies[id].updateInformation(d);
            this.arrayEnnemies.push(this.ennemies[id]);
        }
    });
}

EnnemiesHandler.prototype.createEnnemy = async function(data, id){
    if (!(this.deadEnnemies.includes(id))){
        let newEnnemy = new Ennemy(this.scene, new Vector3(data.position.x, data.position.y, data.position.z), await loadModel("Character.glb", this.scene), id);
        this.ennemies[id] = newEnnemy;
    }
}

EnnemiesHandler.prototype.getEnnemies = function(){
    return this.arrayEnnemies;
}

EnnemiesHandler.prototype.eraseEnnemy = function(id){
    let e = this.ennemies[id];
    e.die();
    delete this.ennemies[id];
    this.arrayEnnemies = this.arrayEnnemies.filter((i) => i != id);
    this.deadEnnemies.push(id);
}

export { EnnemiesHandler };