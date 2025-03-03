import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onModalClose: () => void;
  children: ReactNode;
}

interface SectionProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<SectionProps>;
  Body: React.FC<SectionProps>;
  Footer: React.FC<SectionProps>;
} = ({ onModalClose, children }) => {
  return (
    <div className="fixed bg-black/50 inset-0 backdrop-blur-xs top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white w-lg h-lg rounded-lg flex flex-col p-5 mx-3 sm:mx-0 relative">
        <button
          className="absolute top-3 right-3 text-black"
          onClick={onModalClose}
        >
          <X className="cursor-pointer" />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }: SectionProps) => (
  <div className="mb-5">{children}</div>
);
Modal.Body = ({ children }: SectionProps) => (
  <div className="mb-5">{children}</div>
);
Modal.Footer = ({ children }: SectionProps) => <div>{children}</div>;

export default Modal;
