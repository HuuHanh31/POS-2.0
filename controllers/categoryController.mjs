import Category from '../models/Category.mjs'

const categoryController = {
   getAllCategories: async (req, res) => {
      try {
         const categories = await Category.find()
         res.status(200).json({
            message: 'Get all categories successfully',
            data: categories
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   getCategory: async (req, res) => {
      try {
         const category = await Category.findById({ _id: req.params.id })
         if (!category)
            return res.status(404).json('Category is not exist')
         res.status(200).json({
            message: `Get categrory: ${category.type} successfully`,
            data: category
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   postCategory: async (req, res) => {
      try {
         const existCategory = await Category.findOne({ type: req.body.type })
         if (existCategory)
            return res.status(409).json('Category is exist')

         const newCategory = new Category({
            type: req.body.type,
            products: req.body.products
         })

         const category = await newCategory.save()
         res.status(200).json({
            message: `Add category: ${category.type} successfully`,
            data: category
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   putCategory: async (req, res) => {
      try {
         const category = await Category.findById({ _id: req.params.id })
         if (!category)
            return res.status(404).json('Category is not exist')

         category.type = req.body.type || category.type
         category.products = req.body.products || category.products

         await category.save()

         res.status(200).json({
            message: `Put category: ${category.type} successfully`,
            data: category
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   deleteCategory: async (req, res) => {
      try {
         await Category.deleteOne({ _id: req.params.id })
         res.status(200).json({
            message: 'Delete this category successfully'
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   postProduct: async (req, res) => {
      try {
         const category = await Category.findById({ _id: req.params.id })
         if (!category)
            return res.status(404).json('Category is not exist')

         category.products.push({
            'name': req.body.name,
            'price': req.body.price,
            'imgURL': req.body.imgURL
         })

         category.save()

         res.status(201).json({
            message: `Add product: ${req.body.name} successfully`,
            data: category
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   putProduct: async (req, res) => {
      try {
         const category = await Category.findById({ _id: req.params.id })
         if (!category)
            return res.status(404).json('Category is not exist')

         category.products.map((product) => {
            if (product.productId == req.params.productId) {
               product.name = req.body.name || product.name
               product.price = req.body.price || product.price
               product.imgURL = req.body.imgURL || product.imgURL
            }
         })

         category.save()

         res.status(200).json({
            message: `Put product: ${req.body.name}`,
            data: category
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   },

   deleteProduct: async (req, res) => {
      try {
         const newCategory = await Category.updateOne(
            { _id: req.params.id },
            {
               $pull:
                  { products: { productId: req.params.productId } }
            }
         )

         res.status(200).json({
            message: 'Delete that product successfully',
            data: newCategory
         })
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   }
}

export default categoryController