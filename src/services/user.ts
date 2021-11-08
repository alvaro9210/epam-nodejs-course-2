import Sequelize from 'sequelize';
import { Service } from 'typedi';
import { IUserDTO } from '../interfaces/IUser';
import { User } from '../models/user';

@Service()
export default class UserService {

    // Returns a list of users matching a specific substring in the 
    // login property. Works as the autosuggest feature but using 
    // Sequelize for that.
    getAll = async (loginSubstring = '', limit?: number): Promise<User[]> => await User.findAll({
        where: {
            login: {
                [Sequelize.Op.substring]: loginSubstring
            }
        },
        order: [['id', 'ASC']],
        ...(limit != undefined && { limit: Number(limit) })
    });

    get = async (id: string): Promise<User | null> => await User.findByPk(id);

    create = async (newUser: IUserDTO): Promise<User> => await User.create({
        ...newUser,
        isDeleted: false
    });

    update = async (id: string, updatedUser: IUserDTO): Promise<User | undefined> => {
        const user: User | null = await this.get(id);
        user?.set({
            ...updatedUser
        });
        return user?.save();
    }

    delete = async (id: string): Promise<User | undefined> => {
        const user: User | null = await this.get(id);
        user?.set({
            "isDeleted": true
        });
        return user?.save();
    }
}