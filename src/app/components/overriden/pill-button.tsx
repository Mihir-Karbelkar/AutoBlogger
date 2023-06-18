import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';

const PillButton = (
  props: PropsWithChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
) => {
  const { children, ...rest } = props;
  return (
    <div
      className="flex-1 flex rounded-xl  bg-primary p-2 text-[#85858585] hover:drop-shadow-button-overlay hover:cursor-pointer"
      {...rest}
    >
      {children}
    </div>
  );
};

export default PillButton;
