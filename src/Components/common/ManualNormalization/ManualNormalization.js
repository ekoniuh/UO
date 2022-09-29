/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useData } from '../../../../requests/getDataInstallation';
// import './styleJournalEvents.css';

export function ManualNormalization() {
  // const { installationId } = useParams();
  document.title = "Ручная нормализация";
  // const { dataStateStatus, loadLastDateEvent, updateEventsInst } = useData();

  // useEffect(() => {
  // 	loadLastDateEvent(installationId);
  // }, [installationId]);

  // function setChangeEvent(id, setURL, loadURL) {
  // 	updateEventsInst(id, setURL, loadURL);
  // }

  // if (!dataStateStatus) return null;
  return (
    <div className="container">
      <form className="section-title">
        <fieldset>
          <legend>Параметры ручной нормализации:</legend>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Реперное значение температуры:</label>
                  </th>
                  <td>
                    <input type="text" name="rept" defaultValue="10" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    {" "}
                    <label className="normalization-item__title">Реперное значение давления:</label>
                  </th>
                  <td>
                    <input type="text" name="repp" defaultValue="12,5" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    {" "}
                    <label className="normalization-item__title">Реперное значение производительности:</label>
                  </th>
                  <td>
                    {" "}
                    <input type="text" name="repq" defaultValue="55" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset>
          <legend>Нормализация проводимости по температуре и входному давлению:</legend>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. температура-проводимость</label>
                  </th>
                  <td>
                    <input type="text" name="tskoeff" defaultValue="0,2" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. давление-проводимость</label>
                  </th>
                  <td>
                    <input type="text" name="pskoeff" defaultValue="0,35" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset>
          <legend>Нормализация перепада давления на мембранах по давлению и производительности:</legend>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. давление-перепад</label>
                  </th>
                  <td>
                    <input type="text" name="pdpkoeff" defaultValue="0,09" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. произв.-перепад</label>
                  </th>
                  <td>
                    <input type="text" name="qpkoeff" defaultValue="0,03" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset>
          <legend>Нормализация производительности по температуре и давлению:</legend>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. производительность - температура</label>
                  </th>
                  <td>
                    <input type="text" name="tqkoeff" defaultValue="2,15" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "50%" }}>
                    <label className="normalization-item__title">Коэфф. производительность - давление</label>
                  </th>
                  <td>
                    <input type="text" name="pqkoeff" defaultValue="4,2" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th>
                    <input type="submit" value="Сохранить" className="submit" />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
