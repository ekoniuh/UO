import React from 'react';

export function Thead(props) {
  const namesColumns = [
    { idColumn: 'code', titleColumn: 'Код ошибки' },
    { idColumn: 'title', titleColumn: 'Сообщение' },
    { idColumn: 'date', titleColumn: 'Дата' },
  ];

  return (
    <thead>
      <tr>
        {namesColumns.map((cell, index) => (
          <th
            onClick={() => props.onSortColumns(cell.idColumn)}
            // id={cell.idColumn}
            key={index}
            className={(index === 0 || index === 2) ? 'w120' : undefined}
          >
            <span className={props.switchingSort ? 'increase' : 'decrease'}>
              {cell.titleColumn}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
