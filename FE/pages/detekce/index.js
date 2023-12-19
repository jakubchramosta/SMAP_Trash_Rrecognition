import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Detekce() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const runModel = async (imageElement) => {
    const classNames = ["Lepenka", "Sklo", "Kov", "Papir", "Plast", "Odpad"];

    const model = await tf.loadLayersModel("/data/model.json");

    // Convert image to tensor and add batch dimension
    let tfTensor = tf.browser.fromPixels(imageElement);
    tfTensor = tf.image.resizeBilinear(tfTensor, [180, 180]); // Resize the image
    tfTensor = tfTensor.div(255.0);
    tfTensor = tfTensor.expandDims(0);
    tfTensor = tfTensor.cast("float32");

    // Run image through model
    const pred = await model.predict(tfTensor);

    // Get the values of the prediction
    const predValues = await pred.array();
    console.log(pred.dataSync());

    // Get the index of the maximum value
    const predictedClassIndex = tf.argMax(predValues, 1).dataSync()[0];
    const predictedClassName = classNames[predictedClassIndex];

    setResult(predictedClassName);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDetection = () => {
    // Create an HTMLImageElement from the data URL
    const img = new Image();
    img.src = image;
    img.onload = () => {
      // Once the image has loaded, pass it to the runModel function
      runModel(img).then((pred) => {
        // Handle the prediction result here
        console.log(pred);
        // setResult(detectedResult);
      });
    };
  };

  return (
    <div className="flex flex-col items-center">
      {image && <img width={500} height={500} src={image} alt="Uploaded" />}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button className="" onClick={() => handleImageDetection()}>
        Detect
      </button>
      <h3>{result}</h3>
    </div>
  );
}
