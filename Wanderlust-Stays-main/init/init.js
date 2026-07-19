require("dotenv").config();
const mongoose = require("mongoose");

const seedUsers = require("./seedUsers");
const seedListingsAndReviews = require("./seedListingsAndReviews");

async function init() {
  await mongoose.connect(process.env.ATLASDB_URL);

  console.log("🔌 DB Connected");

  const users = await seedUsers();
  await seedListingsAndReviews(users);

  await mongoose.connection.close();
  console.log("🔒 DB Connection closed");
}

init().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
