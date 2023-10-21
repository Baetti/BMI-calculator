import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [status, setStatus] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [inputError, setInputError] = useState(false);

  const calculateBmi = () => {
    if (!isNumber(weight) || !isNumber(height)) {
      setInputError(true);
      return;
    }

    const bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiResult(bmi);

    const bmiStatus = getStatus(bmi);
    setStatus(bmiStatus);
  };

  const getStatus = (bmi) => {
    if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight";
    } else if (bmi <= 18.4 && bmi >= 1) {
      return "Underweight";
    } else {
      return "Obese";
    }
  };

  const isNumber = (value) => {
    return /^[0-9.]+$/.test(value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    setInputError(false);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setInputError(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-sm shadow bg-black rounded">
          <h2 className="text-white text-center mt-4 text-3xl">
            BMI CALCULATOR
          </h2>
          <form className="rounded px-8 pt-6 pb-8 mb-4 mt-3">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="weight"
              >
                Weight
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  inputError ? "border-red-500" : ""
                }`}
                id="weight"
                type="text"
                placeholder="Weight(Kg)"
                value={weight}
                onChange={handleWeightChange}
              />
              {inputError && (
                <div className="text-red-500 text-xs mt-1">
                  Please type a valid input
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="height"
              >
                Height
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  inputError ? "border-red-500" : ""
                }`}
                id="height"
                type="text"
                placeholder="Height(cm)"
                value={height}
                onChange={handleHeightChange}
              />
              {inputError && (
                <div className="text-red-500 text-xs mt-1">
                  Please type a valid input
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !weight || !height || inputError
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                type="button"
                onClick={calculateBmi}
                disabled={!weight || !height || inputError}
              >
                Calculate BMI
              </button>
            </div>
          </form>
          {bmiResult && (
            <div className="mt-3 mb-4 text-white text-center ">
              <h3 className="text-xl">YOUR BMI : {bmiResult} </h3>
              <h3 className="text-xl">You are currently : {status}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
