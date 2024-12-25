const express = require('express');
const router = express.Router();
const File = require('../schema/fileSchema');
const Folder = require('../schema/folderSchema');

router.post('/create/file', async (req, res) => {
    try {
        const { name, folderId, userId } = req.body;

        let folder;
        
        if (folderId) {
            // Check if the folder exists
            folder = await Folder.findById(folderId);
            if (!folder) {
                return res.status(404).json({ error: 'Folder not found' });
            }
        } else {
            // If folderId is not provided, create a new folder
            folder = await Folder.create({ folderName: 'NO_FOLDER_PROVIDED', owner: userId });
        }

        // Create the file
        const file = await File.create({ fileName: name, folder: folder._id });

        // If folder was created, add the file to the folder's files array
        if (!folderId) {
            folder.files.push(file._id);
            await folder.save();
        }

        res.status(200).json({ file, folder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
