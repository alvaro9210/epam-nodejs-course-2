import { Service } from 'typedi';
import { User } from '../models/user';

@Service()
export default class UserService {

    async getAllUsers(): Promise<User[]> {
        const users = await User.findAll();
        users.forEach((user: User) => console.log(user.login));

        return users;
    }
}