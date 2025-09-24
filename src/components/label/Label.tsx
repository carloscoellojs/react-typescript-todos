import type { LabelProps } from "../../types/types";

export const Label = ({ htmlFor, className, children }: LabelProps) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);
