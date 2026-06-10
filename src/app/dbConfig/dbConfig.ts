import mongoose from 'mongoose';

export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected to data base ");

        })
        connection.on('error',(er)=>{
            console.log("Error  in connection",er)
            // now exit the connection 
            process.exit();

        })

  
    } catch (error) {
        console.log("Some went wrong in connection to the mongo server ")
        console.log(error)
    }
}

export {connect};