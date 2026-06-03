console.log("script.js 연결 성공");

// =========================
// 기본 세팅
// =========================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050005);
scene.fog = new THREE.Fog(0x050005, 10, 24);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(6.5, 5, 7.5);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// =========================
// 마우스 컨트롤
// =========================

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 5.5;
controls.maxDistance = 13;
controls.maxPolarAngle = Math.PI / 2.05;

// =========================
// 색상
// =========================

const COLORS = {
  floor: 0x26152f,
  wallBack: 0x2d1836,
  wallSide: 0x1c1025,
  black: 0x07050b,
  darkBlack: 0x030205,
  pink: 0xff4fd8,
  hotPink: 0xff009d,
  softPink: 0xffb8ee,
  purple: 0xc8a5ff,
  whitePink: 0xffe4f8,
  blue: 0x7bdcff,
  green: 0x65ff9a,
  yellow: 0xffdf64,
  red: 0xff4a6a
};

// =========================
// 함수들
// =========================

function createBox(width, height, depth, color, x, y, z) {
  const geometry = new THREE.BoxGeometry(width, height, depth);

  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.55,
    metalness: 0.08
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);
  return mesh;
}

function createNeonBox(width, height, depth, color, x, y, z, intensity) {
  const geometry = new THREE.BoxGeometry(width, height, depth);

  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: intensity || 2.5,
    roughness: 0.25,
    metalness: 0.15
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);
  return mesh;
}

function createCylinder(radius, height, color, x, y, z, isNeon) {
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);

  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: isNeon ? color : 0x000000,
    emissiveIntensity: isNeon ? 2.5 : 0,
    roughness: 0.4
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);
  return mesh;
}

// =========================
// 방 구조
// =========================

// 하얀 받침대
createBox(7.7, 0.28, 6.4, 0xffd7f8, 0, -0.22, 0);

// 바닥
createBox(7.1, 0.2, 5.8, COLORS.floor, 0, 0, 0);

// 뒤 벽
createBox(7.1, 3.8, 0.25, COLORS.wallBack, 0, 1.9, -2.9);

// 오른쪽 벽
createBox(0.25, 3.8, 5.8, COLORS.wallSide, 3.55, 1.9, 0);

// 네온 테두리
createNeonBox(7.25, 0.07, 0.07, COLORS.pink, 0, 3.83, -2.73, 3.2);
createNeonBox(0.07, 0.07, 5.9, COLORS.pink, 3.43, 3.83, 0, 3.2);
createNeonBox(7.35, 0.07, 0.07, COLORS.hotPink, 0, 0.18, 2.95, 3);
createNeonBox(0.07, 0.07, 5.75, COLORS.hotPink, -3.55, 0.18, 0, 2.4);

// =========================
// TV 영역
// =========================

createBox(2.65, 2.15, 0.18, COLORS.black, -2.05, 1.85, -2.72);
createBox(1.8, 1.08, 0.13, COLORS.darkBlack, -2.05, 1.96, -2.55);
createNeonBox(1.55, 0.82, 0.05, COLORS.pink, -2.05, 1.96, -2.45, 1.8);

// TV 화면 안쪽
createNeonBox(1.35, 0.48, 0.035, COLORS.blue, -2.05, 2.03, -2.39, 0.7);
createNeonBox(1.4, 0.12, 0.035, COLORS.green, -2.05, 1.68, -2.38, 0.9);
createNeonBox(0.18, 0.18, 0.035, COLORS.yellow, -2.58, 1.8, -2.35, 1.2);
createNeonBox(0.23, 0.23, 0.035, COLORS.red, -1.48, 1.85, -2.35, 1.2);

// 스피커
createBox(0.2, 1.2, 0.18, COLORS.darkBlack, -3.1, 1.9, -2.45);
createBox(0.2, 1.2, 0.18, COLORS.darkBlack, -1.0, 1.9, -2.45);

createNeonBox(0.045, 1.05, 0.045, COLORS.pink, -3.0, 1.9, -2.32, 2);
createNeonBox(0.045, 1.05, 0.045, COLORS.pink, -1.1, 1.9, -2.32, 2);

// 선반
createNeonBox(1.65, 0.09, 0.32, COLORS.softPink, -2.05, 2.85, -2.46, 0.75);
createBox(0.35, 0.18, 0.28, COLORS.purple, -2.65, 3.02, -2.43);
createBox(0.3, 0.22, 0.26, COLORS.pink, -2.05, 3.04, -2.43);
createBox(0.3, 0.22, 0.26, COLORS.pink, -1.72, 3.04, -2.43);

createNeonBox(1.55, 0.09, 0.3, COLORS.softPink, -2.05, 1.18, -2.46, 0.6);
createBox(0.28, 0.22, 0.18, COLORS.purple, -2.34, 1.36, -2.36);
createBox(0.32, 0.22, 0.18, COLORS.purple, -1.73, 1.36, -2.36);

// =========================
// 문
// =========================

createBox(1.05, 2.45, 0.16, COLORS.darkBlack, 0.9, 1.35, -2.62);

