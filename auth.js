
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Person from "./models/Person.js";

passport.use( new LocalStrategy( async ( username, password, done ) =>
{
  try
  {
    //console.log( `Receive Credentials ${ username }  ${ password }` );

    const user = await Person.findOne( { username } );

    if ( !user )
    {
      return done( null, false, { message: "Incorrect username " } );
    }
    const isPasswordMatch = await user.comparePassword( password );
    if ( isPasswordMatch )
    {
      return done( null, user );
    } else
    {
      return done( null, false, { message: "Incorrect Password" } );
    }
  } catch ( error )
  {
    console.log( error );

    return done( error );
  }
} ) );

export const localAuthMiddleWare = passport.authenticate( 'local', { session: false } );