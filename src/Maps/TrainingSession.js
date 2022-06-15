import { MeshBuilder, Vector3 } from "@babylonjs/core";

let TrainingSession = function(scene){
    MeshBuilder.CreateGround("ground", {width : 100, height : 100}, scene);
}

export { TrainingSession };