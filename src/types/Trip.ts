import { User } from './User';
import { Location } from './Location';

export interface Trip {
    _id: string;
    name: string;
    image: string;
    creator: User;
    participants: User[];
    startDate: string;
    endDate: string;
    location: Location;
}
