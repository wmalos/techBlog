const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        comment_body:{
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

module.exports = Comment;