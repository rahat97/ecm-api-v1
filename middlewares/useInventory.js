const Grn = require("../models/grnModel");
const Inventory = require("../models/inventory");

// Inventory Stock In Function
const stockIN = async(req,res,next)=> {
try{
    const grnData=req.body
console.log(grnData)
const products=grnData.product
products.map(async pro=>{
const inv= await Inventory.find({material: pro.id})
console.log("inv",inv)
if(inv?.length>0){
const inventory={
    totalStock:inv?.totalStock + pro.qty,
    currentStock:inv?.currentStock + pro.qty,
}
await Inventory.update({_id:inv._id},{$set:inventory})
}
else{
    const newInventory = new Inventory({
        ProjectId: grnData.ProjectId,
        material: pro.id,
        totalStock: pro.qty,
        currentStock: pro.qty,
        stockOut: 0,
        damageStock: 0,        
        status: "active",
    })
    await newInventory.save();
}
})
}catch(err){
}finally{
    next()
}
}


// Inventory Stock Out Function
const stockOut = async(req,res,next)=> {
    try{
        const grnData=req.body
    console.log(grnData)
    const products=grnData.product
    products.map(async pro=>{
    const inv= await Inventory.find({material: pro.id})
    console.log("inv",inv)
    if(inv.length>0){
    const inventory={
        // totalStock:inv.totalStock+pro.qty,
        currentStock:inv.currentStock - pro.qty,
        stockOut:inv.stockOut + pro.qty,
    }
    await Inventory.update({_id:inv._id},{$set:inventory})
    }
    else{
        // const inventory={
        //     // totalStock:pro.qty,
        //     currentStock:pro.qty,
        //     stockOut:pro.qty,
        // }
        res.status(401).json("There is no Product in Inventory")
        // await Inventory.update({_id:inv._id},{$set:Inventory})
    }
    })
    }catch(err){
    
    }finally{
        next()
    }
    
    }


    // Inventory Damage (out) Function
const damageOut = async(req,res,next)=> {
    try{
        const grnData=req.body
    console.log(grnData)
    const products=grnData.product
    products.map(async pro=>{
    const inv= await Inventory.find({material: pro.id})
    console.log("inv",inv)
    if(inv.length>0){
    const inventory={
        // totalStock:inv.totalStock+pro.qty,
        currentStock:inv.currentStock - pro.qty,
        damageStock:inv.damageStock + pro.qty,
    }
    await Inventory.update({_id:inv._id},{$set:inventory})
    }
    else{
        // const inventory={
        //     // totalStock:pro.qty,
        //     currentStock:pro.qty,
        //     stockOut:pro.qty,
        // }
        res.status(401).json("There is no Damage Product.")
        // await Inventory.update({_id:inv._id},{$set:Inventory})
    }
    })
    }catch(err){
    
    }finally{
        next()
    }
    
    }



module.exports = {stockIN, stockOut, damageOut};