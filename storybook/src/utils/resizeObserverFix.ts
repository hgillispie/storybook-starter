// Fix for ResizeObserver loop completed with undelivered notifications
// This is a common issue in containerized environments like Fly.io

// Suppress ResizeObserver loop limit exceeded error
const resizeObserverError = 'ResizeObserver loop completed with undelivered notifications.';
const resizeObserverLoopError = 'ResizeObserver loop limit exceeded';

// Store the original console.error
const originalConsoleError = console.error;

// Override console.error to filter out ResizeObserver errors
console.error = (...args: any[]) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes(resizeObserverError) || message.includes(resizeObserverLoopError))
  ) {
    // Suppress these specific errors
    return;
  }
  // Call the original console.error for all other errors
  originalConsoleError.apply(console, args);
};

// Add ResizeObserver polyfill if not available
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  // Simple polyfill for ResizeObserver
  class ResizeObserverPolyfill {
    private callback: ResizeObserverCallback;
    private elements: Set<Element> = new Set();

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe(element: Element) {
      this.elements.add(element);
      // Trigger initial callback
      setTimeout(() => {
        this.callback([], this);
      }, 0);
    }

    unobserve(element: Element) {
      this.elements.delete(element);
    }

    disconnect() {
      this.elements.clear();
    }
  }

  (window as any).ResizeObserver = ResizeObserverPolyfill;
}

// Export a function to apply the fix
export const applyResizeObserverFix = () => {
  // The fix is applied immediately when this module is imported
  console.log('ResizeObserver fix applied');
};

// Apply the fix immediately
applyResizeObserverFix(); 