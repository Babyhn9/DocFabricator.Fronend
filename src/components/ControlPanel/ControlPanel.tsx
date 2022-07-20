	import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { JsxElement } from 'typescript'
	import { useAppDispatch } from '../../redux/store'
	import { setUser } from '../../redux/userSlice'
	import { User } from '../../utils/testData.'
	import './style.css'


	export function ControlPanel() {
		
		const x = () => 5;
		const dispatch = useAppDispatch()

		const handleExitAction = () => {
				dispatch(setUser(new User()))       
				//navigate(Paths.authorize) 
		}
		return (
				<div className='controll__'>
						<nav className="controll__nav">
							<ControlPanelItem to='/' label='Главная'/>
							{
							//	<ControlPanelItem to='/editor' label  = 'Редактор'/>
							}
							<ControlPanelItem to='/templates' label='Мои шаблоны'/>
							<ControlPanelItem label='выход' clickAction={handleExitAction}/>
						</nav>
				</div>
		)
	}

	type ControlPanelItemProps = {
		label: string,
		to?:string,
		clickAction? : () => void
	}
	function ControlPanelItem({to, label, clickAction}: ControlPanelItemProps) {
		let x: ReactElement;

		if(clickAction == null)
			x = <NavLink to={to || ""}>{label}</NavLink>;
		else
			x = <button onClick={clickAction}>{label}</button>;

		return <div className="controll__item">
			<div className="image">
				
			</div>

			<div>
				{x}
			</div>
		</div>
	}