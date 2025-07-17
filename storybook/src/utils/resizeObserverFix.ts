// Enhanced ResizeObserver fix for MUI X Charts and containerized environments
// This comprehensive solution handles all ResizeObserver-related errors

let isFixApplied = false;

// All possible ResizeObserver error messages
const RESIZE_OBSERVER_ERRORS = [
  "ResizeObserver loop completed with undelivered notifications.",
  "ResizeObserver loop limit exceeded",
  "Non-Error exception captured with keys",
  "ResizeObserver loop completed with undelivered notifications",
];

// Create a more robust ResizeObserver wrapper
function createResizeObserverWrapper() {
  if (typeof window === "undefined" || !window.ResizeObserver) {
    return;
  }

  const OriginalResizeObserver = window.ResizeObserver;

  // Wrapper that catches and suppresses the common loop errors
  class ResizeObserverWrapper extends OriginalResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
        try {
          callback(entries, observer);
        } catch (error) {
          if (error instanceof Error) {
            const isResizeObserverError = RESIZE_OBSERVER_ERRORS.some(
              (errorMsg) => error.message.includes(errorMsg)
            );

            if (isResizeObserverError) {
              // Suppress the error and continue
              console.debug("ResizeObserver error suppressed:", error.message);
              return;
            }
          }
          // Re-throw non-ResizeObserver errors
          throw error;
        }
      };

      super(wrappedCallback);
    }
  }

  // Replace the global ResizeObserver
  (window as any).ResizeObserver = ResizeObserverWrapper;
}

// Enhanced console.error override
function suppressConsoleErrors() {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args[0];
    if (typeof message === "string") {
      const isResizeObserverError = RESIZE_OBSERVER_ERRORS.some((errorMsg) =>
        message.includes(errorMsg)
      );

      if (isResizeObserverError) {
        // Convert to debug log instead of suppressing completely
        console.debug("ResizeObserver error (suppressed):", ...args);
        return;
      }
    }
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0];
    if (typeof message === "string") {
      const isResizeObserverError = RESIZE_OBSERVER_ERRORS.some((errorMsg) =>
        message.includes(errorMsg)
      );

      if (isResizeObserverError) {
        console.debug("ResizeObserver warning (suppressed):", ...args);
        return;
      }
    }
    originalWarn.apply(console, args);
  };
}

// Global error handler for unhandled ResizeObserver errors
function setupGlobalErrorHandler() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    const isResizeObserverError = RESIZE_OBSERVER_ERRORS.some((errorMsg) =>
      event.message.includes(errorMsg)
    );

    if (isResizeObserverError) {
      event.preventDefault();
      event.stopPropagation();
      console.debug("Global ResizeObserver error suppressed:", event.message);
      return false;
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (event.reason instanceof Error) {
      const isResizeObserverError = RESIZE_OBSERVER_ERRORS.some((errorMsg) =>
        event.reason.message.includes(errorMsg)
      );

      if (isResizeObserverError) {
        event.preventDefault();
        console.debug(
          "Unhandled ResizeObserver rejection suppressed:",
          event.reason.message
        );
        return false;
      }
    }
  });
}

// Add ResizeObserver polyfill if not available
function addPolyfillIfNeeded() {
  if (typeof window !== "undefined" && !window.ResizeObserver) {
    class ResizeObserverPolyfill {
      private callback: ResizeObserverCallback;
      private elements: Set<Element> = new Set();
      private connected = false;

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
      }

      observe(element: Element) {
        this.elements.add(element);
        if (!this.connected) {
          this.connected = true;
          // Use requestAnimationFrame for better performance
          requestAnimationFrame(() => {
            if (this.connected && this.elements.size > 0) {
              try {
                const entries: ResizeObserverEntry[] = [];
                this.callback(entries, this);
              } catch (error) {
                console.debug("ResizeObserver polyfill error:", error);
              }
            }
          });
        }
      }

      unobserve(element: Element) {
        this.elements.delete(element);
        if (this.elements.size === 0) {
          this.connected = false;
        }
      }

      disconnect() {
        this.elements.clear();
        this.connected = false;
      }
    }

    (window as any).ResizeObserver = ResizeObserverPolyfill;
  }
}

// Export the fix function
export const applyResizeObserverFix = () => {
  if (isFixApplied) {
    return;
  }

  addPolyfillIfNeeded();
  createResizeObserverWrapper();
  suppressConsoleErrors();
  setupGlobalErrorHandler();

  isFixApplied = true;
  console.debug("Enhanced ResizeObserver fix applied");
};

// Apply the fix immediately when the module is imported
if (typeof window !== "undefined") {
  // Use a timeout to ensure this runs after other initialization
  setTimeout(applyResizeObserverFix, 0);
}

export default applyResizeObserverFix;
