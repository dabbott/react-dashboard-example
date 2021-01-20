import { Component, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
}

// Error boundaries currently have to be classes.
export default class ErrorBoundary extends Component<Props> {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    return hasError ? fallback : children;
  }
}
