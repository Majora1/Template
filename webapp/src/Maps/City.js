import { SceneLoader, PhysicsImpostor } from "@babylonjs/core";
import { boundingBoxToCuboid } from './../utils.js'

let City = async function(scene){
    let city = await (await SceneLoader.ImportMeshAsync(null, "./models/", "City.glb", scene)).meshes[0];
    //physicsImpostor = new PhysicsImpostor(city, PhysicsImpostor.BoxImpostor, { mass: 0, restitution : 0, friction : 1 }, scene);
    city.getChildMeshes().forEach(m=>{
        m.receiveShadows = true;
        //m.showBoundingBox = true;
        boundingBoxToCuboid(m.getBoundingInfo().boundingBox, scene, true, false);
    });
}

export { City };