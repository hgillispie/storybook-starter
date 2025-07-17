import { useState, useEffect, useRef, useCallback } from "react";

interface UseChartResizeOptions {
  delay?: number;
  retryAttempts?: number;
  minWidth?: number;
  minHeight?: number;
}

interface UseChartResizeReturn {
  isReady: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  retryCount: number;
  dimensions: { width: number; height: number };
  retry: () => void;
}

export function useChartResize(
  options: UseChartResizeOptions = {}
): UseChartResizeReturn {
  const {
    delay = 100,
    retryAttempts = 3,
    minWidth = 1,
    minHeight = 1,
  } = options;

  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<ResizeObserver>();

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }
  }, []);

  const checkContainerSize = useCallback((): boolean => {
    if (!containerRef.current) return false;

    const rect = containerRef.current.getBoundingClientRect();
    const isValid = rect.width >= minWidth && rect.height >= minHeight;

    if (isValid) {
      setDimensions({ width: rect.width, height: rect.height });
    }

    return isValid;
  }, [minWidth, minHeight]);

  const initializeChart = useCallback(() => {
    if (checkContainerSize()) {
      setIsReady(true);
      cleanup();
      return;
    }

    if (retryCount < retryAttempts) {
      timeoutRef.current = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        initializeChart();
      }, delay);
    } else {
      // Force ready after max attempts
      console.debug("useChartResize: Max retries reached, forcing ready state");
      setIsReady(true);
      cleanup();
    }
  }, [checkContainerSize, retryCount, retryAttempts, delay, cleanup]);

  const retry = useCallback(() => {
    setIsReady(false);
    setRetryCount(0);
    initializeChart();
  }, [initializeChart]);

  const setupResizeObserver = useCallback(() => {
    if (!containerRef.current || !window.ResizeObserver) return;

    try {
      observerRef.current = new ResizeObserver((entries) => {
        try {
          let hasValidSize = false;

          for (const entry of entries) {
            const { width, height } = entry.contentRect;

            if (width >= minWidth && height >= minHeight) {
              setDimensions({ width, height });
              hasValidSize = true;
            }
          }

          if (hasValidSize && !isReady) {
            setIsReady(true);
          }
        } catch (error) {
          console.debug(
            "ResizeObserver callback error in useChartResize:",
            error
          );
        }
      });

      observerRef.current.observe(containerRef.current);
    } catch (error) {
      console.debug("ResizeObserver setup error in useChartResize:", error);
      // Fallback to timer-based approach
      initializeChart();
    }
  }, [isReady, minWidth, minHeight, initializeChart]);

  useEffect(() => {
    // Initial setup with small delay for DOM readiness
    timeoutRef.current = setTimeout(() => {
      setupResizeObserver();
      initializeChart();
    }, 50);

    return cleanup;
  }, [setupResizeObserver, initializeChart, cleanup]);

  // Suppress ResizeObserver errors specifically for this hook
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("ResizeObserver")) {
        event.preventDefault();
        console.debug("useChartResize: ResizeObserver error suppressed");

        // Gentle retry
        if (!isReady) {
          setTimeout(() => {
            retry();
          }, delay * 2);
        }
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [isReady, retry, delay]);

  return {
    isReady,
    containerRef,
    retryCount,
    dimensions,
    retry,
  };
}
