import mongoose from "mongoose"
import User from "./models/index.js"


mongoose.connect("mongodb://localhost/worddb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let userSeed = [
    {
        name: 'Joe',
        words: [{word: 'awesome'}, { word: 'cool'}]
    },
    {
        name: 'Derek',
        words: [{ word: 'super'}, { word: 'duper'}]
    }

];

User.deleteMany({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
