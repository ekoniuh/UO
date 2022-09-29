import React from "react";

export function SourceWater() {
  return (
    <form className="section-title">
      <fieldset>
        <legend>Источник воды:</legend>
        <div>
          <table className="table-data">
            <tbody>
              <tr>
                <th style={{ width: "50%" }}>
                  <select>
                    <option value="1">Поверхностная</option>
                    <option value="2">Поверхностная после ультрафильтрации</option>
                    <option value="3">Артезианская</option>
                    <option value="4">Стоки</option>
                  </select>
                </th>
                <td>
                  <select>
                    <option value="1">SDI до одного</option>
                    <option value="2">SDI 1-3</option>
                    <option value="3">SDI 3-5</option>
                    <option value="4">SDI более 5</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="1">Солёность до 500</option>
                    <option value="2">Солёность 500-1000</option>
                    <option value="3">Солёность более 1000</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </form>
  );
}
