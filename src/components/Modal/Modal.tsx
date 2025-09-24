import { Link } from "react-router-dom";
import type { ModalProps } from "../../types/types";

export const Modal = ({ message, link1, link2, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-isabelline/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] text-center">
        <div className="flex justify-end items-center">
          <span
            className="text-gray-600 hover:text-raspberry cursor-pointer material-icons"
            onClick={onClose}
            role="button"
          >
            close
          </span>
        </div>
        <div className="text-licorice mb-4 text-lg font-semibold">{message}</div>
        <div className="flex justify-center gap-2 items-center">
          {link1 && (
            <Link to={link1.to} className="router-link-modal">
              {link1.label}
            </Link>
          )}
          {link2 && (
            <Link to={link2.to} className="router-link-modal">
              {link2.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
