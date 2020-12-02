import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const scsv = await Deno.readTextFile("civicbusiness2020.csv");
const data = CSV.decode(scsv);
const data2 = data.map(d => d.map(d => d.replace(/\s/g, "")));
const scsv2 = CSV.encode(data2);
await Deno.writeTextFile("c.csv", scsv2);

