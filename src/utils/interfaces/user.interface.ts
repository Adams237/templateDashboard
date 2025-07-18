import { DocumenetRequest } from "../feature/document/type";

export interface LoginInterface {
    email: string;
    password: string;
}

export interface UserInterface {
    user_id: string
    name: string
    email: string,
    phone_number: string,
    profile_picture: string,
    status: string,
    created_at: string,
    updated_at: string,
    country:string,
    city:string,
    address:string,
    latitude:number,
    longitude:number,
    documents?:Array<DocumenetRequest>

}

export interface ClientInterface {
    name: string,
    neighborhood: string,
    location: {
        longitude: string,
        latitude: string
    },
    montant: number,
    paiementMethode: string
}