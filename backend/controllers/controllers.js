import Category from "../models/category.js";
import HowTo from "../models/howTo.js";

export const add_category = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.json(err.message);
  }
};
export const get_category = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('howTo', {strictPopulate:false}); // Populate the 'howTo' field

    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); // Handle not found case
    }

    res.status(200).json(category);
  } catch (err) {
    // console.error(err); // Log the error for debugging
   // res.status(500).json({ message: 'Internal server error' }); // Handle internal errors generically
   res.json(err.message)
  }
};

// export const get_category = async (req, res) => {
//   try {
//     const category = await Category.findOne({ slug: req.params.slug });
//     const howTo = await Category.findOne({ slug: req.params.slug }).populate(
//      'howTo');
//     res.status(200).json({ category });
//   } catch (err) {
//     res.status(404).json(err.message);
//   }
// };
export const get_categories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const update_category = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.status(201).json(category);
  } catch (err) {
    res.json(err.message);
  }
};
export const delete_category = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ slug: req.params.slug });
    res.status(201).json(category);
  } catch (err) {
    res.json(err.message);
  }
};

export const add_how_to = async (req, res) => {
  try {
    const howTo = await HowTo.create(req.body);
    const category = await Category.findOne({ slug: req.params.slug });
    category.howTo.push(howTo);
    category.save();
    res.status(201).json(howTo);
  } catch (err) {
    res.status(303).json(err.message);
  }
};
export const get_how_to = async (req, res) => {
  try {
    const howTo = await HowTo.findOne({ slug: req.params.slug });
    res.status(200).json(howTo);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
export const get_how_tos = async (req, res) => {
  try {
    const howTos = await HowTo.find()
    res.status(200).json(howTos);
  } catch (err) {
    res.status(404).json(err.message);
  }
};;
export const update_how_to = async (req, res) => {
  try {
    const howTo = await HowTo.findOneAndUpdate({ slug: req.params.slug }, req.body, {new:true});
    res.status(201).json(howTo);
  } catch (err) {
    res.statu(303).json(err.message);
  }
};

export const delete_how_to = async (req, res) => {
  try {
    const howTo = await HowTo.findOneAndDelete({ slug: req.params.slug });
    res.status(201).json(howTo);
  } catch (err) {
    res.statu(303).json(err.message);
  }
};
