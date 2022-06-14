import { UniversalCamera, Vector3 } from "@babylonjs/core"

let FPCamera = function(scene, canvas, target, offset = Vector3.Zero()){
    this.scene = scene;
    this.canvas = canvas;
    this.target = target;
    this.camera = new UniversalCamera("FPCamera",Vector3.Zero(),scene);
    this.camera.position = target.pos;
    this.rot = this.camera.rotation;
    this.camera.inputs.clear();
    this.camera.inputs.addMouse();
    this.camera.detachControl();
}

FPCamera.prototype.update = function(){
    this.camera.position = this.target.pos;
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