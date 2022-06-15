let InputController = function setMyKeyDownListener(actionner, map) {
    let action;
    window.addEventListener(
      "keydown",
      function(event) {
        if (event.key in map){
            action = map[event.key];
            if (action in actionner){
                actionner[action](true);
            }
        }
      }
    )

    window.addEventListener(
        "keyup",
        function(event){
            if (event.key in map){
                action = map[event.key];
                if (action in actionner){
                    actionner[action](false);
                }
            }
        }
    )
}

let InputControllerBoolean = function setMyKeyDownListener(actions, map) {
    let action;
    window.addEventListener(
        "keydown",
        function(event) {
          if (event.key in map){
              action = map[event.key];
              if (action in actions){
                  actions[action] = true;
              }
          }
        }
      )
  
      window.addEventListener(
          "keyup",
          function(event){
              if (event.key in map){
                  action = map[event.key];
                  if (action in actions){
                    actions[action] = false;
                }
              }
          }
      )
      window.addEventListener(
        "mousedown",
        function(event) {
            if (event.button in map){
                action = map[event.button];
                if (action in actions){
                    actions[action] = true;
                }
            }
          }
      )
      window.addEventListener(
        "mouseup",
        function(event){
            if (event.button in map){
                action = map[event.button];
                if (action in actions){
                  actions[action] = false;
              }
            }
        }
      )
}

let lockMouse = function(){
    let canvas = document.getElementById("gameCanvas");
    // Requete pour la capture du pointeur
    canvas.addEventListener("click", function(evt) {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.requestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }, false);
    var pointerlockchange = function (event) {
        let controlEnabled = (document.pointerLockElement === canvas);
        let rotEngaged = true;
        if (!controlEnabled) {
            rotEngaged = false;
        } 
    };
    // Event pour changer l'état du pointeur, sous tout les types de navigateur
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
}

export { InputController, InputControllerBoolean, lockMouse }