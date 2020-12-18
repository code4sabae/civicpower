import { CSV } from "https://code4sabae.github.io/js/CSV.js";

window.onload = async () => {
  const csv = await CSV.fetch("civicbusiness2021.csv");
  const json = CSV.toJSON(csv);

  inputfilter.onchange = inputfilter.onkeyup = () => {
    const key = inputfilter.value;
    let cnt = 0;
    for (const d of json) {
      let flg = false;
      for (const name in d) {
        if (d[name].indexOf(key) >= 0) {
          flg = true;
          break;
        }
      }
      const idname = "data" + d["番号"];
      const div = document.getElementById(idname);
      if (flg) {
        cnt++;
      }
      div.style.display = flg ? "block" : "none";
    }
    filtered.textContent = `該当事業：${cnt}件`;
  };
};
