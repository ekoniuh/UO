/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import {
  Antiscalant,
  Pump,
  SourceWater,
  InstallationConfiguration,
  Prefilter,
} from "./components/";

export function Description() {
  document.title = "Описание установки";

  return (
    <div className="container">
      <Pump />
      <Antiscalant />
      <InstallationConfiguration />
      <Prefilter />
      <SourceWater />
    </div>
  );
}
