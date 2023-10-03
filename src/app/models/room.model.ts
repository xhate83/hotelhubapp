import { ICity } from "./city.model";
import { IHotel } from "./hotel.model";
import { IReservation } from "./reservation.model";
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
    hotelId: number;
    hotel?: IHotel;
    reservations?: IReservation[];
    capacity: number;
}

export interface IRoomType {
    id: string;
    value: string;
}