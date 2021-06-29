// Import lib
import * as THREE from './js/three.module.js'
import { OrbitControls } from './js/OrbitControls.js';
import { TransformControls } from './js/TransformControls.js';
import { TeapotBufferGeometry } from './js/TeapotBufferGeometry.js';


// variable declaration
var camera, scene, renderer, transform, orbit;
var mesh, texture;
var raycaster, light, PointLightHelper, meshplan;
var type_material = 3;
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
material.needsUpdate = true;
var mouse = new THREE.Vector2();

// Geometry
var BoxGeometry = new THREE.BoxGeometry(30, 30, 30, 40, 40, 40);
var SphereGeometry = new THREE.SphereGeometry(20, 20, 20);
var ConeGeometry = new THREE.ConeGeometry(18, 30, 32, 20);
var CylinderGeometry = new THREE.CylinderGeometry(20, 20, 40, 30, 5);
var TorusGeometry = new THREE.TorusGeometry(20, 5, 20, 100);
var TeapotGeometry = new TeapotBufferGeometry(20, 8);
var DodecahedronGeometry = new THREE.DodecahedronBufferGeometry(25);
var IcosahedronGeometry = new THREE.IcosahedronBufferGeometry(25);
var OctahedronGeometry =  new THREE.OctahedronBufferGeometry(25);
var TetrahedronGeometry = new THREE.TetrahedronBufferGeometry(25);
var TorusKnotGeometry = new THREE.TorusKnotGeometry(10,3,100,16);

init();
render();

function init() {
    // init Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x343A40);

    // init Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        10000
    );

    var camera_position_x = 1;
    var camera_position_y = 50;
    var camera_position_z = 100;
    camera.position.set(camera_position_x,camera_position_y, camera_position_z);

    camera.lookAt(new THREE.Vector3(0, 0 , 0));

    // init Grid
    var size = 300;
    var divisions = 50;
    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // init Renderer
    var raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(windown.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById("Rendering").addEventListener('MouseDown', onmousedown, false);
    document.getElementById("Rendering").appendChild(renderer.domElement);
    window.addEventListener('Resize', function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		render();
	})

    // init Orbit
    /* Orbit controls allow the camera to orbit around a target. */
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();
    orbit.addEventListener('Change', render);

    /* TransformControls can be used to transform objects in 3D space. */
    transform = new TransformControls(camera, renderer.domElement);
    console.log(transform);
    transform.addEventListener('Change', render);
    transform.addEventListener('Dragging_to_change', function(event) {
        orbit.enabled = !event.value;
    });

}

// function render the scene
function render() {
    renderer.render(scene, camera);
}

// visualization Geometry
function VisualGeo(id) {
    mesh = scene.getObjectByName("Mesh"); // name -- String to match to the children's Object3D.name property.
	scene.remove(mesh);

    switch(id) {
        case 1 :
            mesh = new THREE.Mesh(BoxGeometry, material);
            break;

        case 2 :
            mesh = new THREE.Mesh(SphereGeometry, material);
            break;

        case 3 :
            mesh = new THREE.Mesh(ConeGeometry, material);
            break;

        case 4 :
            mesh = new THREE.Mesh(CylinderGeometry, material);
            break;

        case 5 :
            mesh = new THREE.Mesh(TorusGeometry, material);
            break;
            
        case 6 :
            mesh = new THREE.Mesh(TorusKnotGeometry, material);
            break;

        case 7 :
            mesh = new THREE.Mesh(TeapotGeometry, material);
            break;

        case 8 :
            mesh = new THREE.Mesh(TetrahedronGeometry, material);
            break;

        case 9 :
            mesh = new THREE.Mesh(OctahedronGeometry, material);
            break;

        case 10 :
            mesh = new THREE.Mesh(DodecahedronGeometry, material);
            break;

        case 11 :
            mesh = new THREE.Mesh(IcosahedronGeometry, material);
            break;
    }

    mesh.name = "Mesh";
    mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
	control_transform(mesh);
	render();

}
window.VisualGeo = VisualGeo();

// visualize Basic 3D model with points, line and solid
function CloneMesh(emulation_mesh) {
	mesh.name = emulation_mesh.name;
	mesh.position.set(emulation_mesh.position.x, emulation_mesh.position.y, emulation_mesh.position.z);
	mesh.rotation.set(emulation_mesh.rotation.x, emulation_mesh.rotation.y, emulation_mesh.rotation.z);
	mesh.scale.set(emulation_mesh.scale.x, emulation_mesh.scale.y, emulation_mesh.scale.z);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
	control_transform(mesh);
}

