import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { setUser } from '../../redux/userSlice'
import { Paths } from '../../utils/Pats'
import { User } from '../../utils/testData.'
import './style.css'


export function ControlPanel() {
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleExitAction = () => {
        dispatch(setUser(new User()))       
        //navigate(Paths.authorize) 
    }
    return (
        <div className='controll__'>
            <nav className="controll__nav">
                <div className="controll__item">
                    <div>
                        <NavLink to='/'>Главна</NavLink>
                    </div>
                </div>
                <div className="controll__item">
                    <div>
                        <NavLink to ='/editor'>Редактор</NavLink>
                    </div>
                </div>
                <div className="controll__item">
                    <div>
                        <NavLink to='/templates'>Мои шаблоны</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

function Comment(){
    /*
    <div className='controll__item'>
                    <Link  to={Paths.newTemplate}>Создать новый шаблон</Link>
                </div>

                <div className='controll__item'>
                    <Link  to={Paths.allTemplates}>Список шаблонов</Link>
                </div>

                <div className='controll__item' >
                    <Button type='primary' onClick={ handleExitAction } > Выйти </Button>
                </div>*/
}