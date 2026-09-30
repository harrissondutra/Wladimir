const fs = require("fs");
const t = fs.readFileSync(
  "E:/Downloads/WA Elite _ Planejamento Alimentar (Copy).html",
  "utf8"
);

const fetches = [...t.matchAll(/fetch\(\s*['"`]([^'"`]+)/g)].map((m) => m[1]);
console.log("fetch urls", [...new Set(fetches)]);

const assigns = [...new Set([...t.matchAll(/\bc\.([a-zA-Z][a-zA-Z0-9_]*)\s*=/g)].map((m) => m[1]))].sort();
console.log("client fields", assigns.join(", "));

const i = t.indexOf("async function aiSend");
console.log("\n--- aiSend ---");
console.log(i >= 0 ? t.slice(i, i + 1800) : "no aiSend");
