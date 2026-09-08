/* ==========================================================================
   INTERACTIVE DESIGN-TO-CODE PLAYGROUND
   이예원 (LEEyewon) - Portfolio Interactive Lab
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPlayground();
});

function initPlayground() {
  const radiusInput = document.getElementById('token-radius');
  const paddingInput = document.getElementById('token-padding');
  const shadowInput = document.getElementById('token-shadow');
  
  const radiusVal = document.getElementById('val-radius');
  const paddingVal = document.getElementById('val-padding');
  const shadowVal = document.getElementById('val-shadow');
  
  const targetCard = document.getElementById('playground-target-card');
  const targetBtn = document.getElementById('playground-target-btn');
  const codeOutput = document.getElementById('playground-code-output');
  const copyBtn = document.getElementById('copy-playground-code');

  const colorBtns = document.querySelectorAll('.color-preset-btn');

  if (!targetCard || !codeOutput) return;

  // Initial State
  let currentRadius = radiusInput ? radiusInput.value : 16;
  let currentPadding = paddingInput ? paddingInput.value : 24;
  let currentShadow = shadowInput ? shadowInput.value : 2;
  let currentColor = '#6366f1';
  let currentColorName = 'Indigo';

  const shadowStyles = {
    0: 'none',
    1: '0 4px 12px rgba(0, 0, 0, 0.1)',
    2: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
    3: '0 20px 35px -5px rgba(0, 0, 0, 0.4)'
  };

  function updateCardAndCode() {
    // 1. Update UI Elements
    targetCard.style.borderRadius = `${currentRadius}px`;
    targetCard.style.padding = `${currentPadding}px`;
    targetCard.style.boxShadow = shadowStyles[currentShadow] || shadowStyles[2];
    
    if (targetBtn) {
      targetBtn.style.backgroundColor = currentColor;
      targetBtn.style.borderRadius = `${Math.max(6, currentRadius * 0.5)}px`;
    }

    // 2. Update Value Badges
    if (radiusVal) radiusVal.textContent = `${currentRadius}px`;
    if (paddingVal) paddingVal.textContent = `${currentPadding}px`;
    if (shadowVal) {
      const labels = ['None', 'Subtle', 'Medium', 'Elevated'];
      shadowVal.textContent = labels[currentShadow] || `${currentShadow}`;
    }

    // 3. Generate Live CSS Token Code
    const generatedCSS = `/* Generated Design Tokens & Component */
:root {
  --component-radius: ${currentRadius}px;
  --component-padding: ${currentPadding}px;
  --theme-accent: ${currentColor}; /* ${currentColorName} */
  --elevation-shadow: ${shadowStyles[currentShadow]};
}

.modern-interactive-card {
  border-radius: var(--component-radius);
  padding: var(--component-padding);
  box-shadow: var(--elevation-shadow);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modern-action-btn {
  background-color: var(--theme-accent);
  border-radius: calc(var(--component-radius) * 0.5);
}`;

    codeOutput.textContent = generatedCSS;
  }

  // Event Listeners for Range Controls
  if (radiusInput) {
    radiusInput.addEventListener('input', (e) => {
      currentRadius = e.target.value;
      updateCardAndCode();
    });
  }

  if (paddingInput) {
    paddingInput.addEventListener('input', (e) => {
      currentPadding = e.target.value;
      updateCardAndCode();
    });
  }

  if (shadowInput) {
    shadowInput.addEventListener('input', (e) => {
      currentShadow = e.target.value;
      updateCardAndCode();
    });
  }

  // Color Preset Buttons
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.getAttribute('data-color');
      currentColorName = btn.getAttribute('data-name') || 'Custom';
      updateCardAndCode();
    });
  });

  // Copy Generated Code to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Copied!
        `;
        copyBtn.style.color = '#10b981';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }

  // Initialize once
  updateCardAndCode();
}
