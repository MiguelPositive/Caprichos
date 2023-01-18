const mongoose = require("mongoose");

const salesSchema = mongoose.Schema({
  date: {
    type: String,
  },
  customerData: {
    type: Object,
  },

  transactionData: {
    type: Object,
  },
  hour: {
    type: String,
  },

  isSale: {
    type: Boolean,
  },
});

const salesModel = mongoose.model("ventas", salesSchema);

module.exports = {
  salesModel,
};
