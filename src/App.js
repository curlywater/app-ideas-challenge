import React, { lazy, Suspense } from "react";
import "normalize.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

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

const context = require.context("./projects", true, /\.\/([^/.]+)\/index\.js$/, "lazy");
const routerPaths = context.keys().reduce((list, key) => {
  const name = key.match(/\.\/([^/.]+)\/index\.js$/)?.[1];
  if (name) {
    list.push({
      key,
      name,
      slug: name
        .trim()
        .replace(/(\w)([A-Z])/g, "$1-$2")
        .toLowerCase(),
    });
  }
  return list;
}, []);

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <ul>
                  {routerPaths.map(({ name, slug }) => (
                    <li key={name}>
                      <Link to={`/${slug}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              );
            }}
          ></Route>
          <Route
            path="/:projectSlug"
            render={({ match }) => {
              const { projectSlug } = match.params;

              const router = routerPaths.find(
                ({ slug }) => slug === projectSlug
              );
              if (router) {
                const Component = lazy(() => context(router.key));
                return (
                  <Suspense fallback={<div></div>}>
                    <Component />
                  </Suspense>
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
