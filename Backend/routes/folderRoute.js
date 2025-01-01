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

        const folderList = await Folder.findOne({ owner: userId })
        console.log("🚀 ~ router.get ~ folderList:", folderList)

        if (!folderList){
            return res.status(200).json({ message: 'No folders found.', data: [] })
        }

        res.status(200).json({ data: folderList, message: 'Folders fetched successfully' })
    } catch (error) {
        console.log(error, 'fetach all');
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/create/folder', async (req, res) => {
    try {
        const { folderName, userId } = req.body;

        const folderExists = await Folder.findOne({ owner: userId, "folders.folderName": folderName  })

        if(folderExists){
            return res.status(200).json({ message: 'Folder already exists' })
        }

        await Folder.findOneAndUpdate(
            { owner: userId },
            { $addToSet: { folders: { folderName, forms: [] } } },
            { new: true, upsert: true }
        );

        res.status(200).send({ message: 'Folder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.post('/delete/folder', async (req, res) => {
    try {
        const { userId, folderId } = req.body;

        const folderExists = await Folder.findOne({ owner: userId, folders: { $elemMatch: { _id: folderId } }   })
        console.log("🚀 ~ router.post ~ folderExists:", folderExists)

        if(!folderExists){
            return res.status(400).json({ message: `Folder doesn't exists.` })
        }

        // Delete the folder
        const result = await Folder.updateOne(
            { owner: userId },
            { $pull: { folders: { _id: folderId } } }
        );

        // Check if deletion was successful
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "Folder could not be deleted." });
        }

        res.status(200).send({ message: 'Folder is deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.post('/create/new-form', async (req, res) => {
    const { name, folderId, userId, folderName = 'NO_FOLDER' } = req.body;

    try {   
        let folder;

        if (folderId) {
            // Find the folder by ID if provided
            folder = await Folder.findOne({ owner: userId, folders: { $elemMatch: { _id: folderId } }  });

            if (!folder) {
                return res.status(400).json({ message: 'Folder does not exist.' });
            }
        } else {
            const findFolder = await Folder.findOne({ owner: userId, folders: { $elemMatch: { _id: folderId } } })
            console.log("🚀 ~ router.post ~ findFolder:", findFolder)

            if(findFolder){
                folder = findFolder;
            } else {
                const createFolder = await Folder.findOneAndUpdate(
                    { owner: userId },
                    { $addToSet: { folders: { folderName, forms: [] } } },
                    { new: true, upsert: true }
                );
                folder = createFolder;
                console.log("🚀 ~ router.post ~ createFolder:", createFolder)
            }
        }

        const existingForm = folder.folders[0].forms.find(form => form.formName === name);

        if (existingForm) {
            return res.status(200).json({ message: 'Form name already exists' });
        }

        // Push the form's ID to the folder's forms array
        folder.folders[0].forms.push({
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