import express from "express";
import MenuItem from './../models/MenuItem.js';
const router = express.Router();

const errorMessage = { error: "Internal Server Error" };

router.post( '/', async ( req, res ) =>
{
  try
  {
    const data = req.body;

    const newMenuItem = new MenuItem( data );

    const response = await newMenuItem.save();

    console.log( "Menu Item Save Successfully" );

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
    const data = await MenuItem.find();

    console.log( data );

    res.status( 200 ).json( data );

  } catch ( error )
  {
    console.log( error );
    res.status( 500 ).json( errorMessage );
  }
} );


router.patch( "/", async ( req, res ) =>
{
  try
  {
    const data = req.body;

    //  console.log(req.query.id)

    console.log( data );

    const response = await MenuItem.updateOne( { name: data.name }, data );

    res.status( 200 ).json( "Data Updated" );

  } catch ( error )
  {

    console.log( error );

    res.status( 501 ).json( errorMessage );
  }
} );

router.put( '/', async ( req, res ) =>
{
  try
  {
    const data = req.body;

    // Validate incoming data (example: check if name exists)
    if ( !data._id )
    {
      return res.status( 400 ).json( { error: "Id field is required" } );
    }

    console.log( data );

    const response = await MenuItem.findOneAndReplace( { _id: data._id }, data, { new: true } );

    if ( response.nModified === 0 )
    {
      // No documents matched the filter
      return res.status( 404 ).json( { message: "Menu item not found or data is the same" } );
    }

    res.status( 200 ).json( response );
  } catch ( error )
  {
    console.error( error );

    res.status( 500 ).json( errorMessage );
  }
} );

router.get( '/:taste', async ( req, res ) =>
{
  try
  {
    const taste = req.params.taste;

    if ( taste === 'spicy' || taste === 'sweet' || taste === 'sour' )
    {

      const response = await MenuItem.find( { taste } );

      res.status( 200 ).json( response );

    } else
    {
      res.status( 404 ).json( { error: `${ taste } is not valid` } );
    }

  } catch ( error )
  {
    console.log( error );
  }
} );


export default router;