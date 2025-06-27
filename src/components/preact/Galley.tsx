import { useState } from 'preact/hooks';

export function Gallery() {
  const imageCount = 13; // Total de imágenes en la galería
  const initialImageCount = 8; // Número inicial de imágenes a mostrar

  const [visibleImages, setVisibleImages] = useState(initialImageCount);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Generar array de rutas de imágenes
  const galleryImages = Array.from({ length: imageCount }, (_, i) => ({
    src: `/imagenes/galeria/Imagen-${i + 1}.jpeg`,
    alt: `Imagen ${i + 1}`
  }));

  // Mostrar todas las imágenes
  const handleShowMore = () => {
    setVisibleImages(imageCount);
  };

  // Abrir modal con imagen
  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden'; // Prevenir scroll cuando el modal está abierto
  };

  // Cerrar modal
  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = ''; // Restaurar scroll
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Galería de Imágenes</h2>
      
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
            className="px-6 py-2.5 bg-blue-500 text-white rounded-md font-medium transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black/85 focus:ring-opacity-50 hover:cursor-pointer " 
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
    </div>
  );
}