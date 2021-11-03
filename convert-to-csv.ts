import { readJSON, writeCSV } from "https://deno.land/x/flat@0.0.13/mod.ts";

const filename = Deno.args[0];
const data = await readJSON(filename);
const output = [];
for (const type in data) {
  output.push({ type, ...data[type] });
}
const newfile = filename.replace(".json", ".csv");
await writeCSV(newfile, output);
