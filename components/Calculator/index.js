"use client";
import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [percentage, setPercentage] = useState(1.05);
  const [oneMillionTime, setOneMillionTime] = useState("");
  const [courseReturnTime, setCourseReturnTime] = useState("");
  const [oneYearProfit, setOneYearProfit] = useState("");
  const [smallPercentageColor, setSmallPercentageColor] = useState("text-[#FFCC00]");
  const [mediumPercentageColor, setMediumPercentageColor] = useState("bg-[#FFCC00] text-[#543ffc]");
  const [largePercentageColor, setLargePercentageColor] = useState("text-[#FFCC00]");

  useEffect(() => {
    if (input !== "") {
      calculateProfit();
    }
  }, [input, percentage]);

  async function handleValueChange(e) {
    try {
      const parsedValue = e.target.value.replace(/[^\d.]/gi, "");
      setInput(parsedValue);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnBlur = () => {
    try {
      setInput(Number(input).toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  async function handleOnclick(e) {
    e.preventDefault();
    if (e.target.name === "small-percentage") {
      setPercentage(1.025);
      setSmallPercentageColor("bg-[#FFCC00] text-[#543ffc]");
      setMediumPercentageColor("text-[#FFCC00]");
      setLargePercentageColor("text-[#FFCC00]");
    } else if (e.target.name === "medium-percentage") {
      setPercentage(1.05);
      setSmallPercentageColor("text-[#FFCC00]");
      setMediumPercentageColor("bg-[#FFCC00] text-[#543ffc]");
      setLargePercentageColor("text-[#FFCC00]");
    } else if (e.target.name === "large-percentage") {
      setPercentage(1.075);
      setSmallPercentageColor("text-[#FFCC00]");
      setMediumPercentageColor("text-[#FFCC00]");
      setLargePercentageColor("bg-[#FFCC00] text-[#543ffc]");
    }
  }

  async function calculateProfit() {
    try {
      let weeks = [];
      let investment = parseFloat(input);
      let startAmount = parseFloat(input);
      let oneMillion;

      while (investment < 1000000) {
        investment = investment * percentage;
        weeks.push(investment);
      }
      let calcCourseReturn = weeks.findIndex((n) => n - startAmount >= 999);
      let courseReturn = await timeConverter(calcCourseReturn + 1);
      oneMillion = await timeConverter(weeks.length + 1);
      setOneMillionTime(oneMillion);
      setCourseReturnTime(courseReturn);
      setOneYearProfit(await moneyFormat(weeks[51]));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="h-full lg:w-full w-full grid flex-col z-20 -mb-[150px] lg:-mt-[555px] md:-mt-[655px] -mt-[730px] absolute justify-items-center ">
        <div className="lg:flex grid lg:flex-row flex-col md:gap-[30px] lg:w-[948px] w-full justify-items-center">
          <div className="flex flex-col w-[98%] items-center">
            <div className="text-white font-black text-[36px] lg:pr-43 leading-[43.57px] lg:text-left text-center mb-4">
              Escoge tu presupuesto de Inversión:
            </div>
            <CurrencyInput
              allowDecimals
              decimalSeparator="."
              id="input-currency-field"
              name="input-currency-field-name"
              prefix="$"
              className="shrink text-[55px] text-white focus:ring-0 border-transparent focus:border-transparent font-black placeholder-[#FFFFFF74] placeholder:text-[80px] bg-transparent  w-[100%] mb-[6px] h-[97px] text-center align-middle placeholder:bottom-0"
              value={input}
              onChange={handleValueChange}
              onBlur={handleOnBlur}
              placeholder="$5,000"
              step={1}
              disableAbbreviations
            />
            <div className="border-[1px] border-white lg:w-[390px] w-[96%]"></div>
            <div className="text-white font-black text-[28px] md:pr-43 leading-[33.89px] lg:text-left text-center lg:mt-[29px] mt-[54px] mb-4">
              Escoge el retorno que quieres generar:
            </div>
            <div className="flex flex-row lg:gap-[30px] sm:gap-[24px] xs:gap-[8px]">
              <button
                name="small-percentage"
                onClick={handleOnclick}
                className={`w-[103px] box-border border-[1px] border-[#FFCC00] rounded-[60px] leading-[60px] text-[18px] font-black ${smallPercentageColor} text-center`}
              >
                2.5%
              </button>
              <button
                name="medium-percentage"
                onClick={handleOnclick}
                className={`w-[103px] box-border border-[1px] border-[#FFCC00] rounded-[60px] leading-[60px] text-[18px] font-black ${mediumPercentageColor} text-center`}
              >
                5.0%
              </button>
              <button
                name="large-percentage"
                onClick={handleOnclick}
                className={`w-[103px] box-border border-[1px] border-[#FFCC00] rounded-[60px] leading-[60px] text-[18px] font-black ${largePercentageColor} text-center`}
              >
                7.5%
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:w-full w-[94%] lg:mt-0 mt-[49px] md:justify-center md:items-center justify-items-center">
            <div className="flex flex-col h-[625px] md:w-[558px] w-full bg-gradient-to-t from-[#7c75ffc9] box-border rounded-[40px] backdrop-blur-[100px] border-[2px] border-[#FFFFFF4F] text-white justify-center items-center">
              <div className="flex flex-col lg:w-[471px] w-full mt-[35px] justify-center items-center">
                <div className="text-[24px] text-center  font-bold lg:w-[380px] w-full leading-[29px] lg:px-0 px-4">
                  Con tu Inversión inicial, el retorno que escogiste y nuestro curso podrás:
                </div>
                <div className="flex flex-row w-full  pt-[30px] lg:mb-[40px] mb-[34px] justify-center">
                  <img src="/gold-bars.svg" className="" />
                  <div className="ml-[25px] flex flex-col sm:w-[249px] xs:w-[200px] text-left">
                    <div className="text-[18px] text-white font-black leading-[22px]">Generar</div>
                    <div className="text-[30px] text-white font-black leading-[36px] mt-[3px]">$1,000,000</div>
                    <div className="text-[17px] text-[#d4cffe] font-black leading-[22px] mt-[5px]">
                      {oneMillionTime}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full lg:pl-0  pl-[17px]  lg:mb-[38px] mb-[32px] justify-center">
                  <img src="/return-time.svg" />
                  <div className="ml-[25px] flex flex-col w-[249px] text-left">
                    <div className="text-[18px] text-white font-black leading-[22px] w-[209px]">
                      Recuperar tu inversión en el curso para
                    </div>
                    <div className="text-[17px] text-[#d4cffe] font-black leading-[22px] mt-[5px]">
                      {courseReturnTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center">
                <div className="border-[1px] border-white lg:w-[471px] w-[339px]"></div>
              </div>
              <div className="flex flex-row w-full lg:pl-[83px] pl-[27px] md:pr-[100px] mt-[48px] justify-center">
                <img src="/money-plant.svg" className="h-[105px]" />
                <div className="ml-[37px] flex flex-col w-[230px] text-left lg:mt-[5px] mt-[2px]">
                  <div className="text-[16px] text-white font-black leading-[22px] lg:w-full w-[218px]">
                    En un año podrías generar:
                  </div>
                  <div className="md:text-[45px] text-[32px] text-white font-black md:leading-[72.61px] leading-[34px] lg:w-[288px] w-[135px] lg:mt-0 mt-2">
                    {oneYearProfit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function moneyFormat(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

async function timeConverter(count) {
  let date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  date.setDate(date.getDate() + count * 7);
  date = date.toLocaleDateString("es-ES", options);
  let nDate = date.split(" ");
  nDate[0] = nDate[0].charAt(0).toUpperCase() + nDate[0].slice(1);
  nDate[3] = nDate[3].charAt(0).toUpperCase() + nDate[3].slice(1);
  nDate = nDate.slice(1);
  nDate = nDate.join(" ");
  return `el ${nDate}`;
}
