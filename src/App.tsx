import React, { useState } from "react";
import { CameraUpload } from "./components/CameraUpload";
import { Visualizer } from "./components/Visualizer";

const App: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [roomImage, setRoomImage] = useState<string>("");
  const [selectedType, setSelectedType] = useState("sofa");
  const [selectedStyle, setSelectedStyle] = useState("modern");

  const handleImageUpload = (imageUrl: string) => {
    setRoomImage(imageUrl);
    setStep(2);
  };

  const handleFurnitureSelect = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div>
          <h1 className="text-xl mb-4">Upload or Take a Photo of Your Room</h1>
          <CameraUpload onImageUpload={handleImageUpload} />
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleFurnitureSelect} className="space-y-4">
          <h1 className="text-xl mb-2">Choose Furniture Type & Style</h1>

          <div>
            <label>Furniture Type:</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="border p-2 ml-2"
            >
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
              <option value="table">Table</option>
            </select>
          </div>

          <div>
            <label>Style:</label>
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
              className="border p-2 ml-2"
            >
              <option value="modern">Modern</option>
              <option value="mid-century">Mid-Century</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Visualize
          </button>
        </form>
      )}

      {step === 3 && roomImage && (
        <Visualizer
          roomImage={roomImage}
          selectedType={selectedType}
          selectedStyle={selectedStyle}
        />
      )}
    </div>
  );
};

export default App;
