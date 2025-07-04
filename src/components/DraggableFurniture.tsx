import React, { useState, useRef, useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface DraggableFurnitureProps {
  imageUrl: string;
  alt: string;
  initialPosition: { x: number; y: number };
  purchaseUrl: string;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export const DraggableFurniture: React.FC<DraggableFurnitureProps> = ({
  imageUrl,
  alt,
  initialPosition,
  purchaseUrl,
  onPositionChange
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState(initialPosition);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const newPosition = { x: data.x, y: data.y };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    },
    [onPositionChange]
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        onWheel={handleWheel}
        className="cursor-move text-center"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="w-40 h-40 object-contain mx-auto"
        />
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block mt-1 text-sm"
        >
          View & Buy
        </a>
      </div>
    </Draggable>
  );
};
