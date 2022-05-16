import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export const RequireAuth = (Component: React.FunctionComponent) => 
()=> <WrappedComponent Component={Component}/>

type WrappedComponentProprs = {
    Component: React.FunctionComponent
}
const WrappedComponent = ({Component}: WrappedComponentProprs) => {
    let user = useAppSelector(state => state.userReducer.user);
    if(user.token == "")
        return <div><Navigate to= '/auth'/></div>
        else    
            return <>{<Component/>}</>
}

