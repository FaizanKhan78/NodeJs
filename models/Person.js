import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const PersonSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: [ 'chef', 'waiter', 'manager' ],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
} );

PersonSchema.pre( 'save', async function ( next )
{
  const person = this;

  if ( !person?.isModified( 'password' ) ) return next();

  try
  {
    const salt = await bcrypt.genSalt( 10 );

    console.log( person );

    const hashPassword = await bcrypt.hash( person.password, salt );

    console.log( hashPassword );

    person.password = hashPassword;

    next();

  } catch ( error )
  {

    return next( error );
  }
} );


PersonSchema.methods.comparePassword = async function ( candidatePassword )
{
  try
  {

    const isMatch = await bcrypt.compare( candidatePassword, this.password );

    return isMatch;

  } catch ( error )
  {

  }
};

//* Create Model
const Person = mongoose.model( 'Person', PersonSchema );
export default Person;