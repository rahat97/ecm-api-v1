const Grn = require("../models/grnModel");
const Inventory = require("../models/inventory");
const stockIN = async(req,res,next)=> {
try{
    const grnData=req.body
console.log(grnData)
const products=grnData.product
products.map(async pro=>{
const inv= await Inventory.find({material: pro.id})
console.log("inv",inv)
if(inv.length>0){
const inventory={
    totalStock:inv.totalStock+pro.qty,
    currentStock:inv.currentStock+pro.qty,
}
await Inventory.update({_id:inv._id},{$set:inventory})
}
else{
    const inventory={
        totalStock:pro.qty,
        currentStock:pro.qty,
    }
    await Inventory.update({_id:inv._id},{$set:inventory})
}
})
}catch(err){

}finally{
    next()
}

}

module.exports = {stockIN};