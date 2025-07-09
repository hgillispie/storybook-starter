import React, { useState, useEffect, useRef } from 'react';
import { Box, BoxProps } from '@mui/material';

interface ChartWrapperProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
}

export default function ChartWrapper({ 
  children, 
  height = 250, 
  width = '100%',
  ...boxProps 
}: ChartWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay rendering to ensure container is properly sized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle ResizeObserver errors gracefully
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver')) {
        event.preventDefault();
        // Optionally retry rendering after a short delay
        setTimeout(() => {
          setIsReady(false);
          setTimeout(() => setIsReady(true), 50);
        }, 100);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        ...boxProps.sx,
      }}
      {...boxProps}
    >
      {isReady && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
} 