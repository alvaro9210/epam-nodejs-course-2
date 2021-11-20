import { Sequelize } from "sequelize/types"
import { registerGroupModel } from "../models/group";
import { registerUserModel } from "../models/user"

export default ({ sequelize }: { sequelize: Sequelize }) => {
    try {
        registerUserModel(sequelize);
        registerGroupModel(sequelize);
    } catch (error) {
        throw error;
    }
}