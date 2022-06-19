import { UniversalCamera, Vector3 } from "@babylonjs/core"

let FPCamera = function(scene, canvas, target, offset = Vector3.Zero()){
    this.scene = scene;
    this.canvas = canvas;
    this.target = target;
    this.targetPhysics = target.physics;
    this.camera = new UniversalCamera("FPCamera",Vector3.Zero(),scene);
    this.camera.position = target.physics.pos;
    this.rot = this.camera.rotation;
    this.camera.inputs.clear();
    this.camera.inputs.addMouse();
    this.camera.detachControl();
}

FPCamera.prototype.update = function(){
    this.camera.position = this.targetPhysics.pos.add(
        new Vector3(
            Math.cos(-this.target.physics.rot._y + Math.PI/2) * (-this.target.width/1.5),
            this.target.height / 3,
            Math.sin(this.target.physics.rot._y + Math.PI/2) * (-this.target.width/1.5)
        )
    );
    this.rot = this.camera.rotation;
}

FPCamera.prototype.off = function(){
    this.camera.detachControl();
}

FPCamera.prototype.on = function(){
    this.camera.attachControl(this.canvas, true);
    this.scene.activeCamera = this.camera;
}

export { FPCamera };