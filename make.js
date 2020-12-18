import { CSV } from "https://code4sabae.github.io/js/CSV.js";

// make htmls

const path = "html";
await Deno.mkdir(path, { recursive: true });

const replaceLink = (s) => {
  return s.replace(/(http(s)?:\/\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#]+)/gi, "<a href='$1' target='_blank'>$1</a>");
};

const csv = CSV.decode(await Deno.readTextFile("civicbusiness2021.csv"));
const head = csv[0].map((s) => s.replace(/\s/g, ""));
csv[0] = head;
console.log(head);
//const data = head;

const data = [
//  "事業名",
  "事業の目的",
  "事業の概要",

  "予算予定額（上限額）（千円）",
  "正職員数（人）",
  "臨職数（人）",
  "所要時間（H）",

  "部署名",
  "開始年度",
  "R2市民主役事業",
  "R3募集（委託）",
  "R3募集（民営）",
  "複数年提案可能",
  "分類",
  "備考",
  "番号",
];

const json = CSV.toJSON(csv);

const apname = "civicpower";

for (const d of json) {
  const divs = [];
  for (let i = 0; i < data.length; i++) {
    const val = d[data[i]];
    if (val) {
      divs.push(`<div class=data id=data${i}><h2>${data[i]}</h2><div>${replaceLink(val)}</div></div>`)
    }
  }

  const html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="twitter:card" content="summary_large_image"/>
<meta property="og:image"  content="https://code4sabae.github.io/${apname}/${apname}.png">
<meta name="twitter:image" content="https://code4sabae.github.io/${apname}/${apname}.png">
<title>${d["事業名"]} - 鯖江市 提案型市民主役事業</title>
<link rel="stylesheet" type="text/css" href="../${apname}.css">
</head>
<body class="detail">
<h1>${d["事業名"]}</h1>
${divs.join("\n")}
<a href=../index.html>提案型市民主役事業 一覧に戻る</a>
<hr>
<div class=reference>
<h2>参考</h2>
- <a href=../civicbusiness2021.html>令和3年度実施分 - 鯖江市</a><br>
- <a href=../civicpower2020.html>令和2年度実施分 - 鯖江市</a><br>
</div>
<hr>
<div class=credit>
<div>App: <a href=https://fukuno.jig.jp/3067>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/civicpower/>src on GitHub</a>)</div>
<div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー一覧</a> → <a href=https://www.data.go.jp/data/dataset/soumu_20201106_0015>DATA GO JP</a> → <a href="../ictadvisors_2020.csv">UTF-8 CSV</a></div>
</div>
`;
  await Deno.writeTextFile(path + "/" + d["番号"] + ".html", html);
}

// make index

const toHTML = (d) => {
  return `<div id="data${d["番号"]}"><a class="list" href="html/${d["番号"]}.html">
  <h2>${d["番号"]}. ${d["事業名"]} ${d["予算予定額（上限額）（千円）"].trim()},000円</h2>
  <div>${d["部署名"]} ${d["分類"]}<br>目的: ${d["事業の目的"]}</div>
  </a></div>`;
};

const divs2 = [];
for (const d of json) {
  divs2.push(toHTML(d));
}

const indexhtml =
`<!DOCTYPE html><html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="twitter:card" content="summary_large_image"/>
<meta property="og:image"  content="https://code4sabae.github.io/${apname}/${apname}.png">
<meta name="twitter:image" content="https://code4sabae.github.io/${apname}/${apname}.png">
<title>鯖江市 提案型市民主役事業 令和3年度</title>
<script type="module" src="filter.js"></script>
<link rel="stylesheet" type="text/css" href="${apname}.css">
<body class="index">

<h1>鯖江市 提案型市民主役事業 令和3年度</h1>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
<div id="filtered"></div>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=reference>
<h2>参考</h2>
- <a href=civicbusiness2021.html>令和3年度実施分 - 鯖江市</a><br>
- <a href=civicpower2020.html>令和2年度実施分 - 鯖江市</a><br>
</div>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/3067>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/civicpower/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー一覧</a> → <a href=https://www.data.go.jp/data/dataset/soumu_20201106_0015>DATA GO JP</a> → <a href="ictadvisors_2020.csv">UTF-8 CSV</a></div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
