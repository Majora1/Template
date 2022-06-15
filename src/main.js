import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, UniversalCamera, CannonJSPlugin } from "@babylonjs/core";
import { Player } from './Elements/Player.js';
import { InputController, lockMouse } from './InputController.js';
import { TrainingSession } from './Maps/TrainingSession.js';
import { City } from './Maps/City.js';
import { Ennemy } from './Elements/Ennemy.js';
import * as cannon from "cannon";

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
scene.enablePhysics(new Vector3(0, -3 , 0), new CannonJSPlugin(true, 10, cannon));

let camera = new UniversalCamera("Camera", new Vector3(10, 20, -10), scene);
let light1  = new HemisphericLight("light1", new Vector3(10, 100, 10), scene);
/*
const light = new PointLight("sparklight", new Vector3(10, 10, 20), scene);
const light2 = new PointLight("sparklight", new Vector3(-30, 10, 20), scene);
light.diffuse = new Color3(0.08627450980392157, 0.10980392156862745, 0.15294117647058825);
light.intensity = 35;
light.radius = 1;
const shadowGenerator = new ShadowGenerator(1024, light);
//shadowGenerator.darkness = 0.4;
*/
let player = new Player(scene, canvas, new Vector3(-10, 1, 0));
let ennemy1 = new Ennemy(scene, canvas, new Vector3(-10, 1, 2), "1");
let ennemy2 = new Ennemy(scene, canvas, new Vector3(-10, 1, 4), "2");
let ennemies = [ ennemy1, ennemy2];
player.camera.on();
//let ground = new TrainingSession(scene);
let city = City();


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

let on = false;
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
    on = !on;
}

let actionMap = {
    "Enter" : "swt"
}

let menuController = {
    "swt" : changeCamera
}

let inputController = new InputController(menuController, actionMap);

scene.debugLayer.show();
// run the main render loop
let desiredFps = 80;
let interval = 1000/desiredFps;
let lastTime = performance.now();
engine.runRenderLoop(() => {
    let currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);
        player.update();
        scene.render();
    }
});