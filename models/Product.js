
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    barcode: String,
    image: String,
    name: String,
    price: Number,
    discount: Number,
    department: String,
    category: String,
    subCategory: String,
    brand: String,
    model: String,
    description: String,  
    soldByObject: {
      soldBy: String,
      soldbyswt: String
    },
    portionn: {
      portion: String,
      portionswt: String,
      portionValue: Number
    },
    measurement: {
      unit: String,
      height: Number,
      width: Number,
      depth: Number,
      lenght: Number
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false
  }
);

module.exports = mongoose.model("product", ProductSchema);
