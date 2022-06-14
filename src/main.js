import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, UniversalCamera } from "@babylonjs/core";
import { Player } from './Elements/Player.js';
import { InputController, lockMouse } from './InputController.js';
import { TrainingSession } from './Maps/TrainingSession.js';

let createCanvas = function(){

    //Commented out for development
    document.documentElement.style["overflow"] = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    //create the canvas html element and attach it to the webpage
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    return canvas;
}

let canvas = createCanvas();

// initialize babylon scene and engine
let engine = new Engine(canvas, true);
let scene = new Scene(engine);

let camera = new UniversalCamera("Camera", new Vector3(0, 10, -10), scene);
camera.attachControl(canvas, true);
let light1  = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
let player = new Player(scene, canvas);
let ground = new TrainingSession(scene);
// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});

lockMouse();
let mapMovement = {
    "z" : "fwd",
    "q" : "lft",
    "d" : "rgt",
    "s" : "bwd",
    " " : "jmp",
    "Enter" : "swt"
}

let on = true;

let changeCamera = function(keyup){
    if (!keyup) return;
    if (on){
        camera.detachControl();
        player.camera.on();
    } else {
        player.camera.off();
        camera.attachControl(canvas, true);
        scene.activeCamera = camera;
    }
    console.log(on);
    console.log(camera);
    console.log(player.camera);
    on = !on;
}

let menuController = {
    "swt" : changeCamera
}

let inputController = new InputController(menuController, mapMovement);

scene.debugLayer.show();
// run the main render loop
engine.runRenderLoop(() => {
    player.update(new Vector3(0,0,0));
    scene.render();
});