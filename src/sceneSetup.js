import * as THREE from 'three';

export function setupScene(canvas) {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2a); // Dark blue background

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75, // Field of View
        window.innerWidth / window.innerHeight, // Aspect Ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.set(0, 2, 10); // Initial camera position

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true // Smoother edges
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Improve performance on high DPI screens
    // Enable shadows later if needed
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return { scene, camera, renderer };
}
