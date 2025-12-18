type DynamicZoomMode = 'screen-based' | 'viewport-based';

let _mode: DynamicZoomMode = 'screen-based';

export const DEFAULT_ZOOM_SCALE = 1;
export let _scale = DEFAULT_ZOOM_SCALE;

const getZoomRatio = (scale = DEFAULT_ZOOM_SCALE) => {
  const baseWidth = 1920;
  const screenWidth =
    _mode === 'screen-based' ? screen.width : window.innerWidth;
  return Math.max(1, (screenWidth / baseWidth) * scale);
};

// Get current zoom ratio for screenshot scaling
export const getCurrentZoomRatio = () => getZoomRatio(_scale);

const updateZoom = (scale = DEFAULT_ZOOM_SCALE) => {
  const zoomRatio = getZoomRatio(scale);

  // Apply transform scale instead of zoom
  const bodyElement = document.body;
  if (bodyElement) {
    // Use transform: scale() instead of zoom
    bodyElement.style.transform = `scale(${zoomRatio})`;
    bodyElement.style.transformOrigin = 'top left';

    // Adjust width and height to compensate for scale
    bodyElement.style.width = `${100 / zoomRatio}vw`;
    bodyElement.style.height = `${100 / zoomRatio}vh`;

    // Ensure body takes full viewport without scrollbars
    bodyElement.style.margin = '0';
    bodyElement.style.overflow = 'hidden';

    // Also set CSS variable for other components that might need it
    document.documentElement.style.setProperty(
      '--zoom-ratio',
      zoomRatio.toString(),
    );
    document.documentElement.style.setProperty(
      '--inverse-zoom',
      (1 / zoomRatio).toString(),
    );
    document.documentElement.style.setProperty(
      '--body-height',
      `${bodyElement.style.height}`,
    );
  }
};

// Wait for DOM to be ready
const initZoom = () => {
  if (document.body) {
    updateZoom(_scale);
  } else {
    // If body is not ready, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => updateZoom(_scale), {
      once: true,
    });
  }
};

// Update on window resize with debounce
let resizeTimeout: number;
const debouncedUpdate = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => updateZoom(_scale), 100);
};

// Dynamic zoom calculation based on actual screen resolution / 1920
export const setupDynamicZoom = (mode: DynamicZoomMode = 'screen-based') => {
  _mode = mode;
  initZoom();

  if (_mode === 'screen-based') {
    window.addEventListener('resize', () => updateZoom(_scale));
  } else {
    window.addEventListener('resize', debouncedUpdate);
  }

  // Cleanup function
  return () => {
    if (_mode === 'screen-based') {
      window.removeEventListener('resize', () => updateZoom(_scale));
    } else {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(resizeTimeout);
    }

    // Reset styles on cleanup
    if (document.body) {
      document.body.style.transform = '';
      document.body.style.transformOrigin = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.overflow = '';
    }

    // Clear CSS variables
    document.documentElement.style.removeProperty('--zoom-ratio');
    document.documentElement.style.removeProperty('--inverse-zoom');
  };
};

export const setDynamicZoomScale = (scale: number) => {
  _scale = scale;
  updateZoom(_scale);
};
