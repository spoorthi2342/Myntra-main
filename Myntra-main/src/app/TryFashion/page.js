"use client"
import React, { useState, useRef } from 'react';

const FashionApp = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const videoRef = useRef(null);

  const dummyRecommendedImages = [
    "https://i.pinimg.com/originals/31/35/61/3135617b86932fb9454fb687161a3cdc.png",
    "https://i.pinimg.com/originals/9b/48/81/9b4881a48f274c4b312a8231e6eb33e0.png",
    "https://i.pinimg.com/originals/c3/6d/c4/c36dc497ffe17db8f80d5578ea575ba8.jpg",
    "https://i.etsystatic.com/22421837/r/il/6dc237/4142277229/il_1080xN.4142277229_2oa7.jpg"
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setCameraActive(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleCameraClick = () => {
    if (!cameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setCameraActive(true);
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const handleRecommendClick = () => {
    const randomImages = shuffle(dummyRecommendedImages);
    setRecommendedImages(randomImages);
    setShowRecommendation(!showRecommendation);
  };

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <div className="flex justify-center mt-9 items-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-5 hover:text-pink-600">Cool Fashion Page</h1>

        {/* Upload Image and Try on Camera */}
        <div className="flex justify-center mb-5 space-x-2">
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="block mx-auto mb-5" />
            {uploadedImage && (
              <div className="relative text-center">
                <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-96 object-contain border border-gray-300 rounded" />
                <button 
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700" 
                  onClick={handleRemoveImage}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-pink-800 text-white rounded hover:bg-purple-900 mb-5" 
              onClick={handleCameraClick}
            >
              {cameraActive ? 'Stop Camera' : 'Try on Camera'}
            </button>
            {cameraActive && (
              <div className="mt-5 text-center">
                <video ref={videoRef} autoPlay className="inline-block"></video>
              </div>
            )}
          </div>
        </div>

        {/* Recommend Button */}
        <div 
          className="relative mb-5 p-10 bg-cover bg-center bg-no-repeat rounded flex justify-center mr-4" 
          style={{ backgroundImage: "url('https://www.example.com/your-background-image.jpg')" }}
        >
          <button 
            className="ml-9 px-8 py-2 bg-pink-800 text-white rounded hover:bg-purple-900" 
            onClick={handleRecommendClick}
          >
            {showRecommendation ? 'Hide Recommendation' : 'Show Recommendation' }
          </button>
        </div>
        
        {showRecommendation && (
          <div className="flex justify-center mt-5">
            <div className="p-5 bg-yellow-200 border border-gray-300 rounded w-full max-w-lg relative">
              <h2 className="text-xl font-semibold mb-3 text-center">Recommended Images</h2>
              <div className="grid grid-cols-2 gap-3">
                {recommendedImages.map((image, index) => (
                  <div className="overflow-hidden rounded" key={index}>
                    <img src={image} alt={`Recommended ${index + 1}`} 
                    className="w-full h-auto transition-transform transform hover:scale-110" />
                  </div>
                ))}
              </div>
              <button 
                className="absolute bottom-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" 
                onClick={handleRecommendClick}
              >
                Hide
              </button>
            </div>
          </div>
        )}

        {/* Fashion Images Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="overflow-hidden rounded">
            <img src="http://assets.myntassets.com/h_1440,q_95,w_1080/v1/images/style/properties/RIDRESS-Women-Black-Palazzo-Pants_f7cc29016dd8a3bf5994948cd3188b0d_images.jpg" alt="Fashion 1" className="w-full h-auto transition-transform transform hover:scale-110" />
          </div>
          <div className="overflow-hidden rounded">
            <img src="https://suggestedproducts.in/wp-content/uploads/2020/01/burgandy-768x1024.jpg" alt="Fashion 2" className="w-full h-auto transition-transform transform hover:scale-110" />
          </div>
          <div className="overflow-hidden rounded">
            <img src="https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/1983820/2017/7/21/11500632119737-Hidesign-Women-Handbags-6301500632119468-1.jpg" alt="Fashion 3" className="w-full h-auto transition-transform transform hover:scale-110" />
          </div>
          <div className="overflow-hidden rounded">
            <img src="https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/productimage/2018/11/24/62dde7f4-e388-4a7d-8939-16de9343d7af1543053205470-1.jpg" alt="Fashion 4" className="w-full h-auto transition-transform transform hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionApp;
