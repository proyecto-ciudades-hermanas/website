import { useState } from 'preact/hooks';
import { SubtitleReact } from './SubtitleReact';

export function Gallery() {
  const imageCount = 13;
  const initialImageCount = 8;

  const [visibleImages, setVisibleImages] = useState(initialImageCount);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const galleryImages = Array.from({ length: imageCount }, (_, i) => ({
    src: `/imagenes/galeria/Imagen-${i + 1}.webp`,
    alt: `Imagen ${i + 1}`
  }));

  const handleShowMore = () => {
    setVisibleImages(imageCount);
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="galeria" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <SubtitleReact text="Galería" />
      <p className="text-center text-gray-600 mb-6">
        Explora nuestra galería de imágenes del proyecto Ciudades Hermanas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.slice(0, visibleImages).map((image, index) => (
          <button 
            type="button"
            key={index} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.03]" 
            onClick={() => openModal(image.src)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-52 object-cover" 
            />
          </button>
        ))}
      </div>
      
      {visibleImages < imageCount && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
            className="btn-primary px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
            onClick={handleShowMore}
          >
            Ver más imágenes
          </button>
        </div>
      )}

      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50" 
          onClick={closeModal}
        >
          <div 
            className="relative max-w-[90%] max-h-[90%]" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 focus:outline-none hover:cursor-pointer" 
              onClick={closeModal}
            >
              &times;
            </button>
            <img 
              src={modalImage} 
              className="max-w-full max-h-[90vh] object-contain rounded" 
              alt="Imagen ampliada" 
            />
          </div>
        </div>
      )}
    </section>
  );
}