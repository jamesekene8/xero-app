const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Realestate = require("../models/realestateModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const abuja = JSON.parse(fs.readFileSync(`${__dirname}/abuja.json`, "utf-8"));
const ibadan = JSON.parse(fs.readFileSync(`${__dirname}/ibadan.json`, "utf-8"));
const lagos = JSON.parse(fs.readFileSync(`${__dirname}/lagos.json`, "utf-8"));

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Realestate.create(abuja);
    await Realestate.create(ibadan);
    await Realestate.create(lagos);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log("Data successfully deleted!");
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
