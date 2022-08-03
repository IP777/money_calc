import React from "react";

export default function MoneyCalcBlock({ item }) {
  return (
    <div className="r_wrapper">
      <div className="r_investor">
        Кому виннi: <span style={{ fontWeight: 500 }}>{item.investorName}</span>
      </div>
      <div className="r_debtor">
        Хто винен:{" "}
        <span style={{ fontWeight: 500, color: "darkblue" }}>
          {item.debtorsName}
        </span>
      </div>
      <div className="r_debtor_money">Скiльки: {Math.ceil(item.take)}грн</div>
    </div>
  );
}
