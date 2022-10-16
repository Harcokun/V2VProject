import * as React from 'react';

import type { ColorStyle } from '../../utils/styles';

interface ButtonColorSet {
  background: string;
  border: string;
  text: string;
}

interface ButtonProp {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  colorStyle: ColorStyle<ButtonColorSet>; // when pass the prop just default color style is enough
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  margin?: [number, number, number, number]; // receive margin value in pixel, the format is [top, right, bottom, left]
  width?: string;
  height?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProp> = ({
  type,
  text,
  colorStyle,
  onClick,
  margin,
  width,
  height,
  disabled,
}) => {
  // Set default color style
  let colors: React.CSSProperties = {
    background: colorStyle.default.background,
    borderColor: colorStyle.default.border,
    color: colorStyle.default.text,
  };

  // Set disabled color style when the button is disabled and the colorStyle.disabled exist
  if (disabled && colorStyle.disabled) {
    colors = {
      background: colorStyle.disabled!.background,
      borderColor: colorStyle.disabled!.border,
      color: colorStyle.disabled!.text,
    };
  }

  // Set margin, width, and height of the button
  const styles: React.CSSProperties = {
    margin: margin
      ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
      : '0',
    width: width || '148px',
    height: height || '40px',
    ...colors,
  };

  return (
    <button
      type={type}
      className="rounded-[60px] font-medium text-[16px] border hover:opacity-60"
      onClick={onClick}
      style={styles}
      disabled={disabled || false}
    >
      {text}
    </button>
  );
};

export default Button;
