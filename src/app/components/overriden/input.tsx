import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      {...props}
      className={`rounded-xl h-10 bg-neutral-100 p-2 w-full ${
        props?.className || ''
      }`}
    />
  );
};

export default Input;
