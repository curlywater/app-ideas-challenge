/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState, useMemo } from "react";

import BorderRadiusSettings from "./Components/BorderRadiusSettings";
import Output from "./Components/Output";

const Wrapper = styled.div`
  padding: 2rem;
`;

const Previewer = styled.div`
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  background: linear-gradient(#cc45c6, #141b6c);
  background-clip: padding-box;
  border: 2px dashed #999;
  margin: 0 auto;
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export default function BorderRadiusPreviewer() {
  const [borderRadius, setBorderRadius] = useState({
    topLeftH: "0",
    topLeftV: "0",
    topRightH: "0",
    topRightV: "0",
    bottomRightV: "0",
    bottomRightH: "0",
    bottomLeftH: "0",
    bottomLeftV: "0",
  });
  const previewerSize = useMemo(() => ({
    width: 360,
    height: 360,
  }), [])
  const outputBorderRadius = useMemo(() => {
    const {
      topLeftH,
      topLeftV,
      topRightH,
      topRightV,
      bottomRightH,
      bottomRightV,
      bottomLeftH,
      bottomLeftV,
    } = borderRadius;
    return (
      [topLeftH, topRightH, bottomRightH, bottomLeftH].join(" ") +
      " / " +
      [topLeftV, topRightV, bottomRightV, bottomLeftV].join(" ")
    );
  }, [borderRadius]);
  return (
    <Wrapper>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }

          body {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            background: #333;
            color: #fff;
          }
          input,
          select {
            padding: 0.5em 0.625em;
            border-radius: 2px;
            border: none;
            outline: none;
            background: #fff;
            color: #002;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        `}
      />
      <Previewer
        borderRadius={outputBorderRadius}
        size={previewerSize}
      ></Previewer>
      <BorderRadiusSettings
        borderRadius={borderRadius}
        baseWidth={previewerSize.width}
        onChange={setBorderRadius}
      />
      <Output borderRadius={outputBorderRadius} />
    </Wrapper>
  );
}
