//  node dev-data\data\import-dev-data.js --import

const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const Model = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

async function dbConnect() {
  await mongoose.connect(DB);
  console.log('Db successfullt connected !!!');
}
dbConnect().catch((err) => console.log(err));

// HERE CHANGE THE FILE NAME TO CHOOSE AND IMPORT MANUALLY
const items = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
  try {
    await Model.create(items);
    console.log('Data succsefully loaded! ');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Model.deleteMany();
    console.log('Data succsefully deleted! ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
