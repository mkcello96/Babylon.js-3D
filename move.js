var up = false;
var down = false;
var left = false;
var right = false;
var jump = false;
var jumpDistance = 2;

var slope = new Array();
var frontPosition = new Array(); 
var rearPosition = new Array(); 
var leftPosition = new Array();
var rightPosition = new Array();
var move = new Array();

var leftCheck = new BABYLON.Vector3(0,0,0);
var rightCheck = new BABYLON.Vector3(0,0,0);
var bottomFrontLeftCheck = new BABYLON.Vector3(0,0,0);
var bottomFrontRightCheck = new BABYLON.Vector3(0,0,0);
var bottomBackLeftCheck = new BABYLON.Vector3(0,0,0);
var bottomBackRightCheck = new BABYLON.Vector3(0,0,0);

window.addEventListener("keydown", moveSprite);
window.addEventListener("keyup", stopSprite);

alert("Use the A, W, S, D keys to move, the arrow keys or mouse to control the camera, and the space bar to jump.");

function moveSprite(event) {

    

	if(event.keyCode == 87) {
		if (!up) {
			up = setInterval(function() {
				getSlopeInfo(slope);
				calculateUpPosition(slope['angle'], .4, frontPosition);
				calculateDownPosition(slope['angle'], .4, rearPosition);
				calculateLeftPosition(slope['iAngle'], .3, leftPosition);
				calculateRightPosition(slope['iAngle'], .3, rightPosition);
				calculateUpPosition(slope['angle'], .1, move);

				checkForCollisionAndMove(event);
			}, 10);
		}
	}

	if(event.keyCode == 83) {
		if (!down) {
			down = setInterval(function() {
				getSlopeInfo(slope);
				calculateDownPosition(slope['angle'], .4, frontPosition);
				calculateUpPosition(slope['angle'], .4, rearPosition);
				calculateLeftPosition(slope['iAngle'], .3, leftPosition);
				calculateRightPosition(slope['iAngle'], .3, rightPosition);
				calculateDownPosition(slope['angle'], .1, move);

				checkForCollisionAndMove(event);
			}, 10);
		}
	}

	if(event.keyCode == 65) {
		if (!left) {
			left = setInterval(function() {

				getSlopeInfo(slope);
				calculateLeftPosition(slope['iAngle'], .4, frontPosition);
				calculateRightPosition(slope['iAngle'], .4, rearPosition);
				calculateDownPosition(slope['angle'], .3, leftPosition);
				calculateUpPosition(slope['angle'], .3, rightPosition);
				calculateLeftPosition(slope['iAngle'], .1, move);

				checkForCollisionAndMove(event);
			}, 10);
		}
	}

	if(event.keyCode == 68) {
		if (!right) {
			right = setInterval(function() {
				getSlopeInfo(slope);
				calculateRightPosition(slope['iAngle'], .4, frontPosition);
				calculateLeftPosition(slope['iAngle'], .4, rearPosition);
				calculateUpPosition(slope['angle'], .3, leftPosition);
				calculateDownPosition(slope['angle'], .3, rightPosition);
				calculateRightPosition(slope['iAngle'], .1, move);

				checkForCollisionAndMove(event);
			}, 10);
		}
	}

	//Jump!
	if(event.keyCode == 32) {

		//--------------CODE TO CREATE A NEW MESH MATERIAL----------------
		/*var sphere2 = BABYLON.Mesh.CreateSphere('sphere', 10, .1, scene);
	    var SphereMat = new BABYLON.StandardMaterial('omnom.jpg', scene);
	    // apply texture, path, scene
	    SphereMat.diffuseTexture = new BABYLON.Texture('omnom.jpg', scene);

	    var sphere3 = BABYLON.Mesh.CreateSphere('sphere', 10, .1, scene);
	    var SphereMat = new BABYLON.StandardMaterial('omnom.jpg', scene);
	    // apply texture, path, scene
	    SphereMat.diffuseTexture = new BABYLON.Texture('omnom.jpg', scene);
	    // apply material to the mesh
	    sphere3.material = SphereMat;
	    // disable specular
	    sphere3.material.specularColor = new BABYLON.Color3(0, 0, 0);*/

	
		if (!jump) {
			jump = setInterval(function() {

				if (jumpDistance < 0 && isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck)) {

					bottomBackLeftCheck.y = player.position.y - .3;
					bottomBackRightCheck.y = player.position.y - .3;
					bottomFrontRightCheck.y = player.position.y - .3;
					bottomFrontLeftCheck.y = player.position.y - .3;

					while (!isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck)) {
						bottomBackLeftCheck.y -= .1;
						bottomBackRightCheck.y -= .1;
						bottomFrontRightCheck.y -= .1;
						bottomFrontLeftCheck.y -= .1;
						player.position.y -= .1;
					}
					clearInterval(jump);
					jump = null;
					jumpDistance = 2;

				} else {

					player.position.y += jumpDistance;
					jumpDistance -= .1;

					getSlopeInfo(slope);
					calculateUpPosition(slope['angle'], .4, frontPosition);
					calculateLeftPosition(slope['iAngle'], .3, leftPosition);
					calculateRightPosition(slope['iAngle'], .3, rightPosition);
					calculateDownPosition(slope['angle'], .4, rearPosition);

					bottomFrontLeftCheck.x = player.position.x + leftPosition['x'] + frontPosition['x'];
					bottomFrontLeftCheck.y = player.position.y - .3 + jumpDistance;
					bottomFrontLeftCheck.z = player.position.z + leftPosition['z'] + frontPosition['z'];

					bottomFrontRightCheck.x = player.position.x + rightPosition['x'] + frontPosition['x'];
					bottomFrontRightCheck.y = player.position.y - .3 + jumpDistance;
					bottomFrontRightCheck.z = player.position.z + rightPosition['z'] + frontPosition['z'];

					bottomBackLeftCheck.x = player.position.x + leftPosition['x'] + rearPosition['x'];
					bottomBackLeftCheck.y = player.position.y - .3 + jumpDistance;
					bottomBackLeftCheck.z = player.position.z + leftPosition['z'] + rearPosition['z'];

					bottomBackRightCheck.x = player.position.x + rightPosition['x'] + rearPosition['x'];
					bottomBackRightCheck.y = player.position.y - .3 + jumpDistance;
					bottomBackRightCheck.z = player.position.z + rightPosition['z'] + rearPosition['z'];
				}
			}, 25);
		}
	}

	camera.target = player.position;

}

