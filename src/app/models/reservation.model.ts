import { IHotel } from "./hotel.model";
import { IRoom } from "./room.model";
import { ITax } from "./tax.model";

export interface IReservation {
    id: number;
    createdBy: string;
    dateStart: Date | string;
    dateEnd: Date | string;
    guests: IReservationGuest[];
    emergencyContact: IEmergencyContact;
    hotelId: number;
    roomId: number;
    hotel?: IHotel;
    room?: IRoom;
    taxes?: ITax[];
    totalPrice: number;
}

export interface IReservationGuest {
    fullName: string;
    birthDate: Date | string;
    gender: IGender;
    documentType: IDocumentType;
    documentNumber: string;
    email: string;
    phoneNumber: string;
}

export interface IEmergencyContact {
    fullName: string;
    contactPhone: string;
}


export interface IGender {
    id: number;
    value: string;
}

export interface IDocumentType  {
    id: number;
    value: string;
}