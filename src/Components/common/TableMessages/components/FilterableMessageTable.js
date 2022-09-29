/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./FilterableMessageTable.css";
import { Table } from "./Table/Table";
import { SearchBar } from "./SearchBar/SearchBar";
import { ButtonsFilterTable } from "./ButtonsFilterTable/ButtonsFilterTable";
import { CustomizedSnackbars } from "../../../../utils/StatusRequest";

import { useData } from "../../../../requests/getDataInstallation";
import { useParams } from "react-router-dom";

export function FilterableMessageTable() {
  let { installationId } = useParams();
  document.title = "Журнал сообщений";

  const { messages, responseStatus, loadMessages } = useData();

  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState({
    info: false,
    warning: false,
    error: false,
  });
  const [switchingSort, setSwitchingSort] = useState(true);
  const [messagesTable, setMessagesTable] = useState(messages);

  useEffect(() => {
    loadMessages(installationId);
  }, []);

  useEffect(() => {
    // const sortArr = [...messages].sort((a, b) =>
    //   switchingSort ? (a[ID] < b[ID] ? 1 : -1) : a[ID] > b[ID] ? 1 : -1
    // );

    setMessagesTable(messages);
  }, [messages]);

  const handleFilterTextChange = (filterText) => {
    setFilterText(filterText);
  };

  //TODO надо убрать функцию
  const handleSortColumns = (id) => {
    const sortArr = [...messages].sort((a, b) => (switchingSort ? (a[id] < b[id] ? 1 : -1) : a[id] > b[id] ? 1 : -1));
    setMessagesTable(sortArr);

    setSwitchingSort(
      !switchingSort
      //TODO
    );
  };

  const handleGroupStateTable = (targetId) => {
    setFilters((prev) => {
      return {
        ...prev,
        [targetId]: !filters[targetId],
      };
    });
  };
  if (typeof messagesTable === "undefined") return null;

  return (
    <div className="App">
      <div className="wrapper-table">
        <CustomizedSnackbars responseStatus={responseStatus} />
        <section className="section-header">
          <SearchBar filterText={filterText} onFilterTextChange={handleFilterTextChange} />
          <ButtonsFilterTable onClickBtnGroupStateTable={handleGroupStateTable} filters={filters} />
        </section>
        <Table
          switchingSort={switchingSort}
          filters={filters}
          dataMessages={messagesTable}
          filterText={filterText}
          onSortColumns={handleSortColumns}
        />
      </div>
    </div>
  );
}
