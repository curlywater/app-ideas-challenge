import React, { lazy, Suspense } from "react";
import "normalize.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


const context = require.context("./projects", true, /\.\/([^/.]+)\/index\.js$/)
const routerList = [];
const projectCache = {};

context.keys().forEach(key => {
  const component = context(key)?.default;
  if (component) {
    const { name, description, ...rest } = component;
    const slug = name.replace(/\s/, "-").replace(/([^A-Z](?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    routerList.push({
      slug,
      name,
      description
    });
    projectCache[slug] = rest;
  }
})


export default function App() {
  return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <ul>
                  {routerList.map(({ name, slug, description }) => (
                    <li key={name}>
                      <Link to={`/${slug}`}>{name}：{description}</Link>
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
                const readme = lazy(() => project.getReadme());
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
  );
}
