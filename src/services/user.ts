import { Service } from 'typedi';
import { IUserDTO } from '../interfaces/IUser';
import { User } from '../models/user';

@Service()
export default class UserService {

    getAllUsers = async (): Promise<User[]> => await User.findAll();

    getUser = async (id: string): Promise<User | null> => await User.findByPk(id);

    createUser = async (newUser: IUserDTO): Promise<User> => await User.create({
        ...newUser,
        isDeleted: false
    });

    updateUser = async (id: string, updatedUser: IUserDTO): Promise<User | undefined> => {
        const user: User | null = await this.getUser(id);
        user?.set({
            ...updatedUser
        });
        return user?.save();
    }
}