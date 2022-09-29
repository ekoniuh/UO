import React from 'react';
import dataButtonTable from './dataButtonTable';

export function ButtonsFilterTable(props) {
  const handleGroupStateTable = (event) => {
    event.preventDefault();
    props.onClickBtnGroupStateTable(event.target.id);
  };

  return (
    <div className="btn-wrapper" onClick={handleGroupStateTable}>
      {dataButtonTable.map((btn, index) => {
        const btnActive = btn.className + ' btn-image_active';
        return (
          <button
            type="button"
            className={props.filters[btn.typeError] ? btnActive : btn.className}
            key={index}
            data-title={btn.typeError}
            id={btn.typeError}
          />
        );
      })}
    </div>
  );
}
