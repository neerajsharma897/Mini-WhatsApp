const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
require('dotenv').config();

main().then(()=> console.log("Connection Successful")).catch((err)=> console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
};

let allChat = [
   {
    from: "Neeraj",
    to: "Sanjay",
    msg: "Ache se padhna bhai",
    created_At: new Date()
  },
  {
    from: "Raj",
    to: "Amit",
    msg: "Meeting at 10 AM tomorrow.",
    created_At: new Date()
  },
  {
    from: "Sneha",
    to: "Priya",
    msg: "Happy Birthday! Hope you have a great day!",
    created_At: new Date()
  },
  {
    from: "Arjun",
    to: "Karan",
    msg: "Let's catch up this weekend.",
    created_At: new Date()
  },
  {
    from: "Anjali",
    to: "Vivek",
    msg: "Don't forget to submit your report by evening.",
    created_At: new Date()
  },
  {
    from: "Pooja",
    to: "Rohan",
    msg: "All the best for your exams!",
    created_At: new Date()
  }
];

Chat.insertMany(allChat);