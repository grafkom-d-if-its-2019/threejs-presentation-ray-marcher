// const THREE = require("three");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3f3f3f);
const width = window.innerWidth * 1;
const height = window.innerHeight * 0.99;
let geoCamY = 0;
let camDiff = 20;
// let camDiff = 3

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

const icosahedron = (() => {
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  return new THREE.Mesh(geometry, material);
})();

const tetrahedron = (() => {
  const geometry = new THREE.TetrahedronGeometry(1, 0);
  return new THREE.Mesh(geometry, material);
})();

const dodecahedron = (() => {
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  return new THREE.Mesh(geometry, material);
})();

const octahedron = (() => {
  const geometry = new THREE.OctahedronGeometry(1, 0);
  return new THREE.Mesh(geometry, material);
})();

// Sphere

const s_rad = 16;

const cylinder = (() => {
  const geometry = new THREE.CylinderGeometry(1, 1, 2, s_rad);
  return new THREE.Mesh(geometry, material);
})();

const cone = (() => {
  const geometry = new THREE.ConeGeometry(1, 2, s_rad);
  return new THREE.Mesh(geometry, material);
})();

const sphere = (() => {
  const geometry = new THREE.SphereGeometry(1, s_rad, s_rad);
  return new THREE.Mesh(geometry, material);
})();

const lathe = (() => {
  let points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2), i / 10 - 0.5));
  }

  const geometry = new THREE.LatheGeometry(points, s_rad, 0, Math.TAU);
  return new THREE.Mesh(geometry, material);
})();

const extrude = (() => {
  let l = 1.2,
    w = 1.2;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, w);
  shape.lineTo(l, w);
  shape.lineTo(w, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.8,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 1
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  return new THREE.Mesh(geometry, material);
})();

// Plane

// const bottomPlane = (() => {
//   const geometry = new THREE.PlaneGeometry(10, 10, 32);
//   return new THREE.Mesh(geometry, material);
// })();

// bottomPlane.position.set(0, 0, -3);
// scene.add(bottomPlane);

const plane = (() => {
  const geometry = new THREE.PlaneGeometry(1, 1, 32);
  return new THREE.Mesh(geometry, material);
})();

const circle = (() => {
  const geometry = new THREE.CircleGeometry(1, s_rad);
  return new THREE.Mesh(geometry, material);
})();

const ring = (() => {
  const geometry = new THREE.RingGeometry(0.2, 1, s_rad);
  return new THREE.Mesh(geometry, material);
})();

const shape = (() => {
  const heartShape = new THREE.Shape();
  let x = 0,
    y = 0;

  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(
    x - 0.6,
    y + 1.1,
    x - 0.3,
    y + 1.54,
    x + 0.5,
    y + 1.9
  );
  heartShape.bezierCurveTo(
    x + 1.2,
    y + 1.54,
    x + 1.6,
    y + 1.1,
    x + 1.6,
    y + 0.7
  );
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const geometry = new THREE.ShapeGeometry(heartShape);
  return new THREE.Mesh(geometry, material);
})();

// Parametric Geometry

function klein(v, u, target) {
  u *= Math.PI;
  v *= 2 * Math.PI;

  u = u * 2;
  var x, y, z;
  if (u < Math.PI) {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
    z =
      -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
  } else {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
    z = -8 * Math.sin(u);
  }

  y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

  target.set(x, y, z);
}

function mobius(u, t, target) {
  // flat mobius strip
  // http://www.wolframalpha.com/input/?i=M%C3%B6bius+strip+parametric+equations&lk=1&a=ClashPrefs_*Surface.MoebiusStrip.SurfaceProperty.ParametricEquations-
  u = u - 0.5;
  var v = 2 * Math.PI * t;

  var x, y, z;

  var a = 2;

  x = Math.cos(v) * (a + u * Math.cos(v / 2));
  y = Math.sin(v) * (a + u * Math.cos(v / 2));
  z = u * Math.sin(v / 2);

  target.set(x, y, z);
}

function mobius_3d(u, t, target) {
  // volumetric mobius strip

  u *= Math.PI;
  t *= 2 * Math.PI;

  u = u * 2;
  var phi = u / 2;
  var major = 2.25,
    a = 0.125,
    b = 0.65;

  var x, y, z;

  x = a * Math.cos(t) * Math.cos(phi) - b * Math.sin(t) * Math.sin(phi);
  z = a * Math.cos(t) * Math.sin(phi) + b * Math.sin(t) * Math.cos(phi);
  y = (major + x) * Math.sin(u);
  x = (major + x) * Math.cos(u);

  target.set(x, y, z);
}

const parametric = (() => {
  const geometry = new THREE.ParametricGeometry(klein, 18, 20);
  return new THREE.Mesh(geometry, material);
})();

const parametric_m = (() => {
  const geometry = new THREE.ParametricGeometry(mobius, 18, 20);
  return new THREE.Mesh(geometry, material);
})();

const parametric_mt = (() => {
  const geometry = new THREE.ParametricGeometry(mobius_3d, 18, 20);
  return new THREE.Mesh(geometry, material);
})();

const torus = (() => {
  const geometry = new THREE.TorusGeometry(5, 2, 16, 100, 3);
  return new THREE.Mesh(geometry, material);
})();

const torusKnot = (() => {
  const geometry = new THREE.TorusKnotGeometry(5, 1, 100, 16, 5, 4);
  return new THREE.Mesh(geometry, material);
})();

// Prototype-based JS object

function CustomSinCurve(scale) {
  THREE.Curve.call(this);
  this.scale = scale === undefined ? 1 : scale;
}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;
CustomSinCurve.prototype.getPoint = function(t) {
  var tx = t * 3 - 1.5;
  var ty = Math.sin(2 * Math.PI * t);
  var tz = 0;

  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
};

// ES2015+ Class

class CustomCosCurve extends THREE.Curve {
  constructor(scale) {
    super();
    THREE.Curve.call(this);
    this.scale = scale === undefined ? 1 : scale;
  }

  getPoint(t) {
    var tx = t * 3;
    var ty = Math.cos(2 * Math.PI * t);
    var tz = Math.sin(2 * Math.PI * t);

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  }
}

const tubeGeometry = (() => {
  const path = new CustomCosCurve(4);
  const geometry = new THREE.TubeGeometry(path, 20, 1.5, 8, false);
  return new THREE.Mesh(geometry, material);
})();

// Helper

const boxline = (() => {
  const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
  const edges = new THREE.EdgesGeometry(geometry);
  return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff00ff}));
})();

const torusline = (() => {
  const geometry = new THREE.TorusGeometry(5, 2, 8, 16, Math.TAU);
  const edges = new THREE.EdgesGeometry(geometry);
  return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff00ff}))
})();

const boxwire = (() => {
  const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
  const wireframe = new THREE.WireframeGeometry(geometry);

  const line = new THREE.LineSegments( wireframe);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;

  return line;
})();

// Geometry drawing

// const geos = [cube, icosahedron, tetrahedron, dodecahedron, octahedron];
// const geos = [cylinder, cone, sphere, lathe, extrude];
// const geos = [plane, circle, ring, shape];
const geos = [parametric, torus, torusKnot, tubeGeometry];
// const geos = [boxline, torusline, boxwire];
camera.position.z = 40;

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
