import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: String,
        ref: 'Orders',
        required: true
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true
    },
    type_id: {
        type: String,
        ref: 'Type',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
const OrderItems = mongoose.model('OrderItems', orderItemSchema);

export default OrderItems;