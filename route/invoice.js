const express = require("express");
const router = express.Router();
let Invoice = require("../models/Invoice");
const { default: mongoose } = require("mongoose");

const {Decimal128}=require('mongodb')
//method to handle /alldata route
router.route("/alldata").get((req, res) => {
  Invoice.find((err, data) => {
    if (!err) {
      if (data) {
        res.send(data);
        return;
      }
      res.send("<h1>Unable to Load the data");
      return;
    }
    res.send(`<h1>${err}`);
  });
});
//method to handle /search/:id
router.route("/:id").get((req, res) => {
  Invoice.findById(req.params.id,(err, data) => {
    if (!err) {
      if (data) {
        res.send(data);
        return;
      }
      else{
        Invoice.find({InvoiceNo:req.params.id},(err,data)=>{
          if(err){
            res.send("Err :"+err);
          }
          if (data) {
            res.send(data);
            return;
          }
          res.send("<h1>Invliad Id or Invoice No<h1>");
          return;
  
        })
      }
      
    }
    else{

      Invoice.find({InvoiceNo:req.params.id},(err,data)=>{
        if(err){
          res.send("Err :"+err);
        }
        if (data.length>0) {
          res.send(data);
          return;
        }
        res.send("<h1>Invliad Id or Invoice No<h1>");
        return;

      })
    }
    
   
  });
});
//method to insert invoice
router.route('/insert').post((req,res)=>{
   console.log(req.body.InvoiceNo);
  Invoice.create({
    InvoiceNo: req.body.InvoiceNo,
    image:  req.body.image,
    Manufacturer:  req.body.Manufacturer,
    class:  req.body.class,
    Sales_in_thousands: req.body.Sales_in_thousands,
    __year_resale_value:  req.body.__year_resale_value,
    Vehicle_type:  req.body.Vehicle_type,
    Price_in_thousands:  req.body.Price_in_thousands,
    Engine_size: req.body.Engine_size,
    Horsepower:  req.body.Horsepower,
    Wheelbase:  req.body.Wheelbase,
    Width:  req.body.Width,
    Length:  req.body.Length,
    Curb_weight: req.body.Curb_weight,
    Fuel_capacity:  req.body.Fuel_capacity,
    Fuel_efficiency: req.body.Fuel_efficiency,
    Latest_Launch: req.body.Latest_Launch,
    Power_perf_factor: req.body.Power_perf_factor,
  },(err,invoice)=>{
    if(err){
      res.send(err);
      return;
    }
    res.send(invoice);
  });
}) 
//method to delete the invoice by id or invoice no
router.route('/delete/:id').delete(async (req,res)=>{
  // console.log("delete")
  try{
    let resl=await Invoice.deleteOne({_id:req.params.id});
    console.log(resl.deletedCount);
    if(resl.deletedCount>0){
      res.send("<h1> Record Deleted Successfully</h1>");
      return;
    }
    
  }
  catch(err){
    try{
      let resl=await Invoice.deleteOne({InvoiceNo:req.params.id});
      if(resl.deletedCount>0){
        res.send("<h1> Record Deleted Successfully</h1>");
        return;
      }
      res.send("Invalid Id or Innvoice No");
      return;
    }
    catch(err){
      res.send(err);
    }
   
  }
 
})
//method to update the pirce and manufacture 
router.route('/update/:id').put(async (req,res)=>{
  // console.log("delete")
  try{
    let data={
      Manufacturer:req.body.Manufacturer,
      Price_in_thousands:Decimal128.fromString(req.body.Price_in_thousands)
    };
    let resl=await Invoice.findOneAndUpdate({_id:req.params.id},data);
  
    if(resl){
      res.send("<h1> Record Updated Successfully</h1>");
      return;
    }
    
  }
  catch(err){
    try{
      let data={
        Manufacturer:req.body.Manufacturer,
        Price_in_thousands:Decimal128.fromString(req.body.Price_in_thousands
          )
      };
      let resl=await Invoice.findOneAndUpdate({InvoiceNo:req.params.id},data);
      if(resl){
        res.send("<h1> Record Updated Successfully</h1>");
        return;
      }
      res.send("Invalid Id or Innvoice No");
      return;
    }
    catch(err){
      res.send(err);
    }
   
  }
 
})
router.route('/invoiceall/info').get(async (req,res)=>{
 
   Invoice.find({},{_id:0},(err,data)=>{
    if(err){
      res.render('error',{message:err});
      return;
    }
    // console.log(data);
    let result=data;
    res.render('alldata',{result:result});
  });
})
router.route('/form/create').get((req,res)=>{
  res.render('form',{title:"Add Invoice"})
})
router.route('/searchby/field').get((req,res)=>{
  res.render('searchby',{title:"Search"})
  return;
})
.post((req,res)=>{
  let query={}
   query[req.body.sortField]={ $regex: new RegExp(req.body.fieldVal, 'i') };
   
  console.log(query)

  Invoice.find(query,(err,data)=>{
    
    // console.log(data);
    if(err){
      res.render('error',{message:err})
      return
    }
    if(data.length>0){
      res.render('alldata',{result:data});
      return
    }
    res.send("No Record Found");
  })
  
})
//method to get invoice info

//method  to find document by id
async function findUsingIdOrInvoiceNo(id){
  try{
    let doc= await Car.findById({id});
        if(doc){
           
            return doc;
        }
         doc=Car.find({InvoiceNo:id})
         if(doc){
          return doc;
         }
  }
  catch(err){
    return undefined;
  }
}
module.exports = router;




// try{
//   let id=req.params.id;
//   console.log(id);
//   // checking for id
//   let doc=await Car.findById(id).exec();
//   if(doc){
//       res.send(doc);
//       return;
//   }
//    doc=Car.find({InvoiceNo:id})
//    if(doc){
//       res.send(doc);
//       return;
//    }
//    res.send(`<h1>No Record Found`);
// }
// catch(err){
//   res.send(`<h1>Error: ${err}}`);
// }  