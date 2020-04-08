const mongoose = require("mongoose");
require("dotenv").config();

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(console.log("Connected to mongo: " + mongoose.version))
  .catch(err => console.error(err));
