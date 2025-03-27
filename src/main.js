import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupScene } from './sceneSetup.js';
import { createPlaceholderBrain } from './models.js';
import { setupInteraction } from './interaction.js';
import { updateInfoPanel, hideInfoPanel } from './ui.js';

// --- Basic Setup ---
const canvas = document.getElementById('webgl-canvas');
const { scene, camera, renderer } = setupScene(canvas);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smoother rotation
controls.target.set(0, 1, 0); // Point camera slightly up

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true; // Enable shadows later if needed
scene.add(directionalLight);

// --- Placeholder Objects ---
const placeholderBrainParts = createPlaceholderBrain();
placeholderBrainParts.forEach(part => scene.add(part));

// --- Interaction ---
// Pass necessary components to the interaction setup
setupInteraction(camera, scene, placeholderBrainParts, (intersectedObject) => {
    // Callback when an object is clicked
    if (intersectedObject && intersectedObject.userData.name) {
        updateInfoPanel(intersectedObject.userData.name, intersectedObject.userData.description);
        // Add highlighting logic here later (e.g., change material)
    } else {
        hideInfoPanel();
        // Remove highlighting logic here later
    }
});

// --- Resize Handling ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Only required if controls.enableDamping or autoRotate are set
    renderer.render(scene, camera);
}

// --- Start ---
animate();
console.log('Neuroonline Initialized (Phase 0: Setup)');
console.log('Using placeholder geometric shapes for brain parts.');
