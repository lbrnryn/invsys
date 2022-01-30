const Brand = require('../models/brand');

// Get All Brands
exports.getBrands = async (req, res, next) => {
  const brands = await Brand.find().sort({ name: 'asc' }).lean();
  const brandsCount = await Brand.count();

  res.render('brands', { brands, brandsCount });
}

// Add a Brand
exports.addBrand = (req, res, next) => {
  const { brandname } = req.body;

  const brand = new Brand({
    name: brandname
  });

  brand.save((err, brand) => {
    if (err) { console.log(err.message); }
    // console.log(brand);
    res.redirect('/brands');
  })
}

// Get Single Brand
exports.getBrand = async (req, res, next) => {
  // console.log(req.params.id)
  const result = await Brand.findById({ _id: req.params.id }).lean();
  // // console.log(result);
  res.json(result);
}

// Edit Single Brand
exports.updateBrand = async (req, res, next) => {
  const { brandname } = req.body;

  let brand = {
    name: brandname
  }

  Brand.findByIdAndUpdate({ _id: req.params.id }, brand, (err, brand) => {
    if (err) { console.log(err.message) }
    // console.log(brand);
    res.redirect('/brands');
  })
}

// Delete Single Brand
exports.deleteBrand = async (req, res, next) => {
  // console.log(req.params.id)
  await Brand.findByIdAndDelete({ _id: req.params.id });
}