import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });

await Promise.all([
  copyFile("index.html", "public/invitation.html"),
  copyFile("styles.css", "public/styles.css"),
  copyFile("script.js", "public/script.js"),
  cp("images", "public/images", { recursive: true }),
]);
