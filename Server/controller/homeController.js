const Bank = require("../models/Bank");
const Category = require("../models/Category");
const Item = require("../models/Item");
const Info = require("../models/Info");

module.exports = {
  homePage: async (req, res) => {
    try {
      //tarik data item paling laris berdasarkan sumbooked
      const hotItem = await Item.find()
        .select(
          "_id itemName location itemPrice unit ImageId sumbooked isPopular"
        )
        .limit(5)
        .populate({
          path: "image",
          select: "_id imageUrl",
          option: { sort: { sumbooked: -1 } },
        });
        const categoryList = await Category.find({$where : "this.item.length > 0",}).limit(3).populate({path: "item",
        select: "_id itemName location itemPrice unit imageId isPopular",perDocumentLimit : 4,
        option : {sort: {sumbooked:-1}},
      populate : {
        path : "image",
        perDocumentLimit : 1,
      },});
      const testimony = await Info.find({
        type: "Testimony",
        isHighlight: true,
      }).select("_id infoName type imageUrl description item").limit(3).populate({
        path : "item",
        select : "_id itemName location"
      });

      const Hotel = await Category.find({ categoryName: "Hotel" });
      const Apartement = await Category.find({ categoryName: "Apartement" });
      const Villa = await Category.find({ categoryName: "Villa" });
      const Tour =await Category.find({categoryName:"Tour Packages"});
      const SumHotel = Hotel.reduce(
        (count, current) => count + current.item.length,
        0
      );
      const SumApartement = Apartement.reduce(
        (count, current) => count + current.item.length,
        0
      );
      const SumVilla = Villa.reduce(
        (count, current) => count + current.item.length,
        0
      );
      const SumTour = Tour.reduce(
        (count, current) => count + current.item.length,
        0
      );
      res.status(200).json({
        summaryInfo: {
          sumhotel: SumHotel,
          sumapartement: SumApartement,
          sumVilla: SumVilla,
          sumtour: SumTour,
        },
        hotItem,categoryList,testimony
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({_id:id})
        .populate({ path: "category", select: "id categoryName" })
        .populate({ path: "image", select: "id imageUrl" })
        .populate({ path: "info",match:{type:{$in:['NearBy','Testimony']}}})
        .populate({ path: "feature"});
     const bank = await Bank.find();
     res.status(200).json({
       ...item._doc,bank})
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
