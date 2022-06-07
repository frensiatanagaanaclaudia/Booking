const Item = require("../models/Item");
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  createBooking: async (req, res) => {
    try {
      const {
        itemId,
        itemBooked,
        bookingStartDate,
        bookingEndDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        bankFrom,
        accountHolder,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image Not Found" });
      }
      if (
        itemId === undefined ||
        itemBooked === undefined ||
        bookingStartDate === undefined ||
        bookingEndDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phoneNumber === undefined ||
        bankFrom === undefined ||
        accountHolder === undefined
      ) {
        await fs.unlink(path.join(`public/images/${req.file.filename}`));
        return res.status(400).json({ message: "Please Input All Data" });
      }
      const item = await Item.findOne({ _id: itemId });
      if (!item) {
        await fs.unlink(path.join(`public/images/${req.file.filename}`));
        return res.status(400).json({ message: "Item not found" });
      }
      let total = item.itemPrice * itemBooked;
      let tax = total * 0.1;

      const invoice = Math.floor(10000000 + Math.random() * 900000);

      const customer = await Customer.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      const newBooking = {
        invoice,
        bookingStartDate,
        bookingEndDate,
        total: (total += tax),
        item: {
          _id: item.id,
          name: item.itemName,
          price: item.itemPrice,
          booked: itemBooked,
        },
        customer: customer.id,
        payments: {
          proofPayment: `images/${req.file.filename}`,
          bankFrom: bankFrom,
          accountHolder: accountHolder,
        },
      };
      const booking = await Booking.create(newBooking);
      res.status(201).json({ message: " Success Booking ", booking });
    } catch (err) {
      if (req.file) {
        await fs.unlink(path.join(`public/images/${req.file.filename}`));
      }
      res.status(500).json({ message: err.message });
    }
  },
  viewBooking: async (req, res) => {
    try {
      const booking = await Booking.find();
      booking.length === 0
        ? res.status(404).json({ message: "No data Booking found" })
        : res.status(200).json(booking);
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  showDetailBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findOne({ _id: id }).populate("customer");
      booking.length === 0
        ? res.status(404).json({ message: "No data Booking found" })
        : res.status(200).json(booking);
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  actionReject: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await Booking.findOne({ _id: id });
      if (booking.payments.status == "Reject") {
        return res.status(403).json({ message: "Booking Order Already Reject" });
      }
      if (booking.payments.status == "Accept") {
        return res.status(403).json({ message: "Booking Order Already Accept" });
      }
      booking.payments.status = "Reject";
      booking.proofBy = req.user._id;
      await booking.save();
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  actionAccept: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await Booking.findOne({ _id: id });
      const {
        item: { _id, booked },
      } = booking;
      const item = await Item.findOne({ _id: _id });

      if (booking.payments.status == "Reject") {
        return res.status(403).json({ message: "Booking Order Already Reject" });
      }
      if (booking.payments.status == "Accept") {
       return res.status(403).json({ message: "Booking Order Already Accept" });
      }
      item.sumBooked += parseInt(booked);
      booking.payments.status = "Accept";
      booking.proofBy = req.user._id;
      await item.save();
      await booking.save();
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findOne({ _id: id });
      if (!booking){
        return res.status(404).json({message:"No Data Booking Found"})
      }
    const { payments : {status,proofPayment}}=booking;
    if(status != "Proses"){
      return res.status(404).json({message:"Only can delete booking with status Proses" })
    }
    await booking.remove().then(()=>
      fs.unlink(path.join(`public/${proofPayment}`)))
      res.status(200).json({message:"Booking Deleted"});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
