import express from "express";
const app = express();
import { db } from "./db.js";
import PersonRoute from './routes/PersonRoute.js';
import menuItemRoutes from './routes/menuItemsRoutes.js';
app.use( express.json() ); //* req.body
import passport from 'passport';
import dotenv from 'dotenv';
import { localAuthMiddleWare } from "./auth.js";
dotenv.config();

//? Hello World

const logRequest = ( req, res, next ) =>
{
  console.log( `[${ new Date().toLocaleString() }] Request Made to ${ req.originalUrl }` );
  next();
};

app.use( passport.initialize() );

app.use( '/person', localAuthMiddleWare, logRequest, PersonRoute );

app.use( '/menuItems', localAuthMiddleWare, menuItemRoutes );

const PORT = process.env.PORT;

app.listen( PORT || 9000, () =>
{
  console.log( "Server is Running at Port 9000" );
} );