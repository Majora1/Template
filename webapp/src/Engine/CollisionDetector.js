import { ExecuteCodeAction, ActionManager } from "@babylonjs/core";

let CollisionDetector = function(scene, client, ennemiesHandler)
{
    this.scene = scene;
    this.client = client;
    this.ennemiesHandler = ennemiesHandler;
}
CollisionDetector.prototype.triggerIfEnnemyCollision = function(groupMesh1, ennemies, eventIncident){
    groupMesh1.forEach(mesh => {
        mesh.actionManager = new ActionManager(this.scene);
        ennemies.forEach(ennemy => {
            mesh.actionManager.registerAction(
                new ExecuteCodeAction({
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: ennemy.hitBox
                },
                (e)=>{
                    eventIncident(mesh, ennemy, this.client, this.ennemiesHandler);
                })
            )
        });   
    });
}


export { CollisionDetector };