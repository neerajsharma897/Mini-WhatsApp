const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
var methodOverride = require('method-override');
const ExpressErr = require("./ExpressErr.js");
require('dotenv').config();



app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


main().then(()=> console.log("Connection Successful")).catch((err)=> console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
};

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err) => next(err));
    };
};

app.get("/",(req,res)=>{
    res.send("Hello World");
});

// Index route
app.get("/chats", wrapAsync(async (req,res) =>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
    })
);

// New route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
});

//Create route
app.post("/chats", wrapAsync(async (req,res,next)=>{
        let {from,msg,to} = req.body;
        let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_At: new Date()
        });
        
        await newChat.save()
        res.redirect("/chats");
    })
);

// Edit route
app.get("/chats/:id/edit", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let chat =  await Chat.findById(id);
    if(!chat){
        next(new ExpressErr(404,"Chat not found"));
    }
    res.render("edit.ejs",{chat});
    })
);

// Update route
app.put("/chats/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    await Chat.findByIdAndUpdate(id,{msg : newMsg, updated_At : new Date()},{runValidators : true , new : true});
    res.redirect("/chats");
    })
);

// Delete route
app.delete("/chats/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    })
);

// Error Handeling
app.use((err,req,res,next)=>{
    let {status = 500, msg= "Something went wrong"} = err;
    res.status(status).send(msg);
});

app.listen(8080, () =>{
    console.log(`server is running on port 8080`);
});

