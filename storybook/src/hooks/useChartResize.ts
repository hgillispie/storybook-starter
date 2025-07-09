import { useState, useEffect, useRef } from 'react';

interface UseChartResizeOptions {
  delay?: number;
  retryAttempts?: number;
}

export function useChartResize(options: UseChartResizeOptions = {}) {
  const { delay = 100, retryAttempts = 3 } = options;
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const initializeChart = () => {
      // Check if container is properly sized
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setIsReady(true);
          return;
        }
      }

      // Retry if container is not ready
      if (retryCount < retryAttempts) {
        timeoutId = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          initializeChart();
        }, delay);
      } else {
        // Fallback: set ready anyway after max attempts
        setIsReady(true);
      }
    };

    initializeChart();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, retryAttempts, retryCount]);

  // Handle ResizeObserver errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver')) {
        event.preventDefault();
        // Reset and retry
        setIsReady(false);
        setRetryCount(0);
        setTimeout(() => {
          setIsReady(true);
        }, 200);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return {
    isReady,
    containerRef,
    retryCount,
  };
} 