import { FaRegCopy, FaCheck } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import React, { useState, useEffect, useRef } from "react";
import { arrMaker, generateRandom, copyTextToClipboard } from "./utils";

// Default password length on page load
const defaultLength = 14;

// Generate arrays of characters
const UPPER = arrMaker(26, 65);
const LOWER = arrMaker(26, 97);
const NUMBERS = arrMaker(10, 48);
const SYMBOLS = arrMaker(15, 33)
  .concat(arrMaker(7, 58))
  .concat(arrMaker(6, 91));

// App component
const App = () => {
  const [length, setLength] = useState(defaultLength);
  const [copiedIcon, setCopiedIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("LOW");

  const upperRef = useRef<HTMLInputElement | null>(null);
  const lowerRef = useRef<HTMLInputElement | null>(null);
  const numbersRef = useRef<HTMLInputElement | null>(null);
  const symbolsRef = useRef<HTMLInputElement | null>(null);

  let paramsSelected = 1;
  let charArray: string[] = [];

  useEffect(() => {
    generatePassword();
  }, []);

  const adjustPasswordLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLength(+e.target.value);
  };

  const copyText = () => {
    copyTextToClipboard(password);
    setCopiedIcon(true);
    const timer = setTimeout(() => setCopiedIcon(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  };

  const generatePassword = () => {
    charArray = [];
    paramsSelected = 0;
    const upper = upperRef.current as HTMLInputElement;
    const lower = lowerRef.current as HTMLInputElement;
    const numbers = numbersRef.current as HTMLInputElement;
    const symbols = symbolsRef.current as HTMLInputElement;

    if (upper.checked) {
      UPPER.forEach((char) => charArray.push(char));
      paramsSelected++;
    }
    if (lower.checked) {
      LOWER.forEach((char) => charArray.push(char));
      paramsSelected++;
    }
    if (numbers.checked) {
      NUMBERS.forEach((char) => charArray.push(char));
      paramsSelected++;
    }
    if (symbols.checked) {
      SYMBOLS.forEach((char) => charArray.push(char));
      paramsSelected++;
    }

    if (charArray.length < 1 || paramsSelected === 0) {
      alert("Please select at least one option");
      return;
    }

    if (paramsSelected === 1) {
      setPasswordStrength("LOW");
    } else if (paramsSelected === 2 && length < 14) {
      setPasswordStrength("LOW");
    } else if (paramsSelected === 2 && length >= 14) {
      setPasswordStrength("FAIR");
    } else if (paramsSelected === 3 && length < 14) {
      setPasswordStrength("FAIR");
    } else if (paramsSelected === 3 && length >= 14) {
      setPasswordStrength("GOOD");
    } else if (paramsSelected === 4 && length < 14) {
      setPasswordStrength("GOOD");
    } else if (paramsSelected === 4 && length >= 14) {
      setPasswordStrength("EXELENT");
    }

    let password = "";
    for (let i = 0; i < length; ++i) {
      const randomNum = generateRandom(0, charArray.length);
      password += charArray[randomNum];
    }
    setPassword(password);
  };
  let box1, box2, box3, box4;
  if (passwordStrength === "LOW") {
    box1 = "bg-red";
  } else if (passwordStrength === "FAIR") {
    box1 = "bg-yellow";
    box2 = "bg-yellow border-none";
  }
  if (passwordStrength === "GOOD") {
    box1 = "bg-yellow";
    box2 = "bg-yellow border-none";
    box3 = "bg-yellow border-none";
  }
  if (passwordStrength === "EXELENT") {
    box1 = "bg-green";
    box2 = "bg-green border-none";
    box3 = "bg-green border-none";
    box4 = "bg-green border-none";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primaryDark font-mono">
      <h1 className="mb-6 text-xl text-thirdDark">Password Generator</h1>

      <div className="generatorContainer mt-6 flex w-11/12 flex-col justify-between bg-secondaryDark px-6 py-4 text-secondaryLight sm:w-[30rem]">
        <div className="flex items-center justify-between">
          <h3>Character Length</h3>
          <span className="text-[2rem] text-green">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={20}
          defaultValue={defaultLength}
          className="mb-6 accent-yellow "
          onChange={(e) => adjustPasswordLength(e)}
        />

        <div className="checkboxContainer">
          <input
            ref={upperRef}
            type="checkbox"
            id="uppercase"
            className="mr-4 mb-4 accent-yellow"
          />
          <label htmlFor="uppercase">Uppercase letters</label>
        </div>

        <div className="checkboxContainer">
          <input
            defaultChecked
            ref={lowerRef}
            type="checkbox"
            id="lowercase"
            className="mr-4 mb-4 accent-yellow"
          />
          <label htmlFor="lowercase">Lowercase letters</label>
        </div>

        <div className="checkboxContainer">
          <input
            ref={numbersRef}
            type="checkbox"
            id="numbers"
            className="mr-4 mb-4 accent-yellow"
          />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="checkboxContainer">
          <input
            ref={symbolsRef}
            type="checkbox"
            id="symbols"
            className="mr-4 accent-yellow"
          />
          <label htmlFor="symbols">Symbols</label>
        </div>

        <button
          onClick={generatePassword}
          className="space-6 mt-6 mb-2 flex w-full items-center justify-center border-2 border-green bg-green px-6 py-4 text-primaryDark transition-all duration-200 hover:bg-transparent hover:text-green"
        >
          GENERATE{" "}
          <div className="ml-4">
            <FiArrowRight />
          </div>
        </button>
      </div>

      <div className="passwordContainer mt-6 flex w-11/12 flex-col bg-secondaryDark  px-6 py-4 sm:w-[30rem]">
        <div className="group mt-2 px-6 flex justify-between text-xl text-secondaryLight sm:text-2xl">
          <h2 className="passwordText text-passwordDark transition-colors duration-300 selection:bg-green selection:text-secondaryDark group-hover:text-primaryLight">
            {password}
          </h2>

          <span
            onClick={copyText}
            className="copyIcon flex cursor-pointer items-center text-green transition-colors duration-300 hover:text-primaryLight"
          >
            {copiedIcon ? <FaCheck /> : <FaRegCopy />}
          </span>
        </div>
        <div className="mt-6 flex w-full items-center justify-between bg-primaryDark2 px-6 py-4 text-secondaryLight">
          <p className="passwordText text-thirdDark">STRENGTH</p>

          <span className="copyIcon flex items-center text-xl">
            {passwordStrength}
            <div className={`ml-3 h-3 w-3 rounded ${box1}`}></div>
            <div
              className={`ml-1 h-3 w-3 rounded border-2 border-secondaryLight ${box2}`}
            ></div>
            <div
              className={`ml-1 h-3 w-3 rounded border-2 border-secondaryLight ${box3}`}
            ></div>
            <div
              className={`ml-1 h-3 w-3 rounded border-2 border-secondaryLight ${box4}`}
            ></div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
