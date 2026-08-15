'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-brand-border shadow-2xl rounded-2xl p-4 min-w-[300px] animate-fade-in">
      {type === 'success' ? (
        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
      ) : (
        <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
      )}
      <div className="flex-1">
        <p className="text-sm font-semibold text-brand-dark">{type === 'success' ? 'Success!' : 'Notice'}</p>
        <p className="text-xs text-brand-muted">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 text-brand-muted hover:text-brand-dark transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
