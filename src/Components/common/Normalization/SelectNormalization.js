import "./styleNormalization.css";
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

export function SelectNormalization({ changeValueBtn }) {
  // const { installationId } = useParams();
  function handleClickBtn({ value }) {
    changeValueBtn(value);
  }
  return (
    <div className="container">
      <form className="section-title">
        <fieldset>
          <legend>Выбор типа нормализации:</legend>
          <div className="normalization-btn-wrapper">
            <button
              className="normalization-btn"
              type="button"
              value="manual"
              onClick={(event) => handleClickBtn(event.target)}
            >
              Ручная
            </button>

            <button
              className="normalization-btn"
              type="button"
              value="auto"
              onClick={(event) => handleClickBtn(event.target)}
            >
              Авто
            </button>

            {/* <Link
              to={{
                pathname: `/installation/${installationId}/ManualNormalization`,
              }}
            >
              <button
                className="normalization-btn"
                type="button"
                value="manual"
                onClick={(event) => handleClickBtn(event.target)}
              >
                Ручная
              </button>
            </Link>
            <Link
              to={{
                pathname: `/installation/${installationId}/AutoNormalization`,
              }}
            >
              <button
                className="normalization-btn"
                type="button"
                value="auto"
                onClick={(event) => handleClickBtn(event.target)}
              >
                Авто
              </button>
            </Link> */}
          </div>
        </fieldset>
      </form>
    </div>
  );
}
