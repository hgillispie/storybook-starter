import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ResizeObserverErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State | null {
    // Check if it's a ResizeObserver-related error
    const isResizeObserverError =
      error.message.includes("ResizeObserver") ||
      error.message.includes("Non-Error exception captured") ||
      error.stack?.includes("ResizeObserver");

    if (isResizeObserverError) {
      // Don't update state, just suppress the error
      console.debug(
        "ResizeObserver error caught and suppressed by boundary:",
        error.message
      );
      return null;
    }

    // For non-ResizeObserver errors, update state to show error UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const isResizeObserverError =
      error.message.includes("ResizeObserver") ||
      error.message.includes("Non-Error exception captured") ||
      error.stack?.includes("ResizeObserver");

    if (isResizeObserverError) {
      // Just log for debugging and suppress
      console.debug("ResizeObserver error suppressed by boundary:", {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
      return;
    }

    // Log other errors normally
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Only show fallback for non-ResizeObserver errors
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#666",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Something went wrong. Please refresh the page.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
