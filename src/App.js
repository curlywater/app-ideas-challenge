import React from "react";
import "normalize.css";

import { Router } from "@reach/router";
import { Home, Showcase } from "./components";

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
      <Router basepath="/app-ideas-challenge">
        <Home path="/" routerList={routerList} />
        <Showcase path="/:slug" projectCache={projectCache} />
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

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
