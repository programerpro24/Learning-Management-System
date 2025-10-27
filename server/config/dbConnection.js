import mongoose from "mongoose"; 

mongoose.set('strictQuery', false);

const connectionToDB = async ()=>{
    try{
       const {connection} = await mongoose.connect(process.env.MONGODB_URI);
       if(connection){
        console.log(`connected to DB : ${connection.host}`);
       }
    }catch(e){
        console.log("Error while connecting to DB", e);
        process.exit(1);
    }
}


export default connectionToDB; 