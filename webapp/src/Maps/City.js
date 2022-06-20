import { SceneLoader, PhysicsImpostor } from "@babylonjs/core";
import { boundingBoxToCuboid } from './../utils.js'

let City = async function(scene){
    let city =(await SceneLoader.ImportMeshAsync(null, "./models/", "City.glb", scene)).meshes[0];
    city.isVisible = false;
    //physicsImpostor = new PhysicsImpostor(city, PhysicsImpostor.BoxImpostor, { mass: 0, restitution : 0, friction : 1 }, scene);
    city.getChildMeshes().forEach(m=>{
        m.receiveShadows = true;
        //m.showBoundingBox = true;
        //m.isVisible = false;
        boundingBoxToCuboid(m.getBoundingInfo().boundingBox, scene, true, false);
    });
}

export { City };