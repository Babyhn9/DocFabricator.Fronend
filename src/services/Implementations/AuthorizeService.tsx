import { AuthorizeRequest } from "../Models/Requests/AuthorizeRequest";
import { RegisterRequest } from "../Models/Requests/RegisterRequest";
import { AuthorizeResponce } from "../Models/Responces/AuthorizeResponce";
import { RegisterResponce } from "../Models/Responces/RegisterResponce";
import { IAuthService } from "../Interfaces/IAuthService";
import { INonTokenService as INonTokenService } from "../Interfaces/INonTokenService";
import { Service } from "../service";

export class AuthorizeService extends Service implements IAuthService, INonTokenService{
    
    Auth(request: AuthorizeRequest): Promise<AuthorizeResponce> 
    { 
        return this.Post('auth/signin', request);
    }
    
    Register(request: RegisterRequest): Promise<RegisterResponce> 
    {
        return this.Post('auth/signup', request);
    }
}