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
    > & {
      isLoading?: boolean;
    }
  >
) => {
  const { children, isLoading, ...rest } = props;
  return (
    <button
      {...rest}
      className={`  rounded-lg p-2 px-6 font-family-lato w-full mb-4  bg-secondary text-primary disabled:!bg-gray-500 disabled:cursor-not-allowed ${
        rest?.className || ''
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