function stopSprite(event) {
	if (event.keyCode == 87) {
		clearInterval(up);
		up = null;
	}

	if (event.keyCode == 83) {
		clearInterval(down);
		down = null;
	}

	if (event.keyCode == 65) {
		clearInterval(left);
		left = null;
	}

	if (event.keyCode == 68) {
		clearInterval(right);
		right = null;
	}
}

function checkForCollisionAndMove(event) {

	leftCheck.x = player.position.x + leftPosition['x'] + frontPosition['x'];
	leftCheck.y = player.position.y;
	leftCheck.z = player.position.z + leftPosition['z'] + frontPosition['z'];

	rightCheck.x = player.position.x + rightPosition['x'] + frontPosition['x'];
	rightCheck.y = player.position.y;
	rightCheck.z = player.position.z + rightPosition['z'] + frontPosition['z'];

	if (!jump) {
		bottomFrontLeftCheck.x = player.position.x + leftPosition['x'] + frontPosition['x'];
		bottomFrontLeftCheck.y = player.position.y - .3;
		bottomFrontLeftCheck.z = player.position.z + leftPosition['z'] + frontPosition['z'];

		bottomFrontRightCheck.x = player.position.x + rightPosition['x'] + frontPosition['x'];
		bottomFrontRightCheck.y = player.position.y - .3;
		bottomFrontRightCheck.z = player.position.z + rightPosition['z'] + frontPosition['z'];

		bottomBackLeftCheck.x = player.position.x + leftPosition['x'] + rearPosition['x'];
		bottomBackLeftCheck.y = player.position.y - .3;
		bottomBackLeftCheck.z = player.position.z + leftPosition['z'] + rearPosition['z'];

		bottomBackRightCheck.x = player.position.x + rightPosition['x'] + rearPosition['x'];
		bottomBackRightCheck.y = player.position.y - .3;
		bottomBackRightCheck.z = player.position.z + rightPosition['z'] + rearPosition['z'];

		if (!isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck)) {
			jumpDistance = -.1;
			jump = setInterval(function() {

				//debugger;

				if (jumpDistance < 0 && isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck)) {

					bottomBackLeftCheck.y = player.position.y - .3;
					bottomBackRightCheck.y = player.position.y - .3;
					bottomFrontRightCheck.y = player.position.y - .3;
					bottomFrontLeftCheck.y = player.position.y - .3;

					while (!isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck)) {
						bottomBackLeftCheck.y -= .1;
						bottomBackRightCheck.y -= .1;
						bottomFrontRightCheck.y -= .1;
						bottomFrontLeftCheck.y -= .1;
						player.position.y -= .1;
					}
					clearInterval(jump);
					jump = null;
					jumpDistance = 2;

				} else {

					player.position.y += jumpDistance;
					jumpDistance -= .1;

					getSlopeInfo(slope);
					calculateUpPosition(slope['angle'], .4, frontPosition);
					calculateLeftPosition(slope['iAngle'], .3, leftPosition);
					calculateRightPosition(slope['iAngle'], .3, rightPosition);
					calculateDownPosition(slope['angle'], .4, rearPosition);

					bottomFrontLeftCheck.x = player.position.x + leftPosition['x'] + frontPosition['x'];
					bottomFrontLeftCheck.y = player.position.y - .3 + jumpDistance;
					bottomFrontLeftCheck.z = player.position.z + leftPosition['z'] + frontPosition['z'];

					bottomFrontRightCheck.x = player.position.x + rightPosition['x'] + frontPosition['x'];
					bottomFrontRightCheck.y = player.position.y - .3 + jumpDistance;
					bottomFrontRightCheck.z = player.position.z + rightPosition['z'] + frontPosition['z'];

					bottomBackLeftCheck.x = player.position.x + leftPosition['x'] + rearPosition['x'];
					bottomBackLeftCheck.y = player.position.y - .3 + jumpDistance;
					bottomBackLeftCheck.z = player.position.z + leftPosition['z'] + rearPosition['z'];

					bottomBackRightCheck.x = player.position.x + rightPosition['x'] + rearPosition['x'];
					bottomBackRightCheck.y = player.position.y - .3 + jumpDistance;
					bottomBackRightCheck.z = player.position.z + rightPosition['z'] + rearPosition['z'];
				}
			}, 25);
		}
	}

	if (isCollision(leftCheck, rightCheck)) {
		stopSprite(event);
	} else {
		player.position.x += move['x'];
		player.position.z += move['z'];
	}
}