function SetMaterial(mat) {
	mesh = scene.getObjectByName("Mesh");
	light = scene.getObjectByName("Point_Light");
	type_material = mat;
	if (mesh) {
		const emulation_mesh = mesh.clone();
		scene.remove(mesh);

		switch (type_material) {
			case 1:
				material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
				mesh = new THREE.Points(emulation_mesh.geometry, material);
				CloneMesh(emulation_mesh);
				break;
			case 2:
				material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
				mesh = new THREE.Mesh(emulation_mesh.geometry, material);
				CloneMesh(emulation_mesh);
				break;
			case 3:
				if (!light)
					material = new THREE.MeshBasicMaterial({ color: 0xffffff });
				else
					material = new THREE.MeshPhongMaterial({ color: 0xffffff });
				mesh = new THREE.Mesh(emulation_mesh.geometry, material);
				CloneMesh(emulation_mesh);
				break;
			case 4:
				if (!light)
					material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
				else
					material = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
				mesh = new THREE.Mesh(emulation_mesh.geometry, material);
				CloneMesh(emulation_mesh);
				break;
		}
		render();
	}
}
window.SetMaterial = SetMaterial

// init fov, far, near
// 1. Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is 50.
function setFov(value){
    camera.fov = Number(value);
    camera.updateProjectionMatrix();
	render();
}
window.setFov = setFov;
// 2. Camera frustum far plane. Default is 2000.
function setFar(value) {
	camera.far = Number(value);
	camera.updateProjectionMatrix();
	render();
}
window.setFar = setFar;
// 3. Camera frustum near plane. Default is 0.1.
function setNear(value) {
	camera.near = Number(value);
	camera.updateProjectionMatrix();
	render();
}
window.setNear = setNear;

// init Affine
function Translate() {
	transform.setMode("Translate");
}
window.Translate = Translate;

function Rotate() {
	transform.setMode("Rotate");
}
window.Rotate = Rotate;

function Scale() {
	transform.setMode("Scale");
}
window.Scale = Scale;

// init control transform on key down
function control_transform(mesh) {

	transform.attach(mesh);
	scene.add(transform);
	console.log(transform);
	window.addEventListener('onKeyDown', function (event) {
		switch (event.keyCode) {
			case 82: // R
				Rotate(); break;
			case 83: // S
				Scale(); break;
            case 84: // T
				Translate(); break;
			case 88: // X
				transform.showX = !transform.showX; break;
			case 89: // Y
				transform.showY = !transform.showY; break;
			case 90: // Z
				transform.showZ = !transform.showZ; break;
			case 76: // L
				SetPointLight(); break;
			case 32: // Spacebar
				RemoveLight(); break;
		}
	});
}

// set light
function SetPointLight() {
	light = scene.getObjectByName("Point_Light");

	if (!light) {
		{
            const planeSize = 400;
			const loader = new THREE.TextureLoader();
			const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
			const planeMat = new THREE.MeshPhongMaterial({side: THREE.DoubleSide,}); // include front, back side
			meshplan = new THREE.Mesh(planeGeo, planeMat);
			meshplan.receiveShadow = true;
			meshplan.rotation.x = Math.PI * -0.5;
			meshplan.position.y += 0.5;
            scene.add(meshplan);
        }

		const color = '0xffffff';
		const intensity = 2;
		light = new THREE.PointLight(color, intensity);
		light.castShadow = true;
		light.position.set(50, 70, 50);
		light.name = "Point_Light";
		scene.add(light);

		control_transform(light);
		if (type_material == 3 || type_material == 4) {
			SetMaterial(type_material);
		}
		
		const sphereSize = 2;
		PointLightHelper = new THREE.PointLightHelper(light,sphereSize);
		PointLightHelper.name = "Point_Light_Helper";
		scene.add(PointLightHelper);
		render();
	}
}
window.SetPointLight = SetPointLight;

function RemoveLight() {

	scene.remove(light);
	scene.remove(PointLightHelper);
	scene.remove(meshplan);
	if (type_material == 3 || type_material == 4) {
		SetMaterial(type_material);
	}
	render();
}
window.RemoveLight = RemoveLight;