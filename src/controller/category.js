const Category = require("../models/category");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

// to make the subcategories and categories listing in accordance to parent and children
function createCategories(category, parentId = null) {
  const categoryList = [];
  let categories;
  if (parentId == null) {
    categories = category.filter((x) => x.parentId == undefined);
  } else {
    categories = category.filter((x) => x.parentId == parentId);
  }
  for (let cate of categories) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(category, cate._id),
    });
  }
  return categoryList;
}
// to add the category
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
// to list category 
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, category) => {
    if (err) return res.status(400).json({ err: err });
    if (category) {
      const categoryList = createCategories(category);
      res.status(200).json({ categoryList });
    }
  });
};
