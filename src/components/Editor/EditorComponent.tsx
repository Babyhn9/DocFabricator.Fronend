import { RequireAuth } from '../Hocs/RequreAuth'
import './style.css'
function EditorComponent(){
    return (
        <div>
            Outlock
        </div>
    )
}
export const Editor = RequireAuth(EditorComponent);