const express = require('express');
const router = express.Router();
const FormBot = require('../schema/formSchema');
const Folder = require('../schema/folderSchema');

router.post('/create/form-bot', async (req, res) => {
    try {
        const { folderId, formName, userId, list, formId } = req.body;

        const folder = await Folder.findById(folderId);

        if (!folder) {
            return res.status(200).json({ message: 'Folder not found' });
        }

        let formBot;

        formBot = await FormBot.findOne({ formId });

        if(formBot) {
            formBot.formName = formName;
            formBot.elements = list;

            await formBot.save();
        } else {
            formBot = await FormBot.create({
                folder: folderId,
                owner: userId,
                formName,
                formId,
                elements: list
            })
        }

        const formIndex = folder.forms.findIndex(form => form._id.toString() === formId);

        if (formIndex === -1) {
            return res.status(404).json({ message: 'Form not found in the folder' });
        }

        folder.forms[formIndex].formName = formName;

        await folder.save();

        res.status(200).json({ message: 'success', formBotId: formBot._id.toString() })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
})

router.get('/get/form-bot', async(req, res) => {
    try {
        const { folderId, formId } = req.query;

        const existingFolder = await Folder.findById(folderId);

        if (!existingFolder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        const formBot = await  FormBot.findOne({ formId });

        if (!formBot) {
            return res.status(200).json({ message: 'FormBot not found', data: {} });
        }

        res.status(200).json({ data: {elements: formBot.elements, formName: formBot.formName, formBotId: formBot._id.toString()}, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router;