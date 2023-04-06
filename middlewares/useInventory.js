const Grn = require("../models/grnModel");
const Inventory = require("../models/inventory");

// Inventory Stock In Function
const stockIN = async (req, res, next) => {

  try {
    const grnData = req.body;
    console.log(grnData);
   if(grnData.type==="in"){
    const products = grnData.product;

    console.log("products",products)

    products.map(async (pro) => {
      const inv = await Inventory.find({ material: pro.id });
      console.log("inv", inv);
      if (inv?.length > 0) {
        // console.log("inv",inv)
        // console.log("inv.totalstock",inv.totalStock)
        // console.log("inv.currentstock",inv.currentStock)
        // console.log("pro.qty",pro.qty)
        const inventory = {
          totalStock: parseFloat(inv[0]?.totalStock) + parseFloat(pro.qty) ,
          currentStock:  parseFloat(inv[0]?.currentStock) + parseFloat(pro.qty) ,
        };
        // console.log("inventory",inventory)
        await Inventory.update({ _id: inv[0]._id }, { $set: inventory });
      } else {
        const newInventory = new Inventory({
          ProjectId: grnData.ProjectId,
          material: pro.id,
          totalStock: pro.qty,
          currentStock: pro.qty,
          stockOut: 0,
          damageStock: 0,
          status: "active",
        });
        await newInventory.save();
      }
    });
   }
  } catch (err) {
  } finally {
    next();
  }
};

// Inventory Stock Out Function
const stockOut = async (req, res, next) => {
  try {
    const grnData = req.body;
    console.log("grnData",grnData);
  if(grnData.type==="out"){
    const products = grnData.product;
    products.map(async (pro) => {
      const inv = await Inventory.find({ material: pro.id });
      console.log("inv", inv);
      if (inv.length > 0) {
        const inventory = {
          // totalStock:inv.totalStock+pro.qty,
          currentStock: parseFloat(inv[0]?.currentStock) - parseFloat(pro.qty),
          stockOut: parseFloat(inv[0]?.stockOut) + parseFloat(pro.qty),
        };
        await Inventory.update({ _id: inv[0]?._id }, { $set: inventory });
      } else {
        const newInventory = new Inventory({
          ProjectId: grnData.ProjectId,
          material: pro.id,
          totalStock: pro.qty,
          currentStock: pro.qty,
          stockOut: 0,
          damageStock: 0,
          status: "active",
        });
        await newInventory.save();
      }
    });
  }
  } catch (err) {
  } finally {
    next();
  }
};

// Inventory Damage (out) Function
const damageOut = async (req, res, next) => {
    
  try {
    const grnData = req.body;
    console.log("grnData",grnData);
    const products = grnData.product;
    products.map(async (pro) => {
      const inv = await Inventory.find({ material: pro.id });
      console.log("inv", inv);
      if (inv.length > 0) {
        const inventory = {
          // totalStock:inv.totalStock+pro.qty,
          currentStock: parseFloat(inv[0]?.currentStock) - parseFloat(pro.qty),
          damageStock: parseFloat(inv[0]?.damageStock) + parseFloat(pro.qty),
        };
        await Inventory.update({ _id: inv[0]?._id }, { $set: inventory });
      } else {
        const newInventory = new Inventory({
          ProjectId: grnData.ProjectId,
          material: pro.id,
          totalStock: pro.qty,
          currentStock: pro.qty,
          stockOut: 0,
          damageStock: 0,
          status: "active",
        });
        await newInventory.save();
      }
    });
  } catch (err) {
  } finally {
    next();
  }
};

module.exports = { stockIN, stockOut, damageOut };
