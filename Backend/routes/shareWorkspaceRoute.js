const express = require('express');
const router = express.Router();
const Workspace = require('../schema/shareWorkspaceSchema');
const User = require('../schema/userSchema');

router.post('/share-url', async (req, res) => {
    try {
        const { ownerId, emailId, permission, ownerName } = req.body;

        const workspace = await Workspace.findOne({ ownerId });

        if (emailId) {
            if (workspace) {
                const user = await User.findOne({ email: emailId });

                const existingUser = workspace.accessSettings.find(elem => {
                    return elem.userId.toString() === user._id.toString();
                });

                if (existingUser) {
                    existingUser.permission = permission;
                    await workspace.save();
                } else {
                    workspace.accessSettings.push({
                        userId: user._id,
                        permission
                    });
                    await workspace.save();
                }

            } else {
                const user = await User.findOne({ email: emailId });

                await Workspace.create({
                    ownerId,
                    ownerName,
                    accessSettings: [{
                        userId: user._id,
                        permission: permission
                    }]
                })
            }

            res.status(200).json({ message: "Shared successfully" });
        } else {
            const users = await User.find({});

            const modifiedUsers = users.map((user) => ({
                userId: user._id,
                permission
            }))

            const filteredUsers = modifiedUsers.filter(user => user.userId.toString() !== ownerId);

            if (workspace) {
                workspace.accessSettings = filteredUsers;
                await workspace.save();
            } else {
                await Workspace.create({
                    ownerId,
                    ownerName,
                    accessSettings: filteredUsers
                });
            }

            res.status(200).json({ message: "Shared successfully" });
        }

    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
})

router.get('/all-workspace', async (req, res) => {
    try {
        const { ownerId } = req.query;

        const workspaces = await Workspace.find({});

        if (!workspaces) {
            res.status(400).json({ message: "No workspaces found" });
        }

        const allWorkspaceOwnerData =[];

        workspaces.map((workspace) => {
            const isOwnerIdPresentInWorkspace = workspace.accessSettings.find(elem => elem.userId.toString() === ownerId);
            
            if(isOwnerIdPresentInWorkspace) {
                allWorkspaceOwnerData.push({
                    ownerId: workspace.ownerId,
                    ownerName: workspace.ownerName
                })
            }
        })

        res.status(200).json({ data: allWorkspaceOwnerData, message: 'success' })

    } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error)

    }
})

module.exports = router;