createNeonBox(0.07, 2.55, 0.07, COLORS.hotPink, 0.35, 1.38, -2.48, 2.4);
createNeonBox(0.07, 2.55, 0.07, COLORS.hotPink, 1.45, 1.38, -2.48, 2.4);
createNeonBox(1.15, 0.07, 0.07, COLORS.hotPink, 0.9, 2.67, -2.48, 2.4);
createNeonBox(0.12, 0.05, 0.06, COLORS.whitePink, 1.25, 1.35, -2.4, 1.5);

// =========================
// 오른쪽 벽 장식
// =========================

createNeonBox(0.08, 1.0, 0.72, 0xff2ba6, 3.4, 2.35, -1.45, 0.5);
createNeonBox(0.09, 0.48, 0.42, COLORS.whitePink, 3.34, 2.38, -1.45, 0.8);

createBox(0.08, 1.0, 0.72, COLORS.darkBlack, 3.4, 2.35, 0.15);
createNeonBox(0.09, 0.45, 0.38, COLORS.softPink, 3.34, 2.38, 0.15, 1.2);

createNeonBox(0.16, 0.1, 1.6, COLORS.softPink, 3.27, 1.55, -0.6, 0.7);

createBox(0.22, 0.55, 0.18, COLORS.pink, 3.12, 1.83, -1.18);
createBox(0.22, 0.45, 0.18, COLORS.purple, 3.12, 1.78, -0.9);
createBox(0.22, 0.62, 0.18, COLORS.pink, 3.12, 1.86, -0.62);
createBox(0.22, 0.5, 0.18, COLORS.purple, 3.12, 1.8, -0.34);

// =========================
// 소파
// =========================

createBox(2.35, 0.45, 0.95, COLORS.black, 1.35, 0.45, 1.25);
createBox(2.35, 1.05, 0.28, COLORS.darkBlack, 1.35, 0.92, 1.72);

createBox(0.28, 0.82, 0.95, COLORS.darkBlack, 0.05, 0.72, 1.25);
createBox(0.28, 0.82, 0.95, COLORS.darkBlack, 2.65, 0.72, 1.25);

createNeonBox(2.05, 0.07, 0.06, COLORS.pink, 1.35, 1.25, 1.56, 2);

createBox(0.55, 0.22, 0.18, COLORS.purple, 0.75, 0.85, 1.45);
createBox(0.55, 0.22, 0.18, COLORS.pink, 1.35, 0.85, 1.45);
createBox(0.55, 0.22, 0.18, COLORS.purple, 1.95, 0.85, 1.45);

// =========================
// 테이블
// =========================

createBox(1.55, 0.18, 0.95, COLORS.darkBlack, -0.45, 0.62, 1.0);
createNeonBox(1.22, 0.04, 0.68, COLORS.softPink, -0.45, 0.75, 1.0, 0.8);

createBox(0.08, 0.55, 0.08, 0x11111a, -1.08, 0.3, 0.62);
createBox(0.08, 0.55, 0.08, 0x11111a, 0.18, 0.3, 0.62);
createBox(0.08, 0.55, 0.08, 0x11111a, -1.08, 0.3, 1.38);
createBox(0.08, 0.55, 0.08, 0x11111a, 0.18, 0.3, 1.38);

createNeonBox(0.34, 0.04, 0.25, COLORS.whitePink, -0.48, 0.88, 0.95, 1.8);

// 작은 장식 조명
createCylinder(0.06, 0.65, COLORS.pink, 2.65, 0.48, -1.8, true);
createCylinder(0.06, 0.52, COLORS.softPink, -3.15, 0.42, 2.25, true);

// =========================
// 조명
// =========================

const ambientLight = new THREE.AmbientLight(0x6a2c73, 1.1);
scene.add(ambientLight);

const pinkPointLight1 = new THREE.PointLight(0xff37d5, 4.5, 10);
pinkPointLight1.position.set(-2.8, 2.2, -1.7);
scene.add(pinkPointLight1);

const pinkPointLight2 = new THREE.PointLight(0xff0099, 5, 12);
pinkPointLight2.position.set(3.0, 2.5, 1.5);
scene.add(pinkPointLight2);

const softCeilingLight = new THREE.PointLight(0xffb7ef, 2.6, 8);
softCeilingLight.position.set(0, 3.7, 0.8);
scene.add(softCeilingLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
directionalLight.position.set(3, 6, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// =========================
// 핑크 글로우 원
// =========================

function createGlowCircle(x, z, scale) {
  const geometry = new THREE.CircleGeometry(1, 64);

  const material = new THREE.MeshBasicMaterial({
    color: COLORS.hotPink,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const circle = new THREE.Mesh(geometry, material);
  circle.rotation.x = -Math.PI / 2;
  circle.position.set(x, -0.33, z);
  circle.scale.set(scale, scale, scale);

  scene.add(circle);
}

createGlowCircle(-3.7, 2.9, 1.4);
createGlowCircle(3.7, 2.7, 1.3);
createGlowCircle(0, -3.2, 1.1);

// =========================
// 애니메이션
// =========================

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// =========================
// 화면 크기 대응
// =========================

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
