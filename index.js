var camera;
var scene;
var player;
var objects;

if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    BABYLON.SceneLoader.Load("blender/", "cubes.babylon", engine, function (newScene) {
        // Wait for textures and shaders to be ready
        newScene.executeWhenReady(function () {

            // Attach camera to canvas inputs

            scene = newScene;

            objects = newScene.meshes;

            player = objects[3];

            camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 30, player.position, scene);
            camera.attachControl(canvas);
            scene.activeCamera = camera;

 			camera.checkCollisions = true;
			camera.applyGravity = true;

            var material = new BABYLON.StandardMaterial('material101', scene);
            objects[0].material = material;
            material.diffuseColor = new BABYLON.Color3(.2, .3, 1);

            material = new BABYLON.StandardMaterial('material101', scene);
            objects[1].material = material;
            material.diffuseColor = new BABYLON.Color3(1, 0, 0);

            material = new BABYLON.StandardMaterial('material101', scene);
            objects[2].material = material;
            material.diffuseColor = new BABYLON.Color3(.7, .4, .8);

            material = new BABYLON.StandardMaterial('material101', scene);
            objects[3].material = material;
            material.diffuseColor = new BABYLON.Color3(.5, .5, 0);

            material = new BABYLON.StandardMaterial('material101', scene);
            objects[4].material = material;
            material.diffuseColor = new BABYLON.Color3(0, 1, 0);

            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function() {
                newScene.render();
            });
        });
    }, function (progress) {
        // To do: give progress feedback to user
    });

}