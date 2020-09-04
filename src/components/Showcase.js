import React, { lazy, Suspense } from "react";
import { Redirect } from "@reach/router";

export default function Showcase({ projectCache, slug }) {
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
}
