const Category = require("../models/Category");
const Tag=require("../models/Category");
//create tag handler function
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCatagory= async (req,res) =>{
  try {
    console.log("inside createCategory");
    const {name,description}=req.body;
    if(!name || !description){
      return res.status(400).json({
        success:false,
        message:'All fields are required',
      })
    }
    //create entry in database
    const categoryDetails=await Category.create({
      name:name,
      description:description,
    });
    console.log(categoryDetails);
    return res.status(200).json({
      success:true,
      message:"Category created successfully"
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}
//get all tags
exports.showallCategory= async(req,res)=>{
  try {
    const allTags=await Category.find({},{name: true,description: true});
    return res.status(200).json({
      success:true,
      message:"All tags sent successfully",
      data:allTags,
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}
//categoryPage details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID:"+categoryId);
    
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId).populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      }).exec()
      console.log("Selected Category:" ,selectedCategory );
      console.log("Selected Category Negation:",!selectedCategory);
      
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec()
      //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}