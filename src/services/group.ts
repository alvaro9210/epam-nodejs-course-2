import { Service } from 'typedi';
import { IGroupDTO } from '../interfaces/IGroup';
import { Group } from '../models/group';

@Service()
export default class GroupService {

    get = async (id: string): Promise<Group | null> => await Group.findByPk(id);

    getAll = async (): Promise<Group[]> => await Group.findAll();

    create = async (newGroup: IGroupDTO): Promise<Group> => await Group.create({
        ...newGroup
    });

    update = async (id: string, updatedGroup: IGroupDTO): Promise<Group | undefined> => {
        const group: Group | null = await this.get(id);
        group?.set({
            ...updatedGroup
        });
        return group?.save();
    }

    delete = async (id: string): Promise<void> => {
        const group: Group | null = await this.get(id);
        return group?.destroy();
    }
}