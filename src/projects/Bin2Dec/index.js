/** @jsx jsx */
import { useCallback, useState } from "react";
import "normalize.css";
import { Global, css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import LimitSetting from "./Components/LimitSetting";
import Output from "./Components/Output";

const Wrapper = styled.div`
  width: 80%;
  text-align: center;
  margin: 0 auto;
`;
const Heading = styled.h1`
  font-size: 3rem;
`;

const Input = (props) => (
  <input
    type="text"
    css={css`
      border: none;
      border-radius: 4px;
      font-size: 2rem;
      padding: 1rem;
      outline: none;
      width: 100%;
      box-shadow: 0px 2px 2px;
    `}
    {...props}
  />
);

export default function App() {
  const [limit, setLimit] = useState(8);
  const [binaryString, setBinaryString] = useState("");

  const handleInputChange = useCallback(
    (event) => {
      setBinaryString(event.target.value);
    },
    [setBinaryString]
  );

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
        `}
      />
      <Heading>Bin2Dec</Heading>
      <LimitSetting value={limit} onChange={setLimit} />
      <Input onChange={handleInputChange} />
      <Output limit={limit} binaryString={binaryString} />
    </Wrapper>
  );
}
