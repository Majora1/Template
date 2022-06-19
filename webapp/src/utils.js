import { MeshBuilder, PhysicsImpostor } from "@babylonjs/core";

let boundingBoxToCuboid = function(boundingBox, scene, impostor = false, visible = true){
    let parentDimensions = boundingBox.extendSizeWorld.scale(2);
    let box = MeshBuilder.CreateBox("bounding", { width: parentDimensions.x, height: parentDimensions.y, depth: parentDimensions.z}, scene);
    box.position.copyFrom(boundingBox.centerWorld);
    if (impostor) box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: 0, restitution : 0, friction : 1, disableBidirectionalTransformation: false }, scene);
    box.isVisible = visible;
}

export { boundingBoxToCuboid };