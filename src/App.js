import React, { useEffect, useState } from "react";
import "./App.css";

import { FiSearch } from "react-icons/fi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const App = () => {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000); //สุ่มเลข 3 หลัก
  };

  const generateRandomTwoDigits = () => {
    return Math.floor(Math.random() * 100); //สุ่มเลข 2 หลัก
  };

  const generateLotteryNumbers = () => {
    const lotteryNumbers = [];

    // รางวัลที่ 1
    let firstPrize = generateRandomNumber();
    lotteryNumbers.push(
      firstPrize >= 100
        ? `${firstPrize}`
        : firstPrize >= 10
        ? `0${firstPrize}`
        : `00${firstPrize}`
    );

    // รางวัลเลขข้างเคียง รางวัลที่ 1
    let nearFirstPrize = parseInt(lotteryNumbers[0]);
    lotteryNumbers.push(
      nearFirstPrize >= 100
        ? `${nearFirstPrize + 1}`
        : nearFirstPrize >= 10
        ? `0${nearFirstPrize + 1}`
        : `00${nearFirstPrize + 1}`
    );
    lotteryNumbers.push(
      nearFirstPrize >= 100
        ? `${nearFirstPrize - 1}`
        : nearFirstPrize >= 10
        ? `0${nearFirstPrize - 1}`
        : `00${nearFirstPrize - 1}`
    );

    // รางวัลที่ 2
    for (let i = 0; i < 3; i++) {
      let secondPrize = generateRandomNumber();
      lotteryNumbers.push(
        secondPrize >= 100
          ? `${secondPrize}`
          : secondPrize >= 10
          ? `0${secondPrize}`
          : `00${secondPrize}`
      );
    }

    // รางวัลเลขท้าย 2 ตัว
    let twoDigits = generateRandomTwoDigits();
    lotteryNumbers.push(twoDigits < 10 ? `0${twoDigits}` : `${twoDigits}`);

    return lotteryNumbers;
  };

  const [lotteryNumbers, setLotteryNumbers] = useState([]);

  useEffect(() => {
    // อ่านข้อมูลจาก localStorage
    const storedLotteryNumbers = localStorage.getItem("lotteryNumbers");
    if (storedLotteryNumbers) {
      setLotteryNumbers(JSON.parse(storedLotteryNumbers));
    }
  }, []);

  const handleGenerateLottery = () => {
    // const newLotteryNumbers = ["021", "520", "519", "305", "620", "246", "20"];
    const newLotteryNumbers = generateLotteryNumbers();
    setLotteryNumbers(newLotteryNumbers);

    // บันทึกข้อมูลลงใน localStorage
    localStorage.setItem("lotteryNumbers", JSON.stringify(newLotteryNumbers));
  };

  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setMessage("");
  };

  const handleCheckValue = () => {
    const index = lotteryNumbers.findIndex((item) => item === inputValue);
    const msgFirstPrize = "ถูกรางวัลที่ 1";
    const msgNearFirstPrize = "ถูกรางวัลเลขข้างเคียงรางวัลที่ 1";
    const msgSecondPrize = "ถูกรางวัลที่ 2";
    if (index !== -1) {
      if (inputValue.endsWith(lotteryNumbers[6])) {
        setMessage(
          index >= 3
            ? `หมายเลข ${inputValue} ${msgSecondPrize} และถูกรางวัลเลขท้าย 2 ตัว`
            : index >= 1
            ? `หมายเลข ${inputValue} ${msgNearFirstPrize} และถูกรางวัลเลขท้าย 2 ตัว`
            : `หมายเลข ${inputValue} ${msgFirstPrize} และถูกรางวัลเลขท้าย 2 ตัว`
        );
      } else {
        setMessage(
          index >= 3
            ? `หมายเลข ${inputValue} ${msgSecondPrize}`
            : index >= 1
            ? `หมายเลข ${inputValue} ${msgNearFirstPrize}`
            : `หมายเลข ${inputValue} ${msgFirstPrize}`
        );
      }
      setMsgColor("spanGreen");
    } else {
      if (inputValue.endsWith(lotteryNumbers[6])) {
        setMessage("ถูกเลขท้าย 2 ตัว");
        setMsgColor("spanGreen");
      } else {
        setMessage("ไม่ถูกรางวัลใดเลย");
        setMsgColor("spanRed");
      }
    }

  };

  return (
    <div className="model">
      <div className="box">
        <div className="box-content">
          <h3>ไดเวอร์ซิชั่น</h3>
          <button
            onClick={handleGenerateLottery}
            class="button-30"
            role="button"
          >
            <GiPerspectiveDiceSixFacesRandom size={30} />
            Random Lottery
          </button>
          <div className="grid-box">
            <div className="grid-item">
              <p>รางวัลที่ 1</p>
              <h1>{lotteryNumbers[0]}</h1>
            </div>
          </div>
          <hr />
          <div className="grid-box">
            <div className="grid-item">
              <div className="flex-box">
                <div className="flex-item">
                  <p>รางวัลเลขข้างเคียงรางวัลที่ 1</p>
                </div>
                <div className="flex-item">
                  <p>รางวัลที่ 2</p>
                </div>
                <div className="flex-item">
                  <p>รางวัลเลขท้าย 2 ตัว</p>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-item">
                  <h3>{lotteryNumbers[1]}</h3>
                  <h3>{lotteryNumbers[2]}</h3>
                </div>
                <div className="flex-item">
                  <h3>{lotteryNumbers[3]}</h3>
                  <h3>{lotteryNumbers[4]}</h3>
                  <h3>{lotteryNumbers[5]}</h3>
                </div>
                <div className="flex-item">
                  <h1>{lotteryNumbers[6]}</h1>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid-item">
              <h3 className="pt">ตรวจสอบรางวัล</h3>
              <div className="flex-box">
                <div className="flex-item">
                  <div className="flex">
                    <input
                      className="input"
                      pattern="^[0-9]{3}$"
                      required
                      maxlength="3"
                      type="text"
                      placeholder="ใส่หมายเลข"
                      value={inputValue}
                      onChange={handleInputChange}
                      //------
                      // onBlur={() => setFocused(true)}
                      // onFocus={() => setFocused(true)}
                      // focused={focused.toString()}
                      //------
                    />
                    <button onClick={handleCheckValue} className="btn">
                      <FiSearch size={30} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-item">          
                  { message && 
                  <p className={`spanTxt ${msgColor}`}>{message}</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
