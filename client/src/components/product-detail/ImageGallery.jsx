import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react';
import Modal from '../common/Modal';

const ImageGallery = ({ images = [], productName = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Default placeholder if no images provided
  const defaultImages = [
    { id: 1, url: '🤖', alt: 'Product view 1' },
    { id: 2, url: '⚙️', alt: 'Product view 2' },
    { id: 3, url: '🔧', alt: 'Product view 3' },
    { id: 4, url: '📱', alt: 'Product view 4' },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden group">
        {/* Image */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="text-9xl animate-float">
            {displayImages[selectedIndex].url}
          </div>
        </div>

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm">
          {selectedIndex + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                aspect-square rounded-lg overflow-hidden transition-all
                ${
                  index === selectedIndex
                    ? 'ring-4 ring-blue-500 scale-95'
                    : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-300 hover:scale-95'
                }
              `}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-4xl">{image.url}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        size="full"
        title={productName}
      >
        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="text-[20rem]">
            {displayImages[selectedIndex].url}
          </div>

          {/* Navigation in modal */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}

          {/* Thumbnail strip in modal */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {displayImages.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => handleThumbnailClick(index)}
                className={`
                  w-16 h-16 rounded-lg overflow-hidden transition-all
                  ${
                    index === selectedIndex
                      ? 'ring-4 ring-blue-500 scale-110'
                      : 'ring-2 ring-white/50 hover:ring-blue-300 hover:scale-110'
                  }
                `}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-2xl">{image.url}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;