const express = require("express");
const router = express.Router();
const Folder = require('../schema/folderSchema');
const File = require('../schema/fileSchema');

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

router.post('/create/file', async (req, res) => {
    const { name, folderId, userId } = req.body;

    try {
        // Find the folder by ID
        const folder = await Folder.findById(folderId);
        console.log(folder, 'folder')
        if (!folder) {
            return res.status(400).json({ message: 'Folder does not exist.' });
        }

        // Create a new File document
        const file = await File.create({ fileName: name, folder: folderId, owner: userId });

        // Push the file's ID to the folder's files array
        folder.files.push({
            fileName: name,
            fileId: file._id,
            owner: userId,
            createdAt: new Date()
        });
        await folder.save();

        res.status(200).json({ message: 'File added successfully' });
    } catch (error) {
        console.error(error);
    }
})  

router.post('/create/folder', async (req, res) => {
    try {
        const { folderName, userId } = req.body;

        const folderExists = await Folder.findOne({ folderName, owner: userId })

        if(folderExists){
            return res.status(400).json({ message: 'Folder already exists.' })
        }

        const data = await Folder.create({ folderName, owner: userId });
        console.log("🚀 ~ router.post ~ data:", data)
        res.status(200).send({ message: 'Folder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router;