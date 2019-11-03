const bcrypt = require("bcrypt");

const pass = bcrypt.hashSync(
    "p", 10
);

console.log(pass)