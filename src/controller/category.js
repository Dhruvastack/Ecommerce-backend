const Category = require("../models/category");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
exports.addcategory = (req, res) => {
  const categoryobj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryobj.parentId = req.body.parentId;
  }
  const categories = new Category(categoryobj);
  categories.save((err, category) => {
    if (err) return res.status(400).json({ err: err });
    if (category) {
      return res.status(200).json({ category: category });
    }
  });
};
exports.getCategories =(req, res) => {
    Category.find({}).exec((err, category) => {
        if(err) return res.status(400).json({ err: err });
        if(category) {
            res.status(200).json({ category: category})
        }
    })
}