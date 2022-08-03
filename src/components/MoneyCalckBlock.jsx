import React from "react";

export default function MoneyCalcBlock({ item }) {
  return (
    <div className="r_wrapper">
      <div className="r_investor">Кому виннi: {item.investorName}</div>
      <div className="r_debtor">Хто винний: {item.debtorsName}</div>
      <div className="r_debtor">Скiльки винний: {Math.ceil(item.take)}грн</div>
    </div>
  );
}
