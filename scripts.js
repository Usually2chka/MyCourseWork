// Function to fetch and load element data from JSON file
async function loadElementData() {
    const response = await fetch('elements.json'); // Update with the path to your JSON file
    const data = await response.json();
    return data.elements;
  }
  
  // Create a map to hold the element data for quick access
  let elementData = {};
  
  loadElementData().then(elements => {
    elements.forEach(element => {
      elementData[element.symbol] = element;
    });
  
    // Attach click event listeners to elements
    document.querySelectorAll('.element, .d-block, .p-blockelements').forEach(el => {
      el.addEventListener('click', () => {
        const elementSymbol = el.textContent.trim();
        showElementForPcInfo(elementSymbol);
      });
    });
      document.querySelectorAll('.element, .d-block, .p-blockelements').forEach(el => {
    el.addEventListener('mouseover', () => {
      const elementSymbol = el.textContent.trim();
      showElementInfo(elementSymbol);
    });
  });
  });
  
  // Function to show the modal with element info
  function showElementInfo(elementSymbol) {
    const element = elementData[elementSymbol];
    if (!element) return; // Skip if no data is found
    
    // Set the content of the modal
    const modalContent = `
      <h2>${element.name} (${element.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${element.number}</p>
      <p><strong>Atomic Weight:</strong> ${element.atomic_mass}</p>
      <p><strong>Category:</strong> ${element.category}</p>
      <p><strong>Phase:</strong> ${element.phase}</p>
      <p><strong>Density:</strong> ${element.density} g/cm³</p>
      <p><strong>Melting Point:</strong> ${element.melt} K</p>
      <p><strong>Boiling Point:</strong> ${element.boil} K</p>
      <p><strong>Discovered By:</strong> ${element.discovered_by}</p>
    `;
    document.querySelector('.modal .modal-content').innerHTML = modalContent;
  
    // Show the modal
    document.querySelector('.modal').style.display = 'block';
  }
  document.onmousemove = showElementInfo;

  function showElementForPcInfo(elementSymbol) {
    const element = elementData[elementSymbol];
    if (!element) return; // Skip if no data is found
    
    // Set the content of the modal
    const modalContent =    
    `<model-viewer class="user" src="${element.bohr_model_3d}" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1">
    <div class="progress-bar hide" slot="progress-bar">
    <div class="update-bar"></div>
    </div>
    <button slot="ar-button" id="ar-button">
        View in your space
    </button>
    <div id="ar-prompt">
        <img src="https://modelviewer.dev/shared-assets/icons/hand.png">
    </div>
    </model-viewer>`;
    document.querySelector('.ThreeD').innerHTML = modalContent;
    document.querySelector('.ThreeD').style.position = "absolute";
    // Show the modal
    document.querySelector('.ThreeD').style.display = 'block';
    
  }
