let PlayerInfoSend = function(physics, animation){
    this.position = { x : physics.pos.x.toFixed(2), y: physics.pos.y.toFixed(2), z: physics.pos.z.toFixed(2) };
    this.rotation = { x : physics.rot.x.toFixed(2), y: physics.rot.y.toFixed(2), z: physics.rot.z.toFixed(2) };
    this.animation = animation;
}

export { PlayerInfoSend };