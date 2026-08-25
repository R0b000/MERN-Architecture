import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm Delete',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onCancel}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />
      
      {/* Modal Box */}
      <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 z-50">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {message}
        </p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-all shadow-md shadow-red-600/10 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
