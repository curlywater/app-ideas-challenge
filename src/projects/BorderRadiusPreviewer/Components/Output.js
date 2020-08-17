/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useRef } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  label {
    margin-right: 1rem;
  }
`;
const CopyButton = styled.button`
  border: none;
  padding: 0.5em 0.625em;
  text-transform: uppercase;
  border-radius: 0 2px 2px 0;
  cursor: pointer;
  background: #f09;
  color: #fff;
  font-weight: bold;
  &:hover {
    background: #3023ae;
  }
`;

const InputGroup = styled.div`
  display: flex;
`;

export default function Output({ borderRadius }) {
  const codeRef = useRef(null);
  return (
    <Wrapper>
      <label>border-radius: </label>
      <InputGroup>
        <input
          readOnly
          css={css`
            color: #002;
            background: #ccc;
            padding: 0.5em 0.625em;
            border-radius: 2px 0 0 2px;
          `}
          ref={codeRef}
          value={borderRadius}
        ></input>
        <CopyButton
          onClick={() => {
            console.log("");
            const codeEl = codeRef.current;
            codeEl.select();
            codeEl.setSelectionRange(0, 99999);
            document.execCommand("copy");
          }}
        >
          COPY
        </CopyButton>
      </InputGroup>
    </Wrapper>
  );
}
