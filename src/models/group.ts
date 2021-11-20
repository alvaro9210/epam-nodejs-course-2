import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const groupModel: Sequelize.ModelAttributes = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
};

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export class Group extends Sequelize.Model {
    public id: string | undefined;
    public name: string | undefined;
    public permissions: Array<Permission> | undefined;
}

export const registerGroupModel = (sequelize: Sequelize.Sequelize) => Group.init(groupModel, {
    sequelize: sequelize,
    modelName: 'groups',
    timestamps: false
});