import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, UniversalCamera, CannonJSPlugin, SceneLoader } from "@babylonjs/core";
import { Player } from './Elements/Player.js';
import { InputController, lockMouse } from './InputController.js';
import { TrainingSession } from './Maps/TrainingSession.js';
import { City } from './Maps/City.js';
import { Ennemy } from './Elements/Ennemy.js';
import { CollisionDetector } from './Engine/CollisionDetector.js'
import { Behaviors } from "./Engine/Behaviors.js";
import { Client } from "./Network/Client.js";
import { EnnemiesHandler } from "./Data/EnnemiesHandler.js";
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
scene.enablePhysics(new Vector3(0, -500 , 0), new CannonJSPlugin(true, 10, cannon));

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

let player = new Player(scene, canvas, new Vector3(-10, 8, 0));
/*
let ennemy1 = new Ennemy(scene, new Vector3(-10, 1, 4), "1");
let ennemy2 = new Ennemy(scene, new Vector3(-10, 1, 8), "2");
let ennemy3 = new Ennemy(scene, new Vector3(-8, 1, 6), "3");
*/
let ennemies = [];
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

let updateEnnemies = function(oldEnnemiesData, newEnnemiesData){
    //for x, y in newEnnemiesData.items():
}

let loadModel = async function(name){
    let model = await SceneLoader.ImportMeshAsync(null, "./models/", name, scene);
    model.meshes[0].isVisible = false;
    return model;
}

const client = new Client();
let eModel = await loadModel("Character.glb");
let inputController = new InputController(menuController, actionMap);
let collisionDetector = new CollisionDetector(scene, client);
let behaviors = new Behaviors();
let ennemiesHandler = new EnnemiesHandler(scene, eModel);


//scene.debugLayer.show();
// run the main render loop
let desiredFps = 80;
let interval = 1000/desiredFps;
let lastTime = performance.now();

engine.runRenderLoop(() => {
    let currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);
        client.sendPlayerInfo(player.getPlayerInfo());
        ennemiesHandler.updateEnnemies(client.getEnnemyData());
        player.update();
        scene.render();
        collisionDetector.triggerIfEnnemyCollision([ player.swordHitBox ], ennemiesHandler.getEnnemies(), behaviors.swordHitEnnemy);
    }
});