import express from "express";
const app = express();
import { db } from "./db.js";
import PersonRoute from './routes/PersonRoute.js';
import menuItemRoutes from './routes/menuItemsRoutes.js';
app.use( express.json() ); //* req.body
// require( 'dotenv' ).config();
import dotenv from 'dotenv';
dotenv.config();

//? Hello World

app.use( '/person', PersonRoute );

app.use( '/menuItems', menuItemRoutes );

const PORT = process.env.PORT;

app.listen( PORT, () =>
{
  console.log( "Server is Running at Port 9000" );
} );