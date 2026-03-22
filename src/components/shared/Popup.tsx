import React from "react";
import { ExclamationMarkIcon } from "@phosphor-icons/react";

interface PopupProps {
  show?: boolean;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
}

export default function Popup({
  show = true,
  title,
  description,
  primaryLabel,
  secondaryLabel = "",
  showSecondary = true,
  onPrimary,
  onSecondary,
  onClose,
}: PopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-lg w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-yellow-50 rounded-full p-3 mb-4">
            <ExclamationMarkIcon size={28} className="text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-6">{description}</p>

          <div className="w-full flex flex-col justify-center sm:flex-row gap-3">
            <button
              onClick={onPrimary}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg"
            >
              {primaryLabel}
            </button>
            {showSecondary && (
              <button
                onClick={onSecondary}
                className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-lg text-gray-700"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
