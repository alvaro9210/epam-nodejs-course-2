import { Sequelize, DataTypes, Model, ModelAttributes } from 'sequelize';

const userModel: ModelAttributes = {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            min: 4,
            max: 130
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
};

export class User extends Model { }

export const registerUserModel = (sequelize: Sequelize) => User.init(userModel, {
    sequelize: sequelize,
    modelName: 'User'
});