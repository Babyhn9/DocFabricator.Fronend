import { AuthorizeRequest } from "../Models/Requests/AuthorizeRequest";
import { RegisterRequest } from "../Models/Requests/RegisterRequest";
import { AuthorizeResponce } from "../Models/Responces/AuthorizeResponce";
import { RegisterResponce } from "../Models/Responces/RegisterResponce";

export interface IAuthService { 
    Auth(request: AuthorizeRequest) : Promise<AuthorizeResponce>
    Register(requsett: RegisterRequest): Promise<RegisterResponce>
}