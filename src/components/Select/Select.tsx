import type { SelectProps } from "../../types/types";

export const Select = ({
  id,
  name,
  className,
  onChange,
  children
}: SelectProps) => (
  <select id={id} name={name} className={className} onChange={onChange}>
    {children}
  </select>
);
