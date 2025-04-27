import { ReactNode, useEffect, useState } from "react";

interface IModal {
  children?: ReactNode;
  isModalOpen: boolean;
  className?: string;
}

const Modal = ({ children, className, isModalOpen }: IModal) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      const timeout = setTimeout(() => setIsVisible(false), 10);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div
          className={` transition-all duration-200 bg-background/80 fixed inset-0 z-[9999] flex items-center justify-center`}
        >
          <div
            className={`${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            } ${
              className || ""
            } transition-all duration-200 w-4/5 max-w-[400px] h-auto bg-surface rounded-md`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
