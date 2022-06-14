import { Color4, Mesh, MeshBuilder, Vector4 } from '@babylonjs/core';
import { Vector3 } from "@babylonjs/core"
import { PhysicObject } from './PhysicObject.js'
import { FPCamera } from '../Cameras/FPCamera.js';
import { InputControllerBoolean } from '../InputController.js';

let Player = function(scene, canvas){
    // flat values
    this.accValue = 1;

    // movement attributes
    this.accMvt = Vector3.Zero();
    this.speMvt = Vector3.Zero();

    // body and scene
    this.scene = scene;
    this.physics = new PhysicObject(new Vector3(0, 1, 0), new Vector3(15, 15, 15));
    let color = new Color4(1, 0, 0, 1);
    let colors = new Array(6).fill(color);
    this.hitBox = MeshBuilder.CreateBox("player", {size : 1, width : 1, height : 2, faceColors : colors});

    // camera
    this.camera = new FPCamera(scene, canvas, this.physics);

    // inputs
    this.actionMap = {
        " " : "jmp",
        "z" : "fwd",
        "s" : "bwd",
        "q" : "lft",
        "d" : "rgt"
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
    this.accMvt = new Vector3(
        (this.actionPressed["fwd"] ? 1 : 0 + this.actionPressed["bwd"] ? -1 : 0) * this.accValue / (multipleInput ? 2 : 1),
        0,
        (this.actionPressed["lft"] ? 1 : 0 + this.actionPressed["rgt"] ? -1 : 0) * this.accValue / (multipleInput ? 2 : 1),
    );
}

Player.prototype.update = function(spe = Vector3.Zero(), acc = Vector3.Zero()){
    this.updateAcc();
    this.physics.updatePos(acc = this.accMvt);
    this.hitBox.position = this.physics.pos;
    this.camera.update();
    this.physics.updateRot(new Vector3(0, this.camera.rot.y, this.camera.rot.z));
    this.hitBox.rotation = this.physics.rot;
}

export { Player };