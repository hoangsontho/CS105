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

// function init
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

