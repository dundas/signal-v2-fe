const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const orderQueueSchema = new Schema(
  {
    dateAdded: {
      type: String,
    },
    data: {
      type: Object,
    },
    status: {
      type: String,
    },
    shop: {
      type: String,
    },
    lastUpdated: {
      type: String,
    },
    type: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.OrderQueue ||
  mongoose.model("OrderQueue", orderQueueSchema);
