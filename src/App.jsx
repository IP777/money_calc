import React, { useState, useEffect } from "react";
import "./style/App.css";
import PersonButton from "./components/PersonButton";
import randomID from "./utils/randomID";
import MoneyCalcBlock from "./components/MoneyCalckBlock";

const initPersonArr = [
  {
    id: "4",
    name: "Пацай Роман",
    money: "",
    checked: false,
  },
  {
    id: "1",
    name: "Iванов Петро",
    money: "",
    checked: false,
  },
  {
    id: "2",
    name: "Ступарь Олександр",
    money: "",
    checked: false,
  },
  {
    id: "3",
    name: "Слободянюк Дмитрiй",
    money: "",
    checked: false,
  },
  {
    id: "5",
    name: "Марусяк Роман",
    money: "",
    checked: false,
  },
  {
    id: "6",
    name: "Чабан Антон",
    money: "",
    checked: false,
  },
  {
    id: "7",
    name: "Голосов Денис",
    money: "",
    checked: false,
  },
  {
    id: "8",
    name: "Синютка Микола",
    money: "",
    checked: false,
  },
  {
    id: "9",
    name: "Бубiсь Василь",
    money: "",
    checked: false,
  },
  {
    id: "10",
    name: "Ластовецький Богдан",
    money: "",
    checked: false,
  },
  {
    id: "11",
    name: "Голод Юрiй",
    money: "",
    checked: false,
  },
  {
    id: "12",
    name: "Гуменчук Роман",
    money: "",
    checked: false,
  },
  {
    id: "13",
    name: "Кравченко Олег",
    money: "",
    checked: false,
  },
  {
    id: "14",
    name: "Воронiн Валерiй",
    money: "",
    checked: false,
  },
  {
    id: "15",
    name: "Вігнан Євген",
    money: "",
    checked: false,
  },
  {
    id: "16",
    name: "Сисоєв Володим",
    money: "",
    checked: false,
  },
  {
    id: "17",
    name: "Строколіс Андрій",
    money: "",
    checked: false,
  },
  {
    id: "18",
    name: "Прядка Юрій",
    money: "",
    checked: false,
  },
];

function App() {
  const localData = JSON.parse(localStorage.getItem("personArr"));
  const setLocalData = (arr) =>
    localStorage.setItem("personArr", JSON.stringify(arr));

  // const [personArr, setPersonArr] = useState(
  //   localData ? localData : initPersonArr
  // );
  const [personArr, setPersonArr] = useState(initPersonArr);
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

    // setLocalData(personArr);
  };

  useEffect(() => {
    calculateHandler();
  }, [personArr]);

  const removeDataHandler = () => {
    setPersonArr(initPersonArr);
    setResult(null);
    // setLocalData(null);
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
          <button className="btn" type="button" onClick={AddPersonHandler}>
            +
          </button>
        </div>
        <div className="cal_bloc">
          {/* <button type="button" onClick={calculateHandler}>
            {result ? "Оновити" : "Прорахувати"}
          </button> */}

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
