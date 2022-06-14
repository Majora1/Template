import { Quaternion, Vector3 } from "@babylonjs/core"

let PhysicObject = function(position = Vector3.Zero(), resistance = Vector3.Zero()){
    this.pos = position;
    this.spe = Vector3.Zero();
    this.acc = Vector3.Zero();
    this.res = resistance;
    this.rot = new Vector3.Zero();
}

PhysicObject.prototype.updatePos = function(spe = Vector3.Zero(), acc = Vector3.Zero()){
    this.acc = this.acc.addInPlace(acc);
    this.spe = this.spe.addInPlace(spe);
    this.spe = this.spe.divideInPlace(this.res);
    this.pos = this.pos.addInPlace(this.spe);
}

PhysicObject.prototype.updateRot = function(rot){
    this.rot = rot;
}


export { PhysicObject };