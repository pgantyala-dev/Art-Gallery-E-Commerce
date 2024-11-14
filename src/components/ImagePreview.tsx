import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  title: string;
  onClose: () => void;
}

export function ImagePreview({ image, title, onClose }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
        <div className="aspect-[4/3] w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
        </div>
      </div>
    </div>
  );
}