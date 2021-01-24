const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {   modelName: 'comment',
        sequelize,
        freezeTableName: true,
        underscored: true,
    }
    );
    
module.exports = Comment;
    