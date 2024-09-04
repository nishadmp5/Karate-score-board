import React, { useEffect, useRef, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";

function HomePage() {
  const [scores, setScores] = useState(["", "", "", "", ""]);
  const [total, setTotal] = useState();
  const [name, setName] = useState("");
  const [kata, setKata] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, scores.length);
  }, [scores]);

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;

    // Handle value of "10"
    if (value === "10") {
      newScores[index] = "10";
    } else if (value.length === 2) {
      newScores[index] = `${value[0]}.${value[1]}`;
    }

    // Automatically move focus to the next input if 2 digits are entered
    if (index < inputRefs.current.length - 1 && value.length === 2) {
      inputRefs.current[index + 1].focus();
    }

    // Restrict last input field to 2 digits without jumping
    if (index === inputRefs.current.length - 1 && value.length > 2) {
      newScores[index] = value.slice(0, 2);
    }

    setScores(newScores);
  };

  useEffect(() => {
    const parsedScores = scores.map((score) => parseFloat(score) || 0);

    const sortedScores = [...parsedScores].sort((a, b) => b - a);
    const trimmedScores = sortedScores.slice(1, sortedScores.length - 1);

    const cuttedTotalScore = trimmedScores.reduce(
      (total, num) => total + num,
      0
    );
    const roundedTotal = cuttedTotalScore.toFixed(2); // Display with two decimal places
    setTotal(roundedTotal);
  }, [scores]);

  const handleReset = () => {
    setScores(["", "", "", "", ""]);
  };

  return (
    <div className="w-full h-screen bg-blue-500">
      <div className="w-full h-20 bg-red-500 flex items-center justify-center">
        <h1 className="text-white  uppercase text-2xl font-bold">
          kata score board
        </h1>
      </div>
      <div className="w-full h-10 bg-white flex items-center justify-center">
        <marquee className="uppercase font-semibold text-gray-700">
          champions atks palakkad
        </marquee>
      </div>
      <div className="w-full h-auto  pt-10 pb-10">
        <div className="w-full h-full flex flex-col items-center gap-5">
          <div className=" flex flex-col justify-between gap-4">
            <input
              type="text"
              placeholder="Name"
              className=" w-60 px-2 text-sm h-8 rounded-md"
            />
            <input
              type="text"
              placeholder="kata"
              className="w-60 px-2 text-sm h-8 rounded-md"
            />
          </div>
          <h1 className="uppercase text-white font-semibold">score</h1>
          <div className="w-full flex justify-center gap-1">
            {scores.map((score, index) => (
              <input
                key={index}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                type="number"
                placeholder={`JUD ${index + 1}`}
                value={score}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-16 h-10 bg-white rounded-md text-sm px-3 md:w-24 md:h-14 md:text-lg"
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-5 items-center">
            <h1 className="text-white uppercase text-xl font-semibold">
              total score:
            </h1>
            <div className="w-40 h-24 rounded-md bg-white flex items-center justify-center md:w-80 md:h-40">
              {scores[4] ? (
                <h1 className="text-5xl font-bold md:text-7xl">{total}</h1>
              ) : (
                ""
              )}
            </div>
            <div
              onClick={handleReset}
              className="w-20 h-10 flex items-center justify-center bg-red-500 rounded-md text-white text-sm shadow-md"
            >
              <h1 className="uppercase font-semibold">reset</h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-auto flex items-end justify-center">
        <div className="w-full bg-blue-700 h-10  text-xs flex items-center justify-center">
          <h1 className="uppercase text-white font-semibold tracking-widest">
            developed by Nishad
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
