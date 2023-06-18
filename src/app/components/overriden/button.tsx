import {
  PropsWithChildren,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from 'react';

const Button = (
  props: PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className={` rounded-lg p-2 px-6 font-family-lato w-full mb-4 inline-block bg-secondary text-primary ${
        rest?.className || ''
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
