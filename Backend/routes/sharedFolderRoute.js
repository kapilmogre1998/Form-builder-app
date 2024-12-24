const express = require('express');
const router = express.Router();
const sharedFolder = require('../schema/sharedFolderSchema');
const folderSchema = require('../schema/folderSchema');

router.get('/all/shared-folders', async (req, res) => {
    
    try {
        const sharedFolders = await sharedFolder.find();
        res.status(200).json(sharedFolders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;