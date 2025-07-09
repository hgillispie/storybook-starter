import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ResizeObserverErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Only catch ResizeObserver errors
    if (error.message.includes('ResizeObserver')) {
      return { hasError: true, error };
    }
    // Re-throw other errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log ResizeObserver errors, suppress them
    if (error.message.includes('ResizeObserver')) {
      console.warn('ResizeObserver error caught and suppressed:', error.message);
      return;
    }
    
    // Log other errors normally
    console.error('Error caught by boundary:', error, errorInfo);
  }

  componentDidMount() {
    // Add global error handler for ResizeObserver
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0];
      if (typeof message === 'string' && message.includes('ResizeObserver')) {
        // Suppress ResizeObserver errors
        return;
      }
      originalError.apply(console, args);
    };

    // Cleanup on unmount
    return () => {
      console.error = originalError;
    };
  }

  render() {
    if (this.state.hasError) {
      // Return fallback or null for ResizeObserver errors
      return this.props.fallback || null;
    }

    return this.props.children;
  }
} 