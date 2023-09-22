import { ICity } from "./city.model";
import { IState } from "./state.model";
import { ITax } from "./tax.model";

export interface IRoom {
    id: number;
    cost: number;
    description: string;
    state: IState;
    taxes: ITax[],
    type: IRoomType;
    ubication: ICity;
}

export interface IRoomType {
    id: string;
    value: string;
}