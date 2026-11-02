import React from 'react';
import { Trash2, X } from 'lucide-react';

export const DeletePhotoConfirmModal = ({ isOpen, onClose, onConfirm, isDeleting = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#001d36]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-xs">
            <Trash2 className="w-7 h-7 text-rose-600" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-extrabold text-slate-900">
              Delete Profile Picture?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete your profile picture? Your profile will reset to displaying your name initials.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Yes, Delete</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePhotoConfirmModal;
