import mongoose from "mongoose";

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
 }
} );

//* Create Model
const Person = mongoose.model( 'Person', PersonSchema );
export default Person;