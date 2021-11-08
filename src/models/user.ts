import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const userModel: Sequelize.ModelAttributes = {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
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

export class User extends Sequelize.Model {
    public id: string | undefined;
    public login: string | undefined;
    public password: string | undefined;
    public age: number | undefined;
    public isDeleted: boolean | undefined;
}

export const registerUserModel = (sequelize: Sequelize.Sequelize) => User.init(userModel, {
    sequelize: sequelize,
    modelName: 'user',
    timestamps: false
});