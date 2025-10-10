import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto luxury-gradient rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">Oops! Something went wrong</h1>
              <p className="text-muted-foreground mb-6">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
              {this.state.error && (
                <details className="text-left mb-6 p-4 bg-muted rounded-lg text-sm">
                  <summary className="cursor-pointer font-semibold mb-2">Error details</summary>
                  <code className="text-destructive">{this.state.error.message}</code>
                </details>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                size="lg"
              >
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                size="lg"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
