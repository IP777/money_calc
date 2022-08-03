import React, { useState } from "react";
import "./style/App.css";
import PersonButton from "./components/PersonButton";
import randomID from "./utils/randomID";
import MoneyCalcBlock from "./components/MoneyCalckBlock";

const initPersonArr = [
  {
    id: "1",
    name: "Чувак 1",
    money: "",
    checked: false,
  },
  {
    id: "2",
    name: "Чувак 2",
    money: "",
    checked: false,
  },
  {
    id: "3",
    name: "Чувак 3",
    money: "",
    checked: false,
  },
];

function App() {
  const localData = JSON.parse(localStorage.getItem("personArr"));
  const setLocalData = (arr) =>
    localStorage.setItem("personArr", JSON.stringify(arr));

  const [personArr, setPersonArr] = useState(
    localData ? localData : initPersonArr
  );
  const [result, setResult] = useState(null);

  const AddPersonHandler = () => {
    setPersonArr([
      ...personArr,
      {
        id: randomID(),
        name: "",
        money: "",
        checked: false,
      },
    ]);
  };

  const removePersonHandler = (id) => {
    if (personArr.length - 1 >= 3)
      setPersonArr(personArr.filter((item) => item.id !== id));
  };

  const calculateHandler = () => {
    const totalCoast = personArr
      .map((item) => (item.money === "" ? 0 : Number(item.money)))
      .reduce((prevValue, currValue) => prevValue + currValue, 0);

    const deltaCoast = totalCoast / personArr.length;

    const calcSum = personArr.map((item) => item.money - deltaCoast);

    const pInventors = personArr
      .filter((item, i) => calcSum[i] > 0)
      .sort((a, b) => b.money - a.money);

    const pDebtors = personArr
      .filter((item, i) => calcSum[i] < 0)
      .sort((a, b) => Number(a.money) - Number(b.money));

    const investors = calcSum.filter((item) => item > 0).sort((a, b) => b - a);
    const debtors = calcSum.filter((item) => item < 0).sort((a, b) => a - b);

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
              checked: pDebtors[i2].checked || pInventors[i].checked,
            });
            debtorsSort[i2] = 0;
          } else {
            debtorsSort[i2] = inv;
            sArr.push({
              id: Math.random(),
              investorName: pInventors[i].name,
              debtorsName: pDebtors[i2].name,
              take: invR,
              checked: pDebtors[i2].checked || pInventors[i].checked,
            });
            break;
          }
        }
      }
    }
    setResult(sArr);

    setLocalData(personArr);
  };

  const removeDataHandler = () => {
    setPersonArr(initPersonArr);
    setResult(null);
    setLocalData(null);
  };

  const allUnchecked =
    result && result.filter((item) => item.checked).length === 0;

  return (
    <div className="App">
      <div className="header">Розрахунковий калькулятор</div>
      <div className="main">
        <div className="main_head_block">
          <button className="del_btn" type="button" onClick={removeDataHandler}>
            Видалити
          </button>
          <div className="person_block">
            {personArr.map((item) => (
              <PersonButton
                key={item.id}
                pbName={item.name}
                pbMoney={item.money}
                checked={item.checked}
                result={result}
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
                      item2.id === item.id ? { ...item2, money: number } : item2
                    )
                  )
                }
                sortHandler={(checked) => {
                  setPersonArr(
                    personArr.map((item2) => {
                      return item2.id === item.id
                        ? { ...item2, checked }
                        : { ...item2, checked: false };
                    })
                  );
                }}
              />
            ))}
          </div>
          <button type="button" onClick={AddPersonHandler}>
            +
          </button>
        </div>
        <div className="cal_bloc">
          <button type="button" onClick={calculateHandler}>
            {result ? "Оновити" : "Прорахувати"}
          </button>

          <div className="total_coast_block">
            {result &&
              result.map(
                (item) =>
                  (item.checked || allUnchecked) && (
                    <MoneyCalcBlock key={item.id} item={item} />
                  )
              )}
          </div>
          {result && (
            <div
              style={{ marginTop: 5, fontStyle: "italic", fontSize: 16 }}
            >{`Загальна сума: ${personArr.reduce(
              (prevValue, currValue) => prevValue + Number(currValue.money),
              0
            )} грн`}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
