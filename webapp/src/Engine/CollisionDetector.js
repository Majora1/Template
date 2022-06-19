import { ExecuteCodeAction, ActionManager } from "@babylonjs/core";

let CollisionDetector = function(scene){
    this.scene;
}
CollisionDetector.prototype.triggerCollisionEvent = function(groupMesh1, groupMesh2, eventIncident){
    groupMesh1.forEach(mesh => {
        mesh.actionManager = new ActionManager(this.scene);
        groupMesh2.forEach(mesh2 => {
            mesh.actionManager.registerAction(
                new ExecuteCodeAction({
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: mesh2
                },
                (e)=>{
                    eventIncident(mesh, mesh2);
                    console.log("hited");
                })
            )
        });   
    });
}

export { CollisionDetector };