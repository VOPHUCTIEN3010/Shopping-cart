import mongoose from ("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: { type: Number, default: 0 },
    rating : {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    sold: {
      type: Number,
      default: 0,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);

export default Products;