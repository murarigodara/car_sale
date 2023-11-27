const { Module } = require("module");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const carSchema = new Schema({
  InvoiceNo: String,
  image: String,
  Manufacturer: String,
  class: String,
  Sales_in_thousands: mongoose.Types.Decimal128,
  __year_resale_value: mongoose.Types.Decimal128,
  Vehicle_type: String,
  Price_in_thousands: mongoose.Types.Decimal128,
  Engine_size: mongoose.Types.Decimal128,
  Horsepower: Number,
  Wheelbase: mongoose.Types.Decimal128,
  Width: mongoose.Types.Decimal128,
  Length: mongoose.Types.Decimal128,
  Curb_weight: mongoose.Types.Decimal128,
  Fuel_capacity: mongoose.Types.Decimal128,
  Fuel_efficiency: mongoose.Types.Decimal128,
  Latest_Launch: Date,
  Power_perf_factor: mongoose.Types.Decimal128,
});
module.exports = mongoose.model("Invoice", carSchema,'CarSales');
