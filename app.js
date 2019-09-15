 let express=require('express');
let app=express();
var mongoose = require('mongoose');
var  phoneBook= require('./dbConfig/module');
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('view'));

var mongoDB = 'mongodb://srajanish:maharana1995@ds127928.mlab.com:27928/techproject';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("database connected");
});

//Start of app get
app.get("/",(req,res)=>{
    
})

app.get("/book/",(req,res)=>{

    phoneBook.find((err,result)=>{
        if(err){console.log(err);
        res.json(err)
        }
        else{
            res.json(result);
        }
    })
})

//End of app get




//STart of app post

app.post("/book/",(req,res)=>{

    console.log(req.body);
    if(req.body!=undefined){
        let ph=new phoneBook(req.body);
        ph.save((err)=>{
            if(err){console.log(err);
            res.json(err)
            }
            else{
                res.json({msg:"success"});
            }
        })
            
    }
    
})

//E nd of app post


app.put("/book/:no",(req,res)=>{
    console.log(req.params);
    let no=req.params.no;


 let obj=req.body;

phoneBook.findOne({phoneNo:no},(err,result)=>{

   console.log(result);

   console.log(obj);
    result.firstName=obj.firstName;
    result.lastName=obj.lastName;
    result.phoneNo=obj.phoneNo;
    result.email=obj.email;

    result.save((err)=>{
        if(err){
            console.log(err);
            res.json(err)
        }
        else{
            res.json({msg:"Update success"});
        }
    })
})

})



app.delete("/book/:no",(req,res)=>{

    console.log(req.params);                                                                                                                                                                      let no=req.params.no;

    phoneBook.deleteOne({phoneNo:no},(err)=>{

        if(err){console.log(err);
            res.json(err)
            }
            else{
                res.json({msg:"Deleted Sucess"});
            }
        })

    
})

   









app.listen(3000,()=>console.log("App running on port 3000"));
