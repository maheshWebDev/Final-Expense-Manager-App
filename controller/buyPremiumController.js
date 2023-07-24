const Razorpay = require('razorpay');

const {generateAccessToken} = require('../controller/userController')

const Order = require('../model/orderModel');


module.exports.buyPremiumMembership = async(req,res)=>{

    try {
        let instance = new Razorpay({
            key_id: 'rzp_test_sjJru8TdP5Wdkv',
            key_secret: 'tNS9ykbU4njZw04k9xxsGxY1'
        })
        //  creating order
       instance.orders.create({amount:299,currency:"INR"},(err,order)=>{
        if(err){
            return res.status(401).json({message:"API key expired"})
        }
        // console.log(order);
        
      Order.create({orderid:order.id,status:'PENDING',userId:req.user.id})
      .then(()=>{
    
          return res.status(201).json({order,key_id:instance.key_id})
      })
       })
       

    } catch (error) {
        res.status(403).json({message:"something went wrong",success:false})
    }


}

module.exports.updateStatus = async(req,res)=>{
    try {

        console.log("request comming")
        const {payment_id,order_id} = req.body;

        const order= await Order.findOne({where:{orderid:order_id}});

        order.update({paymentid:payment_id,status:"SUCCESSFUL"});

       const updated = await req.user.update({ispremiumuser:true});
      
      console.log(updated)
       return res.status(200).json({"success":"true","message":"transaction successful","token":generateAccessToken(updated.id,true)})



    } catch (error) {
        res.status(404).json({success:false})
    }
}