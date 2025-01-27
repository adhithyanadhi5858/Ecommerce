const express = require('express');
const router = express.Router();

const {createOrder, updateOrderStatus,getUserOrders, getAllOrders, getOrderById,} = require("../controller/orderController");
const { authMiddleWare } = require('../middleware/authenticationMiddleware')
const { admineOnly } = require('../middleware/admineOnlyMiddleware');


router.post('/create-order', authMiddleWare, createOrder);

router.put('/update/:id', authMiddleWare, admineOnly, updateOrderStatus);

router.get('/user-orders', authMiddleWare, getUserOrders);

router.get('/get-all-orders', authMiddleWare, admineOnly, getAllOrders);

router.get('/get-order/:id', authMiddleWare, getOrderById);

module.exports = router;
