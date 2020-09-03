import React, { lazy, Suspense } from "react";
import "normalize.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const context = require.context("./projects", true, /\.\/([^/.]+)\/index\.js$/);
const routerList = [];
const projectCache = {};

context.keys().forEach((key) => {
  const component = context(key)?.default;
  if (component) {
    const { name, description, ...rest } = component;
    const slug = name
      .replace(/\s/, "-")
      .replace(/([^A-Z](?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    routerList.push({
      slug,
      name,
      description,
    });
    projectCache[slug] = rest;
  }
});

export default function App() {
  return (
    <ErrorBoundary>
      <Router basename="/app-ideas-challenge">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <ul>
                  {routerList.map(({ name, slug, description }) => (
                    <li key={name}>
                      <Link to={`/${slug}`}>
                        {name}：{description}
                      </Link>
                    </li>
                  ))}
                </ul>
              );
            }}
          ></Route>
          <Route
            path="/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              const project = projectCache[slug];
              if (project) {
                const Component = lazy(() => project.getMain());
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
