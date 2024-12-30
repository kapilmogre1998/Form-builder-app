const express = require('express');
const router = express.Router();
const Form = require('../schema/formSchema');

router.get('/get/form-bot/:formBotId', async (req, res) => {
    try {
        const formBotId = req.params.formBotId;

        if(!formBotId){
            return res.status(400).send("Please provide a valid form bot id");
        }

        const form = await Form.findById(formBotId);

        if(!form){
            return res.status(400).send("No such form exists");
        }

        return res.status(200).json({ data: form.elements, message: 'success' });
    } catch (error) {

    }
})

router.post('/store/form-bot', async (req, res) => {
    try {
        const { formBotId } = req.body;

        if(!formBotId){
            return res.status(400).send("Please provide a valid form bot id");
        }

        const form = await Form.findByIdAndUpdate(formBotId, { elements: req.body.elements });

        if(!form){
            return res.status(400).send("No such form exists");
        }

        return res.status(200).json({ message: "successfully submitted" });

    } catch (error) {
        
    }
})

module.exports = router;