function isCollision(leftCheck, rightCheck) {
	for(var i = 0; i < objects.length; i++) {
		if(i != 3) {
			if (objects[i].intersectsPoint(leftCheck) || objects[i].intersectsPoint(rightCheck)) {
				return true;
			}
		}
	}
	return false;
}

function isCollisionBottom(bottomFrontLeftCheck, bottomFrontRightCheck, bottomBackLeftCheck, bottomBackRightCheck) {
	for(var i = 0; i < objects.length; i++) {
		if(i != 3) {
			if ((objects[i].intersectsPoint(bottomFrontLeftCheck) || objects[i].intersectsPoint(bottomFrontRightCheck) 
					|| objects[i].intersectsPoint(bottomBackLeftCheck) || objects[i].intersectsPoint(bottomBackRightCheck))) {
				return true;
			}
		}
	}
	return false;
}


function calculateUpPosition(angle, length, array) {
	if (player.position.x > camera.position.x) {
		array['x'] = Math.abs(Math.cos(angle) * length);
	} else {
		array['x'] = Math.abs(Math.cos(angle) * length) * -1;
	}

	if (player.position.z > camera.position.z) {
		array['z'] = Math.abs(Math.sin(angle) * length);
	} else {
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	}
}

function calculateDownPosition(angle, length, array) {
	if (player.position.x < camera.position.x) {
		array['x'] = Math.abs(Math.cos(angle) * length);
	} else {
		array['x'] = Math.abs(Math.cos(angle) * length) * -1;
	}

	if (player.position.z < camera.position.z) {
		array['z'] = Math.abs(Math.sin(angle) * length);
	} else {
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	}
}

function calculateLeftPosition(angle, length, array) {
	var cameraX = camera.position.x;
	var cameraY = camera.position.z;
	var playerX = player.position.x;
	var playerY = player.position.z;

	if (playerX >= cameraX && playerY >= cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length) * -1;
		array['z'] = Math.abs(Math.sin(angle) * length);
	} else if (playerX < cameraX && playerY >= cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length) * -1;
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	} else if (playerX < cameraX && playerY < cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length);
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	} else {
		array['x'] = Math.abs(Math.cos(angle) * length);
		array['z'] = Math.abs(Math.sin(angle) * length);
	}
}

function calculateRightPosition(angle, length, array) {
	var cameraX = camera.position.x;
	var cameraY = camera.position.z;
	var playerX = player.position.x;
	var playerY = player.position.z;

	if (playerX >= cameraX && playerY >= cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length);
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	} else if (playerX < cameraX && playerY >= cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length);
		array['z'] = Math.abs(Math.sin(angle) * length);
	} else if (playerX < cameraX && playerY < cameraY) {
		array['x'] = Math.abs(Math.cos(angle) * length)* -1;
		array['z'] = Math.abs(Math.sin(angle) * length);
	} else {
		array['x'] = Math.abs(Math.cos(angle) * length) * -1;
		array['z'] = Math.abs(Math.sin(angle) * length) * -1;
	}

}

function getSlopeInfo(array) {

	array['slope'] = (camera.position.z - player.position.z) / (camera.position.x - player.position.x);
	array['iSlope'] = ((camera.position.x - player.position.x) / (camera.position.z - player.position.z)) * -1;
	array['angle'] = Math.atan(array['slope']);
	array['iAngle'] = Math.atan(array['iSlope']);
}