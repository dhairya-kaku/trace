// Vercel Web Analytics initialization
// This script initializes Vercel Web Analytics without requiring a bundler

(function() {
  'use strict';
  
  // Initialize the analytics queue
  if (window.va) return;
  
  window.va = function() {
    (window.vaq = window.vaq || []).push(arguments);
  };
  
  // Detect if we're in production
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '';
  
  const mode = isDev ? 'development' : 'production';
  
  // Create and inject the analytics script
  const script = document.createElement('script');
  script.defer = true;
  
  if (mode === 'development') {
    // In development, just log instead of tracking
    console.log('[Vercel Analytics] Running in development mode');
    window.va = function(event, data) {
      console.log('[Vercel Analytics]', event, data);
    };
  } else {
    // In production, load the Vercel analytics script
    // Vercel will inject the correct script URL when deployed
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
  }
})();
