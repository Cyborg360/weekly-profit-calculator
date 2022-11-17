"use client";

import { useState, useEffect } from "react";

export default function ResultBox({ props }) {
  let input = moneyFormat(props.input);
  return (
    <>
      <div className={`mt-4 w-full h-full ${props.profitVisibility}`}>
        <div className="flex flex-col">
          <div className="text-2xl font-bold mb-4">Con {input}, puedes:</div>
          <div>
            <div className="text-lg mb-1">
              Llegar a{" "}
              <span className="text-purple-600 font-bold">$1,000,000</span> el:
            </div>
            <div className="font-bold first-letter:uppercase mb-6">
              {props.oneMillionTime}
            </div>
          </div>
          <div>
            <div className="mb-1">
              Recuperar tu inversión en el curso par el:
            </div>
            <div className="font-bold first-letter:uppercase mb-6">
              {props.courseReturnTime}
            </div>
          </div>
          <div className="mb-4">En 1 año, alcanzar la cifra de:</div>
          <div className="flex flex-col items-center">
            <div className="relative text-4xl font-extrabold">
              {props.oneYearProfit}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function moneyFormat(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
