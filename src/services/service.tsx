import axios, { AxiosInstance } from "axios"
import { useNavigate } from "react-router-dom"
const url:string = 'http://localhost:5210'


export interface IService {
    Token: string
    LogOut(): void
}
export class Service implements IService {
    Token = ''
    LogOut = () => {}
    protected CreateService(): AxiosInstance {
        const axClient = axios.create({
            baseURL: url, 
            headers: {
                Token:this.Token
            },
        })

        return axClient
    }

    protected Post(url: string, request: any) {
        return this.WhitLogOutError(this.CreateService().post(url, request)
            .then(res => res.data))
    }

    protected Get(url: string, request: any) {
        return this.WhitLogOutError(this.CreateService().get(url, request)
            .then(res => res.data));
    }

    protected WhitLogOutError<T>( exec: Promise<T>) : Promise<T>  {
        exec.catch(err => {
            if(err.request.status == 401) {
                alert('Ошибка авторизации. Повторите вход')
                this.LogOut();
            }
        })
        return exec;
    }
}