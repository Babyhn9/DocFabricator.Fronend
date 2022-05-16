import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../redux/store";
import { IService } from "../services/service";
import { INonTokenService } from "../services/Interfaces/INonTokenService"
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { User } from "../utils/testData.";
export { useSelector } from "react-redux"

export function useService<T extends IService>(c: new() => T) : T {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const service = new c();

    service.LogOut = () => {
        dispatch(setUser(new User()))
        navigate('/auth')
    } 

    var token = useAppSelector(state => state.userReducer.user.token)

    service.Token = token

    return service;

}