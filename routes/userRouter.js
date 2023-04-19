const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

//GET ALL USERS
userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.find({}).select({
        _id: 1,
        name: 1,
        username: 1,
        phone: 1,
        email: 1,
        password: 1,
        address: 1,
        nid: 1,
        type: 1,
        status: 1,
      });
      res.send(user);
      //   res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
    console.log(user);
  })
);
//GET ALL USERS
userRouter.get(
  "/eng_dw",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.find({status : "active", type: "site_engineer"}).select({
        _id: 1,
        name: 1,
        // email: 1,
        // status: 1,
        // phone: 1,
        // type: 1,
      })
      ;
      res.send(user);
      //   res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
    console.log(user);
  })
);

// GET USER BY ID
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: id }).select({
        name: 1,
        username: 1,
        phone: 1,
        email: 1,
        password: 1,
        address: 1,
        nid: 1,
        type: 1,
        status: 1,
    });
    res.send(user[0]);
  })
);

// GET USER BY PHONE
userRouter.get(
  "/phone/:phone",
  expressAsyncHandler(async (req, res) => {
    const phone = req.params.phone;
    const user = await User.find({ phone: phone });
    res.send(user);
  })
);

// GET USER BY EMAIL
userRouter.get(
  "/email/:email",
  expressAsyncHandler(async (req, res) => {
    const email = req.params.email;
    const user = await User.find({ email: email });
    res.send(user);
  })
);

// GET ALL USERS BY TYPE
userRouter.get(
  "/type/:type",
  expressAsyncHandler(async (req, res) => {
    let type = req.params.type;
    let query = {type: type}

    if(type === "all"){
      query = {}
    }

    
    const users = await User.find(query);
    res.send(users);
  })
);

// CREATE ONE USER
userRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User(req.body);
    console.log(newUser)
    try {
      await newUser.save();
      res.status(200).json({
        message: "User is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

//UPDATE ONE USER
userRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await User.updateOne({ _id: id }, { $set: update })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      console.error(error);
    }
  })
);

// DELETE ONE USER
userRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await User.deleteOne({ _id: id })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      console.error(error);
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    // console.log(bcrypt);
    
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hash", hashPassword);
    try {
      const newUser = new User({
        name: req.body.name,
        username: req.body.phone,
        phone: req.body.phone,
        email: req.body.email,
        password: hashPassword,
        address: "",
        nid: req.body.nid,
        type: req.body.type,
        privilege: {},
        status: req.body.status,
      });
      
      console.log("new user",newUser);

      await newUser.save();
      res.status(200).json({
        message: "Registration Successful",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "There was a server side error", error });
    }
  })
);

// USER LOGIN
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
   const {userId, password}=req.body;
   let errText = ""

  
   try{
    await User.find({ username: userId })
    .then((user) => {
      // res.send(response);
 if (user && user?.length > 0) {
          console.log(password)
          console.log( user?.password) 
             bcrypt.compare(password, user?.password, function(err, result) {
               console.log(result)
              if(result===true){

                const token = jwt.sign(
                          {
                            name: user[0].name,
                            userId: user[0]._id,
                            type: user[0].type,
                          },
                          process.env.JWT_SECRET,
                          { expiresIn: "1h" }
                        );
                        res.status(200).json({
                          access_token: token,
                          status: true, 
                          message: "Login Successful",
                        });
              }

          });

        }else{
          errText = "User does not matched!"
        }
      console.log("response",response)
    })
    .catch((err) => {
      res.send(err);
    });
       

   }catch(err){
    errText = err
    console.log(err)

   }
  //  console.log(req.body)
  //  console.log(errTextz)
    // console.log({ body: req.body, email: isEmail })
    // const isnumber= parseInt(userId)
    // try {
    //   let user;
    //   // if (isnumber===NaN) {
    //     //   console.log("j",userId)
    //     //   user = await User.find({
    //       //     status: "active",
    //   //     phone: userId
    //   //   });
    //   // } else {
    //     //   console.log("k",userId)
    //     //   user = await User.find({
    //       //     status: "active",
    //       //     username: userId,
    //       //   });
    //       // }
    //       console.log(userId)
      
    //   user = await User.find({
    //     status: "active",
    //     phone: userId
    //   });
    //   console.log(user)
    //   if (user && user.length > 0) {
    //     console.log("j", req.body.password,
    //       user[0].password)
    //     const isValidPassword =  (
    //       req.body.password=== user[0].password
    //     );
    //     console.log("k",isValidPassword)
    //     if (isValidPassword) {
    //       // generate token
    //       const token = jwt.sign(
    //         {
    //           username: user[0].username,
    //           userId: user[0]._id,
    //           type: user[0].type,
    //         },
    //         process.env.JWT_SECRET,
    //         { expiresIn: "1h" }
    //       );

    //       res.status(200).json({
    //         access_token: token,
    //         status: true,
    //         // user: {
    //         //   id: user[0]._id,
    //         //   name: user[0].name,
    //         //   username: user[0].username,
    //         //   email: user[0].email,
    //         //   type: user[0].type,
    //         // },
    //         message: "Login Successful",
    //       });
    //     } else {
    //       res.status(401).json({
    //         status: false,
    //         error: "Password Does not Match",
    //       });
    //     }
    //   } else {
    //     res.status(401).json({
    //       status: false,
    //       error: "User Not Found",
    //     });
    //   }
    // } catch (err) {
    //   res.status(500).json({
    //     status: false,
    //     error: err,
    //   });
    // }
  })
);
// userRouter.post(
//   "/login",
//   expressAsyncHandler(async (req, res) => {
//     const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//       req.body.email
//     );
//     // console.log({ body: req.body, email: isEmail })
//     try {
//       let user;
//       if (isEmail) {
//         user = await User.find({
//           status: "active",
//           email: req.body.email.toLowerCase(),
//         });
//       } else {
//         user = await User.find({
//           status: "active",
//           username: req.body.email.toLowerCase(),
//         });
//       }
//       // console.log(user)
//       if (user && user.length > 0) {
//         const isValidPassword = await compare(
//           req.body.password,
//           user[0].password
//         );
//         if (isValidPassword) {
//           // generate token
//           const token = jwt.sign(
//             {
//               username: user[0].username,
//               userId: user[0]._id,
//               type: user[0].type,
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//           );

//           res.status(200).json({
//             access_token: token,
//             status: true,
//             user: {
//               id: user[0]._id,
//               name: user[0].name,
//               username: user[0].username,
//               email: user[0].email,
//               type: user[0].type,
//             },
//             message: "Login Successful",
//           });
//         } else {
//           res.status(401).json({
//             status: false,
//             error: "Password Does not Match",
//           });
//         }
//       } else {
//         res.status(401).json({
//           status: false,
//           error: "User Not Found",
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         status: false,
//         error: err,
//       });
//     }
//   })
// );
// USER Validation
userRouter.post(
  "/valid",
  expressAsyncHandler(async (req, res) => {
    try {
      let user;
      // console.log(req.body);

      user = await User.find({
        status: "active",
        username: req.body.username.toLowerCase(),
      });
      // console.log("user:", user);

      if (user && user.length > 0) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (isValidPassword) {
          res.status(200).json({ status: true });
        } else {
          res.status(401).json({
            status: false,
            error: "Password Does not Match",
          });
        }
      } else {
        res.status(401).json({
          status: false,
          error: "User Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }
  })
);

module.exports = userRouter;
