import { MeshBuilder, Vector3 } from "@babylonjs/core";

let TrainingSession = function(scene){
    MeshBuilder.CreateGround("ground", {width : 100, height : 100}, scene);
    let cylinder = MeshBuilder.CreateCylinder("tower1", {height : 20, diameter: 5}, scene);
    cylinder.position = new Vector3(10, 10, 0);
}

export { TrainingSession };