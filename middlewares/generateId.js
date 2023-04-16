const { format, startOfDay, endOfDay } = require("date-fns");
const Grn = require("../models/grnModel");
const GrnOut = require("../models/grnModel");
const Damage = require("../models/damageModel");
const Purchase = require("../models/purchaseModel");
const Requisition = require("../models/requisition");
const Payment = require("../models/paymentModel");
const AccountExpenditure = require("../models/accountExpenditureModel");
const ReceivedAmount = require("../models/receivedAmountModel");
const accountHead = require("../models/accountHeadModel");

// Generate PO Id
const generatePoId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Purchase.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-PO-" + date + "-" + current;
  console.log(newId);
  req.body.poId = newId; 
  next();
};

// Generate Req Id
const generateReqId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Requisition.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-REQ-" + date + "-" + current;
  console.log(newId);
  req.body.reqId = newId;
  next();
};

// Generate Grn Id
const generateGrnId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Grn.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-GRN-" + date + "-" + current;
  console.log(newId);
  req.body.grnId = newId;
  console.log(newId);
  next();
};

// Generate GrnOut Id
const generateGrnOutId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await GrnOut.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-GRNOUT-" + date + "-" + current;
  console.log(newId);
  req.body.grnOutId = newId;
  console.log(newId);
  next();
};


// Generate Damage Id
const generateDamageId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Damage.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-DAM-" + date + "-" + current;
  console.log(newId);
  req.body.dmgId = newId;
  console.log(newId);
  next();
};



// Generate Payment Id
const generatePaymentId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await Payment.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-PAY-" + date + "-" + current;
  console.log(newId);
  req.body.paymentId = newId;
  next();
};


// Generate Account Expenditure Id
const generateAccExpId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await AccountExpenditure.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-AccExp-" + date + "-" + current;
  console.log(newId);
  req.body.accExpId = newId;
  next();
};


// Generate Received Amount Id
const generatReceivedAmountId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await ReceivedAmount.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-REAMT-" + date + "-" + current;
  console.log(newId);
  req.body.recvAmntId = newId;
  next();
};



// Generate Accounts Head Id
const generatAccountHeadId = async (req, res, next) => {
  // TODO:: todays total

  const todayTotal = await accountHead.countDocuments({
    createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
  });

  const number = ("000" + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = format(new Date(new Date()), "MMddyyyy");
  const newId = process.env.ID_PREFIX + "-ACCHD-" + date + "-" + current;
  console.log(newId);
  req.body.accHeadId = newId;
  next();
};





module.exports = {
  generatePoId,
  generateGrnId,
  generateGrnOutId,
  generateDamageId,
  generateReqId,
  generatePaymentId,
  generateAccExpId,
  generatReceivedAmountId,
  generatAccountHeadId,
};
