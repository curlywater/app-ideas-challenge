import React, { Suspense } from "react";
import "normalize.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route
            path="/:project"
            render={({ match }) => {
              const Component = React.lazy(() =>
                import(`./projects/${match.params.project}`)
              );
              return (
                <Suspense fallback={<div></div>}>
                  <Component />
                </Suspense>
              );
            }}
          />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
