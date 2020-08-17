import styled from "@emotion/styled";
import React, { useMemo, useCallback } from "react";

const InputGroup = styled.div`
  label {
    margin-right: 1rem;
  }
  input {
    width: 4em;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  select {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0;
  }
`;

const BorderRadiusInput = ({ label, name, radius, baseWidth, onChange }) => {
  const value = useMemo(() => {
    const match = radius.match(/(\d*)(px|%)$/);
    return match?.[1] || 0;
  }, [radius]);

  const unit = useMemo(() => {
    const match = radius.match(/(\d*)(px|%)$/);

    return match?.[2] || "px";
  }, [radius]);

  const changeRadiusValue = useCallback(
    (e) => {
      const { value } = e.target;
      onChange({
        name,
        value: `${value}${unit}`,
      });
    },
    [name, unit, onChange]
  );
  const changeUnitValue = useCallback(
    (e) => {
      const { value: unit } = e.target;

      onChange({
        name,
        value: `${
          unit === "px" ? (value * baseWidth) / 100 : (value / baseWidth) * 100
        }${unit}`,
      });
    },
    [name, value, baseWidth, onChange]
  );

  return (
    <InputGroup>
      <label>{label}</label>
      <input type="number" min="0" value={value} onChange={changeRadiusValue} />
      <select value={unit} onChange={changeUnitValue} tabIndex="-1">
        <option value="px">px</option>
        <option value="%">%</option>
      </select>
    </InputGroup>
  );
};

export default BorderRadiusInput;
