const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        post_title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    },

    {
        sequelize,
    }

);

module.exports = Post;