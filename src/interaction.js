import * as THREE from 'three';

let raycaster;
let mouse;
let cameraRef;
let sceneRef;
let interactiveObjects = [];
let onClickCallback = null;

export function setupInteraction(camera, scene, objects, callback) {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    cameraRef = camera;
    sceneRef = scene; // Keep a reference if needed later, maybe just use objects
    interactiveObjects = objects; // Store the array of objects we care about
    onClickCallback = callback;

    window.addEventListener('click', onPointerClick);
    // Optional: Add hover effect later
    // window.addEventListener('mousemove', onPointerMove);
}

function onPointerClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, cameraRef);

    // Calculate objects intersecting the picking ray
    // Make sure to check only the objects we are interested in
    const intersects = raycaster.intersectObjects(interactiveObjects, false); // `false` means don't check descendants if object itself is in the list

    let intersectedObject = null;
    if (intersects.length > 0) {
        // Find the first object that has our expected userData structure
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.userData && intersects[i].object.userData.type === 'brain-part') {
                intersectedObject = intersects[i].object;
                break; // Stop at the first valid object
            }
        }
    }

    // Execute the callback function passed during setup
    if (onClickCallback) {
        onClickCallback(intersectedObject);
    }
}

// --- Add hover effect logic later if needed ---
// let currentlyHovered = null;
// function onPointerMove(event) { ... raycast ... manage hovered state ... }
