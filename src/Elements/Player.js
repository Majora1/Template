import { Color4, Mesh, MeshBuilder, Vector4 } from '@babylonjs/core';
import { Vector3, PhysicsImpostor } from "@babylonjs/core";
import { PhysicObject } from './PhysicObject.js';
import { FPCamera } from '../Cameras/FPCamera.js';
import { InputControllerBoolean } from '../InputController.js';
import { Material } from 'cannon';

let Player = function(scene, canvas, pos){
    // flat values
    this.accValue = 10;
    this.sideMvtValue = 0.6;
    this.resMvtvalue = 2;

    // movement attributes
    this.accMvt = Vector3.Zero();
    this.speMvt = Vector3.Zero();

    // action attributes
    // attack
    this.isAttacking = false;
    this.atkCooldown = 100;
    this.swingDuration = 40;
    this.atkFrameCount = 0;
    this.swordHitBox = undefined;

    // player caracteristics
    this.width = 1
    this.height = 2

    // scene
    this.scene = scene;

    // body
    this.physics = new PhysicObject(pos, new Vector3(this.resMvtvalue, this.resMvtvalue, this.resMvtvalue));
    //let color = new Material()
    this.hitBox = MeshBuilder.CreateCapsule("player", { radius : this.width/2, height : this.height}, scene);
    this.hitBox.position = pos;
    this.hitBox.receiveShadows = true;
    this.hitBox.isVisible = true;
    this.hitBox.physicsImpostor = new PhysicsImpostor(this.hitBox, PhysicsImpostor.CylinderImpostor, { mass: 10, restitution : 0, friction : 0, disableBidirectionalTransformation: false }, scene);
    // damage hitboxes
    this.damageHitboxes = [];

    // camera
    this.camera = new FPCamera(scene, canvas, this);

    // inputs
    this.actionMap = {
        " " : "jmp",
        "z" : "fwd",
        "s" : "bwd",
        "q" : "lft",
        "d" : "rgt",
        "0" : "atk", // left click
        "1" : "atk", // wheel click
        "2" : "atk"  // right click
    }

    this.actionPressed = {
        "jmp" : false,
        "fwd" : false,
        "bwd" : false,
        "lft" : false,
        "rgt" : false,
        "atk" : false
    }

    this.inputController = new InputControllerBoolean(this.actionPressed, this.actionMap);
}

Player.prototype.updateAcc = function(){
    let multipleInput = 
        (
          this.actionPressed["fwd"] ? 1 : 0 +
          this.actionPressed["bwd"] ? 1 : 0 +
          this.actionPressed["rgt"] ? 1 : 0 +
          this.actionPressed["lft"] ? 1 : 0
        ) > 1;
    let fwdBwdMvt = ((this.actionPressed["fwd"] ? 1 : 0) + (this.actionPressed["bwd"] ? -1 : 0)) * this.accValue / (multipleInput ? Math.sqrt(2) : 1);
    let rgtLftMvt = ((this.actionPressed["lft"] ? this.sideMvtValue : 0) + (this.actionPressed["rgt"] ? -this.sideMvtValue : 0)) * this.accValue / (multipleInput ? Math.sqrt(2) : 1)
    this.accMvt = new Vector3(
        fwdBwdMvt * Math.cos(-this.physics.rot._y + Math.PI/2) + rgtLftMvt * -Math.sin(-this.physics.rot._y + Math.PI/2),
        0,
        fwdBwdMvt * Math.sin(this.physics.rot._y + Math.PI/2) + rgtLftMvt * -Math.cos(this.physics.rot._y + Math.PI/2),
    );
}

Player.prototype.updateAction = function(){
    if(this.actionPressed["atk"] || this.isAttacking){
        console.log("I'm attacking")
        this.attack(this.atkFrameCount);
        this.atkFrameCount++;
        this.isAttacking = true;
        if (this.atkFrameCount >= this.atkCooldown){
            this.atkFrameCount = 0;
            this.isAttacking = false;
        }
    }
}

Player.prototype.attack = function(frame){
    if (frame == 0){
        let color = new Color4(1, 1, 0, 1);
        let colors = new Array(6).fill(color);
        this.swordHitBox = MeshBuilder.CreateBox("sword", {size : 0.2, width : 0.2, height : 1.5, faceColors : colors});
        this.damageHitboxes.push(this.swordHitBox);
    }
    // the swing
    this.swordHitBox.rotation = this.physics.rot.add(
        new Vector3(
            Math.PI/2,
            - Math.PI/3 * frame / this.swingDuration,
            0
        )
    );
    this.swordHitBox.position = this.physics.pos.
    // translate the sword closer to the player as it swing
    add(
        new Vector3(
            Math.cos(this.physics.rot.y + Math.PI/2) * frame / 200,
            0,
            -Math.sin(this.physics.rot.y + Math.PI/2) * frame / 200
        )
    ).
    // translate the sword to the right size as it swing
    add(
        new Vector3(
            Math.cos(this.physics.rot.y) * (this.width/2 - (frame + this.width/10) / this.swingDuration),
            0,
            -Math.sin(this.physics.rot.y) * (this.width/2 - (frame + this.width/10) / this.swingDuration)
        )
    ).
    // put the sword in front of the player
    add(
        new Vector3(
            Math.cos(this.physics.rot.y - Math.PI/2) * 1.2,
            this.height/8,
            -Math.sin(this.physics.rot.y - Math.PI/2) * 1.2)
    );

    if (frame >= this.swingDuration){
        let index = this.damageHitboxes.indexOf(this.swordHitBox);
        this.swordHitBox.dispose();
        if (index !== -1) {
            this.damageHitboxes.splice(index, 1);
        }
    }
}

Player.prototype.update = function(spe = Vector3.Zero(), acc = Vector3.Zero()){
    this.updateAcc();
    this.updateAction();
    this.physics.updatePos(acc = this.accMvt);
    //this.hitBox.position.addInPlace(this.physics.spe);
    this.hitBox.physicsImpostor.setLinearVelocity(this.physics.spe);
    this.physics.setPos(this.hitBox.position);
    this.camera.update();
    this.physics.updateRot(new Vector3(0, this.camera.rot.y, this.camera.rot.z));
    this.hitBox.physicsImpostor.setAngularVelocity(Vector3.Zero());
    this.hitBox.physicsImpostor.setRotation
    this.hitBox.rotation.set(this.physics.rot);
}

export { Player };