const express = require("express");

const portNumber = 3000;
const sourceDir = "dist";

const app = express();

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
