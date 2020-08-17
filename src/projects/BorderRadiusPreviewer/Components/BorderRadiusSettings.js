/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useMemo, useCallback } from "react";
import BorderRadiusInput from "./BorderRadiusInput";

const BorderRadiusSettingRow = ({
  name,
  borderRadius,
  baseWidth,
  onChange,
}) => {
  const hName = `${name}H`;
  const vName = `${name}V`;
  const horizontalRadius = borderRadius[hName];
  const verticalRadius = borderRadius[vName];

  const changeBorderRadius = useCallback(
    ({ name, value }) => {
      onChange(
        Object.assign({}, borderRadius, {
          [name]: value,
        })
      );
    },
    [borderRadius, onChange]
  );
  const formattedName = useMemo(() => {
    return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  }, [name]);
  const sectionStyle = css`
    margin-bottom: 1rem;
  `;
  return (
    <article>
      <h3>{`border-${formattedName}-radius`}</h3>
      <section css={sectionStyle}>
        <BorderRadiusInput
          label="Horizontal Radius"
          name={hName}
          radius={horizontalRadius}
          baseWidth={baseWidth}
          onChange={changeBorderRadius}
        />
      </section>

      <section css={sectionStyle}>
        <BorderRadiusInput
          label="Vertical Radius"
          name={vName}
          radius={verticalRadius}
          baseWidth={baseWidth}
          onChange={changeBorderRadius}
        />
      </section>
    </article>
  );
};

export default ({ baseWidth, borderRadius, onChange }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        grid-column-gap: 4rem;
      `}
    >
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((name) => (
        <BorderRadiusSettingRow
          key={name}
          name={name}
          baseWidth={baseWidth}
          borderRadius={borderRadius}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
