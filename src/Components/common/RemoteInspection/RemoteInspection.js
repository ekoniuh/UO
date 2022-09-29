/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
// import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useData } from "../../../requests/getDataInstallation";
// import './styleJournalEvents.css';
import { CustomizedSnackbars } from "../../../utils/StatusRequest";

export function RemoteInspection() {
  const { installationId } = useParams();
  document.title = "Удалённый осмотр";

  const getAllDateEventURL = `${installationId}/AllInstallationStop`;
  // const addDateEventURL = `${installationId}/AddInstallationStart`;
  // const getLastDateURL = `${installationId}/LastInstallationStart`;
  const { allDateEvent, responseStatus, loadAllDatesEvent, updateDateEventsInst } = useData();

  useEffect(() => {
    loadAllDatesEvent(getAllDateEventURL);
  }, [installationId]);

  function changeInputCalendar() {
    const date = document.querySelector("input[name=calendar]").value;
    const changeDateEventURL = `${installationId}/AddInstallationStop/${date}`;

    const dateTd = document.querySelector(".date-wash-wrap");

    if (!date) {
      dateTd.classList.add("select-date");
      return;
    }

    updateDateEventsInst(installationId, changeDateEventURL, getAllDateEventURL);
  }

  function handleValueCalendar({ target }) {
    const dateTd = document.querySelector(".date-wash-wrap");
    if (target.value) {
      dateTd.classList.remove("select-date");
    }
  }

  function RowTable({ date }) {
    return (
      <tr>
        <th style={{ width: "100%" }}>{new Date(date).toLocaleDateString()}</th>
      </tr>
    );
  }

  if (!allDateEvent) return null;
  return (
    <div className="container">
      <CustomizedSnackbars responseStatus={responseStatus} />
      <p className="section-title">Удаленный осмотр / Сервисный выезд:</p>
      <form className="section-title">
        <fieldset>
          <legend>Добавить:</legend>
          <table className="table-data">
            <tbody>
              <tr>
                <th style={{ width: "100%" }}>Дата</th>
              </tr>
              <tr>
                <td className="date-wash-wrap" style={{ width: "100%", height: 80 }}>
                  {/* <input type="text" name="date" defaultValue="30.12.2021" />
                   */}
                  <input
                    type="date"
                    max={format(new Date(), "yyyy-MM-dd")}
                    name="calendar"
                    onChange={handleValueCalendar}
                    // defaultValue={format(new Date(), 'yyyy-MM-dd')}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan="5">
                  <input
                    type="button"
                    defaultValue="Добавить"
                    className="submit"
                    onClick={() => changeInputCalendar()}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
      <div>
        <table className="table-data">
          <tbody>
            <tr>
              <th style={{ width: "100%" }}>Дата</th>
            </tr>

            {allDateEvent.map((item, index) => {
              return <RowTable date={item.date} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
