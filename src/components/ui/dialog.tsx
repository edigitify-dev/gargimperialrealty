"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import "./dialog.css";

type DialogProps = {
  children: ReactNode;
  label: string;
  onClose: () => void;
  wide?: boolean;
};

export default function Dialog({ children, label, onClose, wide = false }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`dialog ${wide ? "dialog-wide" : ""}`}
    >
      <button className="close-button" onClick={onClose} aria-label="Close dialog">
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}
