import { Service } from 'typedi';
import { User } from '../models/user';

@Service()
export default class UserService {

    getAllUsers = async (): Promise<User[]> => await User.findAll();

    getUser = async (id: string): Promise<User | null> => await User.findByPk(id);

}