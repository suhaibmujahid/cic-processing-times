import { readJSON, writeCSV } from "https://deno.land/x/flat@0.0.13/mod.ts";

const filename = Deno.args[0];
const data = await readJSON(filename);
const output = [];
for (const type in data) {
  output.push({ type, ...data[type] });
}
const newfile = filename.replace(".json", ".csv");
await writeCSV(newfile, output);

const formate = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{
        [keysMap[key] || key]: obj[key].replace(
          "No processing time available",
          ""
        ),
      },
    }),
    {}
  );

const country = (await readJSON("data-country-name-en.json"))["country-name"];
const formattedOutput = output.map((row) => formate(country, row));
await writeCSV(`formatted-${newfile}`, formattedOutput);

const formattedSelectedOutput = output.map(
  ({ type, WB, JO, TR, IL, lastupdated }) =>
    formate(country, {
      type,
      WB,
      JO,
      TR,
      IL,
      lastupdated,
    })
);
await writeCSV(
  `formatted-selected-countries-${newfile}`,
  formattedSelectedOutput
);
