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
    this.model = model.meshes[0];
    this.model.isVisible = true;
    this.model.position = new Vector3(this.hitBox.position.x, this.hitBox.position.y - 1, this.hitBox.position.z)
    this.model.rotation = this.hitBox.rotation;
    this.model.isVisible = true;

    // animations
    this.animations = model.animationGroups;
    this.animationsMap = {};
    this.animationsLength = {};
    this.isAttacking = false;
    var i = 0;
    this.animations.forEach(a => {
        this.animationsMap[a.name] = a;
        this.animationsLength[a.name] = Math.floor(a.to);
        a.stop();
        a.reset();
        i++;
    });
    this.previousAnimation = this.animationsMap["idle"];
    this.currentAnimation = this.animationsMap["idle"];
    this.currentAnimation.play();
    this.currentAnimationName = "idle";
}

Ennemy.prototype.updateInformation = function(playerInfo){
    this.hitBox.physicsImpostor.setAngularVelocity(Vector3.Zero());
    this.hitBox.physicsImpostor.setLinearVelocity(Vector3.Zero());
    this.hitBox.position.set(playerInfo.position.x, playerInfo.position.y, playerInfo.position.z);
    this.hitBox.rotation.set(playerInfo.rotation.x, playerInfo.rotation.y, playerInfo.rotation.z)
    this.model.position = new Vector3(this.hitBox.position.x, this.hitBox.position.y - 1, this.hitBox.position.z)
    this.model.rotation = this.hitBox.rotation;

    // animations
    if (playerInfo.isAttacking){
        this.animationsMap["attack"].goToFrame(playerInfo.attackingFrame);
        this.animationsMap["attack"].play();
    } else {
        this.animationsMap["attack"].stop();
        this.animationsMap["attack"].reset();
    }
    if (playerInfo.animation == this.currentAnimationName){
        this.currentAnimation.goToFrame(playerInfo.animationFrame % this.animationsLength[this.currentAnimationName]);
        this.currentAnimation.play();
        return;
    }

    this.currentAnimationName = playerInfo.animation;
    this.previousAnimation = this.currentAnimation;
    this.previousAnimation.stop()
    this.previousAnimation.reset();
    this.currentAnimation = this.animationsMap[playerInfo.animation];
    this.currentAnimation.play();
}

export { Ennemy };