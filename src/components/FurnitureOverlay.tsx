import React, { useState, useRef, useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface FurnitureOverlayProps {
  furnitureImage: string;
  furnitureName: string;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export const FurnitureOverlay: React.FC<FurnitureOverlayProps> = ({
  furnitureImage,
  furnitureName,
  onPositionChange
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback((e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  }, [onPositionChange]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.2, Math.min(2, prev + delta)));
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
    >
      <div
        ref={nodeRef}
        className="absolute cursor-move select-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          zIndex: 10
        }}
        onWheel={handleWheel}
      >
        <img
          src={furnitureImage}
          alt={furnitureName}
          className="pointer-events-none max-w-none"
          style={{
            width: "120px",
            height: "auto",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          }}
          draggable={false}
        />
        <div className="absolute -top-6 left-0 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </Draggable>
  );
};