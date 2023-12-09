const techSpecsModel = require('../models/techSpecsModel')

const techSpecsController = {
    createTechSpec: async (req,res) => {
        const newTechSpec = new techSpecsModel(req.body);
        try {
            await newTechSpec.save()
            res.status(200).json("create success")
        } catch (error) {
            console.log(error);
        }
    },
    getTechSpecs: async (req, res) => {
        try {
            const productId = req.query.productId;
            let techSpecs;
            if (productId) {
                techSpecs = await techSpecsModel.find({ productId: productId });
            } else {
                techSpecs = await techSpecsModel.find();
            }
            res.status(200).json(techSpecs);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "error " });
        }
    },
    
    updateTechSpecs: async(req,res) => {
        try {
            const update = req.body;
            const techSpecId = req.params.id;
            const updatedTechSpec = await techSpecsModel.findByIdAndUpdate(techSpecId, update, { new: true });
            if (!updatedTechSpec) {
                return res.status(404).json({ message: "no find techSpecs" });
            }
            res.status(200).json({ message: "update success", updatedTechSpec });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "error update" });
        }
    },
    deleteTechSpec: async (req, res) => {
        try {
            const techSpecId = req.params.id;
            const deletedTechSpec = await techSpecsModel.findByIdAndDelete(techSpecId);
            if (!deletedTechSpec) {
                return res.status(404).json({ message: "no find techSpecs" });
            }
            res.status(200).json({ message: "delete success" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "error delete" });
        }
    }
}
module.exports  = techSpecsController