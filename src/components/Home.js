import React from "react";
import { Link } from "@reach/router";

export default function Home({ routerList }) {
  return (
    <ul>
      {routerList.map(({ name, slug, description }) => (
        <li key={name}>
          <Link to={`${slug}`}>
            {name}：{description}
          </Link>
        </li>
      ))}
    </ul>
  );
}
