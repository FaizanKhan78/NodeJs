import express from "express";
const app = express();
import { db } from "./db.js";
import PersonRoute from './routes/PersonRoute.js';
import menuItemRoutes from './routes/menuItemsRoutes.js';
app.use( express.json() ); //* req.body


app.use( '/person', PersonRoute );

app.use( '/menuItems', menuItemRoutes );

app.listen( 9000, () =>
{
  console.log( "Server is Running at Port 9000" );
} );