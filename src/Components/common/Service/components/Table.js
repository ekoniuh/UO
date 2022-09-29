// import { CONFIG_TBODY_MEMBRANE } from "../constant";

import { format } from "date-fns";

export const Table = ({ data }) => {
  const { membraneChange, chemicalWash, serviceView } = data;
  return (
    <table className="table-data">
      <thead>
        <tr>
          <th rowSpan={2}></th>
        </tr>
        <tr>
          <th> Последнеe событиe</th>
          <th> Следуещеe событиe по регламенту </th>
          <th> Следующеe событиe по рекомендации </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th> Промывка </th>
          <td>
            {chemicalWash.lastEvent ? format(new Date(chemicalWash.lastEvent), "yyyy-MM-dd") : "-"}
          </td>
          <td>
            {chemicalWash.nextReglamentEvent
              ? format(new Date(chemicalWash.nextReglamentEvent), "yyyy-MM-dd")
              : "-"}
          </td>
          <td>
            {chemicalWash.nextPredictEvent
              ? format(new Date(chemicalWash.nextPredictEvent), "yyyy-MM-dd")
              : "-"}
          </td>
        </tr>
        <tr>
          <th> Замена мембран </th>
          <td>
            {membraneChange.lastEvent
              ? format(new Date(membraneChange.lastEvent), "yyyy-MM-dd")
              : "-"}
          </td>
          <td>
            {membraneChange.nextReglamentEvent
              ? format(new Date(membraneChange.nextReglamentEvent), "yyyy-MM-dd")
              : "-"}
          </td>
          <td>
            {membraneChange.nextPredictEvent
              ? format(new Date(membraneChange.nextPredictEvent), "yyyy-MM-dd")
              : "-"}
          </td>
        </tr>
        <tr>
          <th> Сервесный осмотр </th>
          <td>
            {serviceView.lastEvent ? format(new Date(serviceView.lastEvent), "yyyy-MM-dd") : "-"}
          </td>
          <td>
            {serviceView.nextReglamentEvent
              ? format(new Date(serviceView.nextReglamentEvent), "yyyy-MM-dd")
              : "-"}
          </td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  );
};
