import { User } from './User';
import { Location } from './Location';

export interface Trip {
    _id: string;
    name: string;
    image: string;
    creator: User;
    participants: User[];
    administrators: string[];
    startDate: string;
    endDate: string;
    location: Location;
}
