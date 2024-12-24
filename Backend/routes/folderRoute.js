const express = require("express");
const router = express.Router();
const Folder = require('../schema/folderSchema');

router.get('/all/folders', async (req, res) => {
    try {
        const userId = req.params.id;
        
        const folders = await Folder.find({ owner: userId });
        res.status(200).json({ data: folders, message: 'Folders fetched successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/create/folder', async (req, res) => {
    try {
        const { name, userId } = req.body;

        await Folder.create({ name, owner: userId });
        res.status(200).send({ message: 'Folder created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router;