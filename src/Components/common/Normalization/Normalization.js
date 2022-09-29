/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useContext } from "react";
import { Context } from "../../../";

import { Link, useParams } from "react-router-dom";
import "./styleNormalization.css";

export function Normalization() {
  document.title = "Нормализация";
  const { installationId } = useParams();
  const { store } = useContext(Context);

  return (
    <div>
      <div className="container">
        <form className="section-title">
          <fieldset>
            <legend>Выбор типа нормализации:</legend>
            <div className="normalization-btn-wrapper">
              <Link
                to={{
                  pathname: `/${store.user?.role.toLowerCase()}/installation/${installationId}/normalization/manual`,
                }}
              >
                <button className="normalization-btn" type="button" value="manual">
                  Ручная
                </button>
              </Link>
              <Link
                to={{
                  pathname: `/${store.user?.role.toLowerCase()}/installation/${installationId}/normalization/auto`,
                }}
              >
                <button className="normalization-btn" type="button" value="auto">
                  Авто
                </button>
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
