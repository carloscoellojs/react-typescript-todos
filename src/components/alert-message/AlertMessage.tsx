
import { useEffect, useState } from "react";
import type { MessageDetails } from "../../types/types";

export const AlertMessage = (message: MessageDetails) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const text = message.error || message.success;
  return (
    <div className="text-raspberry my-1">
      {text}
    </div>
  );  
};
