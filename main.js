// Import lib
import * as THREE from './js/three.module.js'
import { OrbitControls } from './js/OrbitControls.js';
import { TransformControls } from './js/TransformControls.js';
import { TeapotBufferGeometry } from './js/TeapotBufferGeometry.js';


// variable declaration
var camera, scene, renderer, control, orbit;
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
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        10000
    );

    camera.position.x = 1;
    camera.position.y = 50;
    camera.position.z = 100;

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
    document.getElementById("rendering").addEventListener('MouseDown', onmousedown, false);
    document.getElementById("rendering").appendChild(renderer.domElement);
    window.addEventListener('resize', function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		render();
	})




}
