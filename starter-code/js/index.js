const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3f3f3f);
const width = window.innerWidth * 1;
const height = window.innerHeight * 0.99;
let geoCamY = 0;
// let camDiff = 20;
let camDiff = 3

const fov = 45;
const aspect = width / height;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.x = camDiff * geoCamY;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);
lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

// Material definition

const normalMaterial = new THREE.MeshNormalMaterial();
var phongMaterial = new THREE.MeshPhongMaterial({
  color: 0x156289,
  emissive: 0x072534,
  side: THREE.DoubleSide,
  flatShading: true
});

let material = phongMaterial;

// Geometry definition

// Platonic solid

const cube = (() => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  return new THREE.Mesh(geometry, material);
})();

// Geometry drawing

const geos = [cube];

function onKeydown(event) {
  if (event.keyCode === 37) {
    geoCamY -= 1;
  } else if (event.keyCode === 39) {
    geoCamY += 1;
  }
}

document.addEventListener("keydown", onKeydown);

function addShape() {
  for (let g of geos) {
    scene.add(g);
    g.position.x = camDiff * geos.indexOf(g);
  }
}

addShape();

function animate() {
  requestAnimationFrame(animate);

  const epsilon = 0.01;

  if (camera.position.x - camDiff * geoCamY > epsilon) {
    camera.position.x -= camDiff / 20;
  } else if (camDiff * geoCamY - camera.position.x > epsilon) {
    camera.position.x += camDiff / 20;
  }

  for (let g of geos) {
    g.rotation.x += 0.01;
    g.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
