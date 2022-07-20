import { NavLink, Route } from 'react-router-dom';
import { RequireAuth } from '../Hocs/RequreAuth'
import './style.css'
function EditorComponent(){
    return (
        <div>
            Редактор
        </div>
    )
}
export const Editor = RequireAuth(EditorComponent);