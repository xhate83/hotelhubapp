export interface IUser {
	email: string;
    password: string;
    type: IUserType;
}

export interface IUserType {
    id: string;
    value: string;
}