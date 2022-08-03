import React, { useState } from "react";
import "./App.css";
import PersonButton from "./components/PersonButton";
import randomID from "./utils/randomID";
import MoneyCalcBlock from "./components/MoneyCalckBlock";

const initPersonArr = [
  {
    id: "1",
    name: "Чувак 1",
    money: 50,
  },
  {
    id: "2",
    name: "Чувак 2",
    money: 100,
  },
  {
    id: "3",
    name: "Чувак 3",
    money: 0,
  },
];

function App() {
  const [personArr, setPersonArr] = useState(initPersonArr);
  const [result, setResult] = useState(null);

  const AddPersonHandler = () => {
    setPersonArr([
      ...personArr,
      {
        id: randomID(),
        name: "",
        money: "",
      },
    ]);
  };

  const removePersonHandler = (id) => {
    if (personArr.length - 1 >= 3)
      setPersonArr(personArr.filter((item) => item.id !== id));
  };

  const calculateHandler = () => {
    const totalCoast = personArr
      .map((item) => (typeof item.money !== "number" ? 0 : item.money))
      .reduce((prevValue, currValue) => prevValue + currValue, 0);

    const deltaCoast = totalCoast / personArr.length;

    const calcSum = personArr.map((item) => item.money - deltaCoast);

    const pInventors = personArr
      .filter((item, i) => calcSum[i] > 0)
      .sort((a, b) => b.money - a.money);

    const pDebtors = personArr
      .filter((item, i) => calcSum[i] < 0)
      .sort((a, b) => a.money + b.money);

    const investors = calcSum.filter((item) => item > 0).sort((a, b) => b - a);
    const debtors = calcSum.filter((item) => item < 0).sort((a, b) => a + b);

    const debtorsSort = [...debtors];
    const sArr = [];

    for (let i = 0; i < investors.length; i++) {
      let inv = investors[i];

      for (let i2 = 0; i2 < debtorsSort.length; i2++) {
        if (debtorsSort[i2] !== 0) {
          const invR = inv;
          inv = inv + debtorsSort[i2];
          if (inv > 0) {
            sArr.push({
              id: Math.random(),
              investorName: pInventors[i].name,
              debtorsName: pDebtors[i2].name,
              take: -debtorsSort[i2],
            });
            debtorsSort[i2] = 0;
          } else {
            debtorsSort[i2] = inv;
            sArr.push({
              id: Math.random(),
              investorName: pInventors[i].name,
              debtorsName: pDebtors[i2].name,
              take: invR,
            });
            break;
          }
        }
      }
    }
    setResult(sArr);
  };

  return (
    <div className="App">
      <div className="header">Money calculator</div>
      <div className="main">
        <div className="person_block">
          {personArr.map((item) => (
            <PersonButton
              key={item.id}
              pbName={item.name}
              pbMoney={item.money}
              addHandler={() => removePersonHandler(item.id)}
              changeName={(text) =>
                setPersonArr(
                  personArr.map((item2) =>
                    item2.id === item.id ? { ...item2, name: text } : item2
                  )
                )
              }
              changeMoney={(number) =>
                setPersonArr(
                  personArr.map((item2) =>
                    item2.id === item.id
                      ? { ...item2, money: Number(number) }
                      : item2
                  )
                )
              }
            />
          ))}
        </div>
        <button type="button" onClick={AddPersonHandler}>
          +
        </button>
        <hr />
        <div className="cal_bloc">
          <button type="button" onClick={calculateHandler}>
            Прорахувати
          </button>
          <div className="total_coast_block">
            {result &&
              result.map((item) => (
                <MoneyCalcBlock key={item.id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
