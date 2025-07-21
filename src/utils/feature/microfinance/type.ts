import {  DocumenetResponse } from "../document/type"

export interface MicrofinanceResponse {
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
    Documents?:Array<DocumenetResponse>

}
