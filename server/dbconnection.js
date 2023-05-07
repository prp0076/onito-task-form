const mongoose = require("mongoose");
const mongoUri = 'mongodb+srv://prp313918:prp313918@userdata.oxphlla.mongodb.net/userdata?retryWrites=true&w=majority';

const Connectdb = async ()=>{
    try{ 
         const connect = await mongoose.connect(mongoUri,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('connnected');
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = Connectdb;
