import React, { useState } from "react";
import "./Calculator.scss";
import { TiDivide } from "react-icons/ti";

const Calculator = () => {
  const [displayData, setDisplayData] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplayData("");
    } else if (value === "+/-") {
      setDisplayData((prevDisplayData) =>
        prevDisplayData.startsWith("-")
          ? prevDisplayData.slice(1)
          : "-" + prevDisplayData
      );
    }
    else if(value === "C"){
        setDisplayData((prevData) => prevData.slice(0,-1) )
    }
    else {
      setDisplayData(displayData + value);
    }
  };

  const handleCalculate = () => {
    try {
      let display = displayData;
      if (displayData.includes("%")) {
        const parts = displayData.split("%");
        const firstNumber = parseFloat(parts[0]);
        const secondNumber = parts[1] ? parseFloat(parts[1]) : 1; 
        display = ((firstNumber / 100) * secondNumber).toString();
      } else if (displayData.trim() === "") {
        display = "";
      } else {
        display = evaluateExpression(displayData).toString();
      }
      setDisplayData(display);
    } catch (error) {
      setDisplayData("Error");
    }
  };

  const evaluateExpression = (expression) => {
    try {
      return new Function('return ' + expression)();
    } catch (error) {
      throw new Error('Invalid expression');
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">{displayData}</div>
        <div className="row">
          <div className="col" onClick={() => handleClick("AC")}>
            AC
          </div>
          <div className="col" onClick={() => handleClick("+/-")}>
            +/-
          </div>
          <div className="col" onClick={() => handleClick("C")}>
            C
          </div>
          <div className="col col-math" onClick={() => handleClick("/")}>
            <TiDivide />
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => handleClick("7")}>
            7
          </div>
          <div className="col" onClick={() => handleClick("8")}>
            8
          </div>
          <div className="col" onClick={() => handleClick("9")}>
            9
          </div>
          <div className="col col-math" onClick={() => handleClick("*")}>
            x
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => handleClick("4")}>
            4
          </div>
          <div className="col" onClick={() => handleClick("5")}>
            5
          </div>
          <div className="col" onClick={() => handleClick("6")}>
            6
          </div>
          <div
            className="col col-math col-spl"
            onClick={() => handleClick("-")}
          >
            -
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => handleClick("1")}>
            1
          </div>
          <div className="col" onClick={() => handleClick("2")}>
            2
          </div>
          <div className="col" onClick={() => handleClick("3")}>
            3
          </div>
          <div
            className="col col-math col-spl"
            onClick={() => handleClick("+")}
          >
            +
          </div>
        </div>
        <div className="row">
          <div className="col-zero" onClick={() => handleClick("0")}>
            0
          </div>
          <div className="col-dot" onClick={() => handleClick(".")}>
            .
          </div>
          <div className="col-perc" onClick={() => handleClick("%")}>
            %
          </div>
          <div className="col-eq col-math col-spl" onClick={handleCalculate}>
            =
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
