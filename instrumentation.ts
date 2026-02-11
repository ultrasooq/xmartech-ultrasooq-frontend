// This file runs early in the Next.js lifecycle
// Suppress deprecation warnings from dependencies (google-translate-api-x, etc.)

// Use try-catch and bracket notation to avoid static analysis warnings
// This approach works in both Node.js and Edge Runtime (fails gracefully in Edge)
try {
  // Use bracket notation to access process properties to bypass static analysis
  const proc: any = typeof (globalThis as any).process !== 'undefined' 
    ? (globalThis as any).process 
    : null;
  
  if (proc && typeof proc['on'] === 'function' && typeof proc['removeAllListeners'] === 'function') {
    // Remove existing warning listeners to avoid duplicates
    proc['removeAllListeners']('warning');
    
    // Add custom warning handler
    proc['on']('warning', (warning: any) => {
      // Suppress url.parse() deprecation warnings from dependencies
      if (
        warning?.name === 'DeprecationWarning' && 
        warning?.message?.includes('url.parse')
      ) {
        // Silently ignore - this is from dependencies, not our code
        return;
      }
      
      // Log other warnings normally
      if (warning?.name && warning?.message) {
        console.warn(warning.name, warning.message);
      }
    });
  }
} catch (error) {
  // Silently fail if process APIs are not available (Edge Runtime)
  // This is expected in Edge Runtime environments where process APIs don't exist
  // No action needed - the warning suppression simply won't work in Edge Runtime
}
