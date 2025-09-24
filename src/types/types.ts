export type FilterType = "default" | "completed" | "active";

export type Todo = {
  _id: string;
  value: string;
  completed: boolean;
  date: string;
};

export type AddOrUpdateTodoPayload = {
  todo: Todo;
  message: MessageDetails;
};

export type TodoState = {
  todos: Todo[];
  message: MessageDetails;
};

export type AuthState = {
  isAuthenticated: boolean;
  authenticatedUserDetails: AuthenticatedUserDetails;
  message: MessageDetails;
};

export type AuthenticatedUserDetails = {
  username: string;
  email: string;
};

export type LoginDetails = {
  username: string;
  password: string;
};

export type UserDetails = {
  username: string;
  email: string;
  password: string;
};

export type MessageDetails = {
  error: string;
  success: string;
};

export type InputProps = {
  id?: string;
  type: "text" | "checkbox" | "password" | "email";
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  value?: string;
};

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export type ListProps = {
  keyProp: string | number;
  className?: string;
  children: React.ReactNode;
};

export type LabelProps = {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};

export type SelectProps = {
  id?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export type ModalProps = {
  message: string;
  link1?: { to: string; label: string };
  link2?: { to: string; label: string };
  onClose: () => void;
};