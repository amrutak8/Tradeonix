const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  userId: String,

  availableMargin: Number,
  usedMargin: Number,
  availableCash: Number,

  openingBalance: Number,
  payin: Number,

  span: Number,
  exposure: Number,
  deliveryMargin: Number,
  optionPremium: Number,

  collateralLiquid: Number,
  collateralEquity: Number,
});

module.exports = { FundsSchema };