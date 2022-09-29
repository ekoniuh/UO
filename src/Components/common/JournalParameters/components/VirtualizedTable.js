import { createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as React from "react";
// import { withRouter } from "react-router-dom
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
// import { format } from "date-fns";
// import "../Table/Chart.css";

const styles = (theme) => ({
  MuiTableCell: {
    lineHeight: 0,
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    justifyContent: "space-around",
    fontSize: "12px",
    width: "100%",
    borderBottom: "2px solid #e0e0e0",
  },
  table: {
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#e9e9e9",
    },
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: "#e9e9e9",
    },
  },
  tableCell: {
    "&:hover": {
      cursor: "pointer",
    },
    width: "6%",
    flex: 1,
    justifyContent: "center",
    padding: 0,
  },
  noClick: {
    cursor: "initial",
  },
  activeRow: {
    backgroundColor: "#e9e9e9",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 30,
    rowHeight: 20,
  };
  constructor(props) {
    super(props);
    this.state = { activeRowArray: [] };
  }

  headerRenderer = ({ label, columnIndex }) => {
    // const { headerHeight, columns, classes } = this.props;

    return (
      <>
        <tr>
          <th style={{ width: "6%" }} rowSpan={3}>
            "Дата"
          </th>
          <th style={{ width: "6%" }} rowSpan={3}>
            Температура, °С
          </th>
          <th colSpan={2}> Проводимость, uSm</th>
          <th style={{ width: "6%" }} rowSpan={3}>
            Антискалант, мл/м3
          </th>
          <th colSpan={2}>Предфильтр</th>
          <th colSpan={9}>Мембраны обратного осмоса</th>
        </tr>
        <tr>
          <th style={{ width: "6%" }} rowSpan={2}>
            Вход{" "}
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Выход{" "}
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
            Давление ступени №1, Bar
          </th>
          <th style={{ width: "6%" }} rowSpan={2}>
            Выход, Bar
          </th>
          <th colSpan={2}>Дифференциальное давление</th>
          <th colSpan={3}>Потоки</th>
        </tr>
        <tr>
          <th style={{ width: "6%" }}>Cтупень №1, Bar</th>
          <th style={{ width: "6%" }}>Общее, Bar</th>
          <th style={{ width: "6%" }}>
            Пермиат,{" "}
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
      </>
    );
  };

  getRowClassName = ({ index, rowIndex }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.activeRow]: this.state.activeRowArray.includes(index),
    });
  };

  cellRenderer = ({ cellData, columnIndex, rowIndex }) => {
    const { columns, classes, rowHeight, onRowClick, isNormalization } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        onClick={() => {
          this.setState((state) => ({
            activeRowArray: state.activeRowArray.includes(rowIndex)
              ? state.activeRowArray.filter((item) => item !== rowIndex)
              : Array.from(new Set([...state.activeRowArray, rowIndex])),
          }));
        }}
        style={{
          height: rowHeight,
          border: "none",
          display: "flex",
          fontSize: "13px",
          padding: 0,
          background:
            (columnIndex === 5 ||
              columnIndex === 6 ||
              columnIndex === 9 ||
              columnIndex === 11 ||
              columnIndex === 13) &&
            isNormalization &&
            "#808080a0",
        }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? "right" : "left"}
      >
        {columnIndex === 8 || cellData === 0 ? "-" : cellData}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            // headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }) => {
              return (
                <Column
                  // headerRenderer={this.headerRenderer}
                  // headerRenderer={(headerProps) =>
                  //   this.headerRenderer({
                  //     ...headerProps,
                  //     columnIndex: index,
                  //   })
                  // }
                  key={dataKey}
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

export function ReactVirtualizedTable({ dataState, isNormalization }) {
  return (
    <Paper
      style={{
        height: dataState.length > 0 && dataState.length <= 20 ? dataState.length * 20 : 400,
        width: "100%",
      }}
    >
      <VirtualizedTable
        isNormalization={isNormalization}
        style={{ width: "100%" }}
        rowCount={dataState.length}
        rowGetter={({ index }) => dataState[index]}
        columns={[
          "date",
          "tempWater",
          "reserv1",
          "conductivityPerm",
          "reserv2",
          "p1",
          "p2",
          "p3",
          "deltaP1",
          "p4",
          "reserv3",
          "deltaP2",
          "ratePerm",
          "drain",
          "circulation",
        ].map((item) => {
          return {
            label: "",
            width: 100,
            height: 20,
            dataKey: item,
            numeric: true,
          };
        })}
      />
    </Paper>
  );
}
