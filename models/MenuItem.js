import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema( {
 name: {
  type: String,
  required: true,
  unique: true,
 },
 price: {
  type: Number,
  default: 2.00,
 },
 taste: {
  type: String,
  enum: [ 'sweet', 'spicy', 'sour' ],
  required: true,
 },
 isDrink: {
  type: Boolean,
  default: false,
 },
 ingredients: {
  type: [ String ],
  default: [],
 },
 num_sales: {
  type: Number,
  default: 0,
 }
} );


const MenuItem = mongoose.model( 'Menu', menuItemSchema );

export default MenuItem;