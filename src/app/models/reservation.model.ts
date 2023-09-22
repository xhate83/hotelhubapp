export interface IReservation {
    id: number;
    createdBy: string;
    dateStart: string;
    dateEnd: string;
    guest: IReservationGuest[];
    emergecyContact: IEmergencyContact
}

export interface IReservationGuest {
    fullName: string;
    birthDay: string;
    gender: IGender;
    documentType: IDocumentType;
    documentNumber: string;
    email: string;
    cellphone: string;
}

export interface IEmergencyContact {
    name: string;
    cellphone: string;
}


export interface IGender {
    id: number;
    value: string;
}

export interface IDocumentType  {
    id: number;
    value: string;
}