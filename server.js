const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

// MOONGOOSE 5
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log(con.connections);
//     console.log('DB connections succes!!');
//   });

// MOONGOOSE 7
async function dbConnect() {
  await mongoose.connect(DB);
}
dbConnect().catch((err) => console.log(err));

// console.log(app.get('env')); // express
// console.log(process.env); //core module node

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: [true, 'A user must have a name'] },
//   surname: { type: String, required: [true, 'A user must have a surname'] },
//   email: {
//     type: String,
//     required: [true, 'A user must have a email'],
//     unique: true,
//   },
//}
//);

// const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
