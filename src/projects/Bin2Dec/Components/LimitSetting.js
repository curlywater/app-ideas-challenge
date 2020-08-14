/** @jsx jsx */
import { useCallback,useRef } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const LimitInput = styled.input`
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  max-width: 4em;
  color: #fff;
  text-align: center;
  outline: none;
`;

export default function LimitSetting ({ value, onChange }){
  const inputEl = useRef(null);
  const checkboxEl = useRef(null);
  const handleCheckboxChange = useCallback(
    (event) => {
      onChange(event.target.checked ? inputEl.current.value : Infinity);
    },
    [onChange, inputEl]
  );
  const handleInputChange = useCallback(
    (event) => {
      if (checkboxEl.current.checked) {
        onChange(event.target.value);
      }
    },
    [checkboxEl, onChange]
  );
  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <input
        type="checkbox"
        css={css`
          margin-right: 8px;
        `}
        checked={value !== Infinity}
        onChange={handleCheckboxChange}
        ref={checkboxEl}
      />
      Set limit upper to
      <LimitInput
        type="number"
        min="1"
        defaultValue={value}
        ref={inputEl}
        onChange={handleInputChange}
      />
      .
    </div>
  );
};