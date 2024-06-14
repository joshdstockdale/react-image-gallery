import React, { Component, PropsWithChildren } from "react";

interface ErrorInfo {
  componentStack: string;
}
interface ErrorBoundaryProps {
  children: React.ReactNode; // Specify children prop
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught in ErrorBoundary:", error, errorInfo.componentStack);
    // You can also log error details to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
