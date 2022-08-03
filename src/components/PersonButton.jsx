import React from "react";

export default function PersonButton({
  pbName,
  pbMoney,
  addHandler,
  changeName,
  changeMoney,
  sortHandler,
  checked,
  result,
}) {
  return (
    <div className="pb_wrapper">
      <button className="pb_plus" type="button" onClick={addHandler}>
        -
      </button>
      <input
        className="pb_name"
        type="text"
        placeholder="Iм`я"
        value={pbName}
        onChange={(e) => changeName(e.target.value)}
      />
      <input
        className="pb_coast"
        type="number"
        placeholder="0"
        value={pbMoney}
        onChange={(e) => changeMoney(e.target.value)}
      />
      <div className="pb_text">грн</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => sortHandler(e.target.checked)}
        disabled={!result}
      />
    </div>
  );
}
