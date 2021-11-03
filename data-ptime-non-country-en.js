import { readJSON, writeCSV } from "https://deno.land/x/flat@0.0.13/mod.ts";

// const filename = Deno.args[0];
const filename = "data-ptime-non-country-en.json";
const data = await readJSON(filename);
const output = [];
for (const [category, services] of Object.entries(data)) {
  for (const [service, time] of Object.entries(services)) {
    if (service === "lastupdated") continue;

    output.push({
      service: `${category} / ${service}`,
      time: time === "No processing time available" ? null : time,
      lastupdated: services["lastupdated"],
    });
  }
}

const newfile = filename.replace(".json", ".csv");
await writeCSV(newfile, output);
