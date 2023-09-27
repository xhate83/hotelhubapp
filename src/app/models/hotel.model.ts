import { IRoom } from "./room.model";
import { IState } from "./state.model";

export interface IHotel {
    id: number;
    name: string;
    createdBy: string;
    state: IState;
    rooms?: IRoom[];
    
}


