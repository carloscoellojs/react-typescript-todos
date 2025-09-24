import type { ListProps } from "../../types/types";

export const List = ({ keyProp, className, children }: ListProps) => (
  <li key={keyProp} className={className}>
    {children}
  </li>
);
