import express from "express";
import Person from './../models/Person.js';
const router = express.Router();

const errorMessage = { error: "Internal Server Error" };

//* Post Route To Add Person Data.
router.post( '/', async ( req, res ) =>
{
  try
  {
    //* Assuming req,body Contains Data.
    const data = req.body;

    //* Create New Person Document Using Person Model.
    const newPerson = new Person( data );

    //* Save the new Person To DataBase.
    const response = await newPerson.save();

    console.log( "Data Saved" );

    console.log( response );

    res.status( 200 ).json( response );

  } catch ( error )
  {
    console.log( error );
    res.status( 500 ).json( errorMessage );
  }
} );


router.get( '/', async ( req, res ) =>
{
  try
  {
    //* Fetching All Person Data From Data Base.
    const data = await Person.find();

    console.log( "Data Fetched" );

    res.status( 200 ).json( data );

  } catch ( error )
  {
    console.log( "Fetch Error " + error );
    res.status( 500 ).json( errorMessage );
  }
} );


router.get( '/:workType', async ( req, res ) =>
{
  try
  {
    const workType = req.params.workType;

    console.log( workType );

    //* Checking if the workType params matches the list or not.

    if ( workType === "chef" || workType === 'manager' || workType === 'waiter' )   //* if yes then send the work data.
    {

      const response = await Person.find( { work: workType } );

      res.status( 200 ).json( response );

    } else //* if not then send error work no valid.
    {
      res.status( 404 ).json( { error: `Worker Cannot be ${ workType }` } );
    }

  } catch ( error )
  {
    console.log( error );
  }
} );

router.delete( '/:id', async ( req, res ) =>
{
  try
  {
    const id = req.params.id;

    const response = await Person.findByIdAndDelete( { _id: id } );

    if ( !response )
    {
      res.status( 404 ).json( { error: "No Person Found" } );
    }

    res.status( 200 ).json( response );

  } catch ( error )
  {
    console.log( error );
    res.status( 501 ).json( { error: "Internal Server Error" } );
  }
} );

export default router;