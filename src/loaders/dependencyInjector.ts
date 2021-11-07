import { Sequelize } from "sequelize/types"
import { registerUserModel } from "../models/user"

export default ({ sequelize }: { sequelize: Sequelize }) => {
    try {
        registerUserModel(sequelize);
    } catch (error) {
        throw error;
    }
}