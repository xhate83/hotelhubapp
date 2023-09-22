import { ICity } from "../models/city.model";
import { IDocumentType, IGender } from "../models/reservation.model";
import { IRoomType } from "../models/room.model";
import { IState } from "../models/state.model";
import { ITax } from "../models/tax.model";
import { IUserType } from "../models/user.model";

export const USER_TYPES: IUserType[] = [
    {
        id: 'agency',
        value: 'Agencia'
    },
    {
        id: 'customer',
        value: 'Cliente'
    }
]

export const CITIES: ICity[] = [
    {
        id: 1,
        value: 'Mosquera'
    },
    {
        id: 2,
        value: 'Bogotá'
    },
    {
        id: 2,
        value: 'Medellin'
    },
    {
        id: 2,
        value: 'Cartagena'
    }
]

export const ROOM_TYPES: IRoomType[] = [
    {
        id: 'suite',
        value: 'Suite'
    },
    {
        id: 'juniorSuite',
        value: 'Junior suite'
    },
    {
        id: 'gran Suite',
        value: 'Gran suite'
    }
]

export const ROOM_STATES: IState[] = [
    {
        id: 'available',
        value: 'Disponible'
    },
    {
        id: 'unavailable',
        value: 'No Disponible'
    },
    {
        id: 'reserved',
        value: 'Reservado'
    }
]

export const HOTEL_STATES: IState[] = [
    {
        id: 'available',
        value: 'Disponible'
    },
    {
        id: 'unavailable',
        value: 'No Disponible'
    }
]

export const TAXES: ITax[] = [
    {
        id: 1,
        value: 'IVA',
        description: 'Impuesto sobre la venta',
        percentage: 0.12
    },
    {
        id: 2,
        value: 'ICA',
        description: 'Impuesto de yndustria y comercio',
        percentage: 0.30
    },
    {
        id: 3,
        value: 'IMU',
        description: 'Impuesto municipal',
        percentage: 0.05
    },
]

export const GENDER: IGender[] = [
    {
        id: 1,
        value: 'Femenino',
    },
    {
        id: 2,
        value: 'Masculino',
    },
    {
        id: 3,
        value: 'Indefinido',
    },
]

export const DOCUMENT_TYPES: IDocumentType[] = [
    {
        id: 1,
        value: 'Cédula de ciudadania'
    },
    {
        id: 2,
        value: 'Cédula de extranjería'
    },
    {
        id: 3,
        value: 'Pasaporte'
    }
]