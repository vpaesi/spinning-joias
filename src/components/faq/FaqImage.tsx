import { useState } from "react";

interface FaqImageProps {
  src: string;
  alt: string;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function FaqImage({ 
  src, 
  alt, 
  className = "", 
  maxWidth = "full" 
}: FaqImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full"
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
  };

  return (
    <>
      {/* Imagem normal - responsiva */}
      <div className="flex justify-center mt-4">
        <img
          src={src}
          alt={alt}
          className={`h-auto rounded-lg shadow-lg mx-auto cursor-pointer transition-transform hover:scale-105
            w-full max-w-xs sm:max-w-sm md:${maxWidthClasses[maxWidth]} 
            ${className}`}
          style={{ maxHeight: "300px" }}
          loading="lazy"
          onClick={handleImageClick}
          title="Clique para ampliar"
        />
      </div>

      {/* Modal de zoom */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-opacity-75 transition-opacity"
              onClick={handleCloseZoom}
              aria-label="Fechar imagem ampliada"
            >
              ×
            </button>
            <p className="absolute bottom-4 left-4 right-4 text-white text-center text-sm bg-black bg-opacity-50 rounded p-2">
              Toque fora da imagem ou no X para fechar
            </p>
          </div>
        </div>
      )}
    </>
  );
}