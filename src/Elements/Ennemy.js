import { Color4, MeshBuilder, PhysicsImpostor } from '@babylonjs/core';
import { PhysicObject } from './PhysicObject.js';
import { Vector3 } from "@babylonjs/core";

let Ennemy = function(scene, canvas, pos, id){
    // flat values
    this.accValue = 0.05;
    this.sideMvtValue = 0.6;
    this.resMvtvalue = 2;

    // Ennemy caracteristics
    this.width = 1
    this.height = 2

    // ID
    this.id = id;

    // body
    this.physics = new PhysicObject(pos, new Vector3(this.resMvtvalue, this.resMvtvalue, this.resMvtvalue));
    let color = new Color4(1, 0, 0, 1);
    let colors = new Array(6).fill(color);
    this.hitBox = MeshBuilder.CreateCapsule("Ennemy_" + id, { radius : this.width/2, height : this.height}, scene);
    this.hitBox.receiveShadows = true;
    this.hitBox.position = pos;
    this.hitBox.physicsImpostor = new PhysicsImpostor(this.hitBox, PhysicsImpostor.CylinderImpostor, { mass: 0, disableBidirectionalTransformation: false }, scene);
}

export { Ennemy };