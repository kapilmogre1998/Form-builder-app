const express = require("express");
const router = express.Router();
const Folder = require('../schema/folderSchema');
// const Form = require('../schema/fileSchema');

router.get('/all/folders', async (req, res) => {
    try {
        const userId = req.query.id;
        
        if(!userId){
            console.log(userId);
            return res.status(400).json('UserId is not present.')
        }

        const folders = await Folder.find({ owner: userId })

        if (!folders.length){
            return res.status(200).json({ message: 'No folders found.', data: [] })
        }

        res.status(200).json({ data: folders, message: 'Folders fetched successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/create/folder', async (req, res) => {
    try {
        const { folderName, userId } = req.body;

        const folderExists = await Folder.findOne({ folderName, owner: userId })

        if(folderExists){
            return res.status(200).json({ message: 'Folder already exists' })
        }

        await Folder.create({ folderName, owner: userId });

        res.status(200).send({ message: 'Folder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.post('/delete/folder', async (req, res) => {
    try {
        const { userId, folderId } = req.body;

        const folderExists = await Folder.findOne({ _id: folderId, owner: userId })

        if(!folderExists){
            return res.status(400).json({ message: `Folder doesn't exists.` })
        }

        // Delete the folder
        const result = await Folder.deleteOne({ _id: folderId, owner: userId });

        // Check if deletion was successful
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "Folder could not be deleted." });
        }

        res.status(200).send({ message: 'Folder is deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.post('/create/form', async (req, res) => {
    const { name, folderId, userId } = req.body;

    try {   
        let folder;

        if (folderId) {
            // Find the folder by ID if provided
            folder = await Folder.findById(folderId);

            if (!folder) {
                return res.status(400).json({ message: 'Folder does not exist.' });
            }
        } else {
            const findFolder = await Folder.findOne({ folderId, owner: userId })

            if(findFolder){
                folder = findFolder;
            } else {
                const createFolder = await Folder.create({ folderName: 'NO_FOLDER', owner: userId })
                folder = createFolder;
            }
        }

        const existingForm = folder.forms.find(form => form.formName === name);
        console.log("🚀 ~ router.post ~ existingForm:", existingForm, folder)

        if (existingForm) {
            return res.status(200).json({ message: 'Form name already exists' });
        }

        // Push the form's ID to the folder's forms array
        folder.forms.push({
            formName: name,
            owner: userId,
            createdAt: new Date()
        });

        await folder.save();

        res.status(200).json({ message: 'Form added successfully' });
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        res.status(500).json({ message: "Something went wrong" })
    }
})  

router.post('/delete/form', async(req, res) => {
    try {
        const { formId, folderId, userId } = req.body;

        const folder = await Folder.findOne({_id: folderId, owner: userId});

        if(!folder){
            return res.status(400).json({ message: 'Folder does not exist.' });
        }

        folder.forms = folder.forms.filter(form => form._id.toString() !== formId);

        // Save the updated folder document
        await folder.save();

        res.status(200).send({ message: 'Folder is deleted successfully' })
    }  catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router;