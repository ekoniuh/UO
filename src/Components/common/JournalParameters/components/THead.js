export function THead({ isDay, width }) {
  return (
    <table className="table-data" style={{ width }}>
      <tbody>
        <tr>
          <th style={{ width: "6%" }} rowSpan={3}>
            {isDay ? "Дата" : "Время"}
          </th>
          <th style={{ width: "6%" }} rowSpan={3}>
            Температура, °С
          </th>
          <th colSpan={2}> Проводимость, uSm</th>
          <th style={{ width: "6%" }} rowSpan={3}>
            Антискалант, <sup>мл</sup>/
            <sub>
              м<sup>3</sup>
            </sub>
          </th>
          <th colSpan={2}>Предфильтр</th>
          <th colSpan={9}>Мембраны обратного осмоса</th>
        </tr>
        <tr>
          <th style={{ width: "6%" }} rowSpan={2}>
            Вход
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Выход
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Вход, Bar
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Выход, Bar
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Вход, Bar
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Давление ступени &#8470;1, Bar
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Выход, Bar
          </th>
          <th colSpan={2}>Дифференциальное давление</th>
          <th colSpan={3}>Потоки</th>
        </tr>
        <tr>
          <th style={{ width: "6%" }}>Cтупень &#8470;1, Bar</th>
          <th style={{ width: "6%" }}>Общее, Bar</th>
          <th style={{ width: "6%" }}>
            Пермиат,
            <sup>
              м<sup>3</sup>
            </sup>
            /<sub>ч</sub>
          </th>
          <th style={{ width: "6%" }}>
            Дренаж,{" "}
            <sup>
              м<sup>3</sup>
            </sup>
            /<sub>ч</sub>
          </th>
          <th style={{ width: "6%" }}>
            Циркуляция,{" "}
            <sup>
              м<sup>3</sup>
            </sup>
            /<sub>ч</sub>
          </th>
        </tr>
      </tbody>
    </table>
  );
}
