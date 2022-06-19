import { Color4, MeshBuilder, PhysicsImpostor, Vector3, SceneLoader } from '@babylonjs/core';

let Ennemy = function(scene, pos, model, id){
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
    this.hitBox = MeshBuilder.CreateCapsule("Ennemy_" + id, { radius : this.width/2, height : this.height}, scene);
    this.hitBox.receiveShadows = true;
    this.hitBox.position = pos;
    this.hitBox.physicsImpostor = new PhysicsImpostor(this.hitBox, PhysicsImpostor.CylinderImpostor, { mass: 0, disableBidirectionalTransformation: false }, scene);
    this.hitBox.isVisible = false;

    // model
    console.log(model);
    this.model = model;
    this.model.isVisible = true;
    this.model.position = new Vector3(this.hitBox.position.x, this.hitBox.position.y - 1, this.hitBox.position.z)
    this.model.rotation = this.hitBox.rotation;
    this.model.isVisible = true;
}

Ennemy.prototype.updateInformation = function(playerInfo){
    //this.hitBox.physicsImpostor.setDeltaPosition(mvt);
    //this.hitBox.physicsImpostor.setLinearVelocity(mvt);
    this.hitBox.physicsImpostor.setAngularVelocity(Vector3.Zero());
    this.hitBox.physicsImpostor.setLinearVelocity(Vector3.Zero());
    this.hitBox.position.set(playerInfo.position.x, playerInfo.position.y, playerInfo.position.z);
    this.hitBox.rotation.set(playerInfo.rotation.x, playerInfo.rotation.y, playerInfo.rotation.z)
    //this.hitBox.position.addInPlace(mvt);
    //this.physics.rot = new Vector3(playerInfo.rotation.x, playerInfo.rotation.y, playerInfo.rotation.z);
    this.model.position = new Vector3(this.hitBox.position.x, this.hitBox.position.y - 1, this.hitBox.position.z)
    this.model.rotation = this.hitBox.rotation;
}

export { Ennemy };