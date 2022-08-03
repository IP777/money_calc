import React from "react";

export default function PersonButton({
  pbName,
  pbMoney,
  addHandler,
  changeName,
  changeMoney,
}) {
  return (
    <div className="pb_wrapper">
      <button className="pb_plus" type="button" onClick={addHandler}>
        -
      </button>
      <input
        className="pb_name"
        type="text"
        placeholder="Name"
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
      <div className="text">грн</div>
    </div>
  );
}
