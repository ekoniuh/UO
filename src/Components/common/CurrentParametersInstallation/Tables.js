export function Temperature({ tempWater, conductivityPerm }) {
  return (
    <fieldset>
      <legend className="section-title">Температура и проводимость:</legend>

      <table className="table-data">
        <tbody>
          <tr>
            <th rowSpan={3}>T°С</th>
            <th colSpan={2}>Проводимость,мкСм/см</th>
            <th colSpan={2}>Антискалант</th>
          </tr>
          <tr>
            <th rowSpan={2}>Вход</th>
            <th rowSpan={2}>Выход</th>
            <th rowSpan={2}>мл/ч</th>
            <th rowSpan={2}>мл/м³</th>
          </tr>
          <tr></tr>
          <tr>
            <td>{tempWater}</td>
            <td>-</td>
            <td>{conductivityPerm}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}

export function Pressure({ predFilter1, predFilter2, p3, p4, deltaP2 }) {
  return (
    <fieldset>
      <legend className="section-title">Давление</legend>

      <table className="table-data">
        <tbody>
          <tr>
            <th colSpan={2}>Предфильтр, бар</th>
            <th colSpan={3}>Мембраны, бар</th>
          </tr>
          <tr>
            <th rowSpan={2}>Вход</th>
            <th rowSpan={2}>Выход</th>
            <th rowSpan={2}>Вход</th>
            <th rowSpan={2}>Ступень 1</th>
            <th rowSpan={2}>Выход</th>
          </tr>
          <tr></tr>
          <tr>
            <td>{predFilter1}</td>
            <td>{predFilter2}</td>
            <td>{p3}</td>
            <td>-</td>
            <td>{p4}</td>
          </tr>
          <tr>
            <td rowSpan={3} colSpan={2}></td>
            <th colSpan={3}>Дифференциальное давление, бар</th>
          </tr>
          <tr>
            <th>Ступень 1</th>
            <th colSpan={3}>Общее</th>
          </tr>
          <tr>
            <td>-</td>
            <td colSpan={2}>{deltaP2}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}

export function Streams({ ratePerm, drain, circulation }) {
  return (
    <fieldset>
      <legend className="section-title">Потоки</legend>

      <table className="table-data">
        <tbody>
          <tr>
            <th>Пермиат, м³/ч</th>
            <th>Дренаж, м³/ч</th>
            <th>Циркуляция, м³/ч</th>
          </tr>
          <tr>
            <td>{ratePerm}</td>
            <td>{drain}</td>
            <td>{circulation}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}
