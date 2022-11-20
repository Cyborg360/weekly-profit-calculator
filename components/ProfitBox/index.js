"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ResultBox from "../ResultBox";
import CurrencyInput from "react-currency-input-field";

export default function ProfitBox({ props }) {
  const [input, setInput] = useState("");
  const [enableButton, setEnableButton] = useState(false);
  const [percentage, setPercentage] = useState(1.05);
  const [oneMillionTime, setOneMillionTime] = useState();
  const [courseReturnTime, setCourseReturnTime] = useState();
  const [oneYearProfit, setOneYearProfit] = useState("");
  const [profitVisibility, setProfitVisibility] = useState("hidden");
  const [buyButtonVisibility, setBuyButtonVisibility] = useState("invisible");

  async function handleValueChange(e) {
    try {
      const parsedValue = e.target.value.replace(/[^\d.]/gi, "");
      setInput(parsedValue);
      setEnableButton(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSelectedChange(e) {
    try {
      const numPercentage = parseFloat(e.target.value);
      setPercentage(numPercentage);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnBlur = () => {
    try {
      setInput(Number(input).toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  async function calculateProfit(e) {
    e.preventDefault();
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
      setProfitVisibility("visible");
      setBuyButtonVisibility("visible");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid px-2 place-content-center h-screen z-20">
      <div className="block p-4  max-w-sm bg-white rounded-lg shadow-md sm:p-8 items-center z-20">
        <h1 className="mb-4 text-3xl font-medium text-slate-700 dark:text-gray-400">
          Calculadora de crecimiento compuesto
        </h1>
        <form
          className="flex-container items-center justify-between"
          onSubmit={calculateProfit}
        >
          <label className="block mb-2 text-sm font-medium text-slate-500 dark:text-white">
            Escribe tu presupuesto
          </label>
          <CurrencyInput
            allowDecimals
            decimalSeparator="."
            id="input-currency-field"
            name="input-currency-field-name"
            prefix="$"
            className="block w-full mb-2 bg-gray-200 border-3 border-black rounded-lg text-black"
            value={input}
            onChange={handleValueChange}
            onBlur={handleOnBlur}
            placeholder="$5,000"
            step={1}
            disableAbbreviations
          />
          <label className="block mb-2 text-sm font-medium text-slate-500 dark:text-white">
            Escoge tu retorno
          </label>
          <div className="flex flex-row mb-2">
            <div className="w-full">
              <select
                id="percentage"
                className="w-full bg-gray-200 border-3 border-black rounded-lg text-black"
                onChange={handleSelectedChange}
                defaultValue="1.05"
              >
                <option value="1.025">2.5%</option>
                <option value="1.05">5%</option>
                <option value="1.075">7.5%</option>
                <option value="1.1">10%</option>
              </select>
            </div>
            {/* <!-- List --> */}
            <button
              type="submit"
              className="w-2/5 relative text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center"
              disabled={!enableButton}
            >
              Calcular
            </button>
          </div>
        </form>
        <ResultBox
          props={{
            input: input.replace(/[^\d.]/gi, ""),
            oneYearProfit: oneYearProfit,
            oneMillionTime: oneMillionTime,
            courseReturnTime: courseReturnTime,
            profitVisibility: profitVisibility,
          }}
        />
      </div>
      <a
        href="https://infusioninvestments.com"
        rel="noreferrer nonoopener"
        className={` text-lg mt-4  w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg px-5 py-2.5 inline-flex justify-center text-center ${buyButtonVisibility}`}
      >
        Aprende a generar tu 5% for $999
      </a>
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
  nDate = nDate.join(" ");
  return nDate;
}
