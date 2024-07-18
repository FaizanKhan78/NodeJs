import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
//* Define the MongoDB connection URL


const mongoURL = process.env.mongoDBURL;


mongoose.connect( mongoURL );


//* Mongoose maintains a default connection object representing connection between Database. 
//* Exporting DB Connection
export const db = mongoose.connection;


//*  Define the Listeners for database Connection
db.on( "connected", () =>
{
  console.log( "Connected To Data Base" );
} );

db.on( "error", ( error ) =>
{
  console.log( "Connection Error", error );
} );

db.on( "disconnected", () =>
{
  console.log( "Disconnected To Data Base" );
} );