/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
const Warning = styled.p`
  color: #e74c3c
`;

const DecimalResult = ({ decimal }) => (
  <p>
    The Decimal Number is:
    <span
      style={{
        color: "#27ae60",
        letterSpacing: 1,
        margin: "0.5em",
        padding: 0
      }}
    >
      {decimal}
    </span>
  </p>
);

export default function Output({ limit, binaryString }) {
  const digitCount = binaryString.length;
  if (binaryString.match(/[^01]/)) {
    return (
      <Warning>
        You entered a non-binary digit (please enter only 0 or 1).
      </Warning>
    );
  } else if (digitCount > limit) {
    return (
      <Warning>
        You can enter up to {limit} binary digits in one input field
      </Warning>
    );
  } else if (digitCount === 0) {
    return <p>Enter a binary number, get a decimal conversion.</p>;
  } else {
    const decimal = parseInt(binaryString, 2);
    if (isNaN(decimal)) {
      return (
        <Warning>Please check your input, the convert is invalid.</Warning>
      );
    } else {
      return <DecimalResult decimal={decimal}></DecimalResult>;
    }
  }
}
