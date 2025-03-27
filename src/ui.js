const infoPanel = document.getElementById('info-panel');
const infoTitle = document.getElementById('info-title');
const infoDescription = document.getElementById('info-description');

export function updateInfoPanel(title, description) {
    if (!infoPanel || !infoTitle || !infoDescription) return; // Safety check

    infoTitle.textContent = title || 'N/A';
    infoDescription.textContent = description || 'No description available.';
    infoPanel.classList.remove('hidden');
}

export function hideInfoPanel() {
     if (!infoPanel) return; // Safety check
    infoPanel.classList.add('hidden');
     // Optionally clear content when hidden
     // infoTitle.textContent = '';
     // infoDescription.textContent = '';
}
