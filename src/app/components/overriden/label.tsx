import {
  PropsWithChildren,
  DetailedHTMLProps,
  LabelHTMLAttributes,
} from 'react';

const Label = (
  props: PropsWithChildren<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
  >
) => {
  const { children, ...rest } = props;
  return (
    <label
      {...rest}
      className={`font-family-lato w-full mb-4 inline-block ${
        rest?.className || ''
      }`}
    >
      {children}
    </label>
  );
};
export default Label;
