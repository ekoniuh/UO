import React from "react";

export const FormErrors = ({ message }) => {
  return (
    message && (
      <div className="form-errors">
        <p>{message}</p>
      </div>
    )
  );
};
