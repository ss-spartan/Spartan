const mongoose = require('mongoose');

const User = require('../schema/userSchema');

async function storeUsername(userId, username) {
    try {
        const existingUser = await User.findOne({ userId });

        if (existingUser) {
            existingUser.username = username;
            await existingUser.save();
        } else {
            const newUser = new User({ userId, username });
            await newUser.save();
        }
    } catch (error) {
        console.error('Error storing username:', error);
    }
}


async function getUsername(userId) {
    try {
        const user = await User.findOne({ userId });
        if (user) {
            return user.username;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving username:', error);
        return null;
    }
}


module.exports = { storeUsername, getUsername };
