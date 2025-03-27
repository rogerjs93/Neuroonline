import * as THREE from 'three';

// Simple color palette for parts
const colors = {
    frontal: 0x448AFF, // Blue
    parietal: 0xFFC107, // Amber
    temporal: 0x4CAF50, // Green
    occipital: 0x9C27B0, // Purple
    cerebellum: 0xFF5722, // Deep Orange
    brainstem: 0x795548, // Brown
    thalamus: 0xE91E63, // Pink
    hypothalamus: 0x00BCD4, // Cyan
};

// Function to create a basic mesh with userData
function createPart(geometry, material, name, description, position = { x: 0, y: 0, z: 0 }) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.userData = {
        id: name.toLowerCase().replace(/\s+/g, '-'), // e.g., frontal-lobe
        name: name,
        description: description,
        type: 'brain-part' // Add a type for easier filtering later
    };
    // Enable shadows later if needed
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    return mesh;
}

export function createPlaceholderBrain() {
    const parts = [];
    const defaultMaterial = (color) => new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.7,
        metalness: 0.1
    });

    // --- Major Lobes (Using slightly offset Spheres/Boxes for visual separation) ---
    const lobeScale = 2.5;

    // Frontal Lobe (Placeholder: Slightly flattened sphere)
    const frontalGeo = new THREE.SphereGeometry(lobeScale, 32, 16);
    frontalGeo.scale(1, 0.8, 1); // Flatten slightly
    parts.push(createPart(
        frontalGeo,
        defaultMaterial(colors.frontal),
        'Frontal Lobe',
        'Involved in executive functions, planning, decision making, personality, and voluntary movement.',
        { x: 0, y: 1.5, z: lobeScale * 0.7 }
    ));

    // Parietal Lobe (Placeholder: Box)
    const parietalGeo = new THREE.BoxGeometry(lobeScale * 1.8, lobeScale * 0.8, lobeScale * 1.5);
    parts.push(createPart(
        parietalGeo,
        defaultMaterial(colors.parietal),
        'Parietal Lobe',
        'Processes sensory information (touch, temperature, pain), spatial awareness, and navigation.',
        { x: 0, y: lobeScale * 1.2, z: -lobeScale * 0.5 }
    ));

    // Temporal Lobe (Placeholder: Cylinders on sides)
    const temporalGeo = new THREE.CylinderGeometry(lobeScale * 0.6, lobeScale * 0.6, lobeScale * 1.8, 32);
    parts.push(createPart(
        temporalGeo,
        defaultMaterial(colors.temporal),
        'Left Temporal Lobe',
        'Processes auditory information, language comprehension (Wernicke\'s area), and memory.',
        { x: -lobeScale * 1.1, y: 0, z: 0 }
    ));
    parts.push(createPart(
        temporalGeo.clone(), // Use clone for the other side
        defaultMaterial(colors.temporal),
        'Right Temporal Lobe',
        'Processes auditory information, facial recognition, and memory.',
        { x: lobeScale * 1.1, y: 0, z: 0 }
    ));

     // Occipital Lobe (Placeholder: Sphere at the back)
     const occipitalGeo = new THREE.SphereGeometry(lobeScale * 0.8, 32, 16);
     parts.push(createPart(
        occipitalGeo,
        defaultMaterial(colors.occipital),
        'Occipital Lobe',
        'Primary visual processing center.',
        { x: 0, y: 1, z: -lobeScale * 1.5 }
     ));

    // Cerebellum (Placeholder: Sphere below occipital)
    const cerebellumGeo = new THREE.SphereGeometry(lobeScale * 0.9, 32, 16);
    parts.push(createPart(
        cerebellumGeo,
        defaultMaterial(colors.cerebellum),
        'Cerebellum',
        'Coordinates voluntary movements, posture, balance, coordination, and speech.',
        { x: 0, y: -lobeScale * 0.5, z: -lobeScale * 1.2 }
    ));

    // Brainstem (Placeholder: Cylinder)
    const brainstemGeo = new THREE.CylinderGeometry(lobeScale * 0.3, lobeScale * 0.4, lobeScale * 1.5, 16);
    parts.push(createPart(
        brainstemGeo,
        defaultMaterial(colors.brainstem),
        'Brainstem',
        'Connects cerebrum and cerebellum to spinal cord. Controls vital functions (breathing, heart rate, sleep). Origin of most cranial nerves.',
        { x: 0, y: -lobeScale * 0.8, z: -lobeScale * 0.2 }
    ));

    // --- Deeper Structures (Placeholders - smaller spheres inside) ---
    const deepScale = 0.5;

    // Thalamus (Placeholder: Sphere near center)
    const thalamusGeo = new THREE.SphereGeometry(deepScale, 16, 8);
    parts.push(createPart(
        thalamusGeo,
        defaultMaterial(colors.thalamus),
        'Thalamus',
        'Relay station for most sensory and motor signals to the cerebral cortex. Regulates consciousness, sleep, and alertness.',
        { x: 0, y: 0.5, z: -0.5 }
    ));

    // Hypothalamus (Placeholder: Small sphere below thalamus)
    const hypothalamusGeo = new THREE.SphereGeometry(deepScale * 0.5, 16, 8);
    parts.push(createPart(
        hypothalamusGeo,
        defaultMaterial(colors.hypothalamus),
        'Hypothalamus',
        'Controls body temperature, hunger, thirst, fatigue, sleep cycles, and circadian rhythms. Links nervous system to endocrine system via the pituitary gland.',
        { x: 0, y: 0, z: 0 }
    ));


    console.log(`Created ${parts.length} placeholder brain parts.`);
    return parts;
}

// We will add functions here later for placeholder cranial nerves, neurons etc.
// e.g., export function createPlaceholderCranialNerves() { ... }
