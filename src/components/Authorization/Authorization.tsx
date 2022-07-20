import { Button,Input, Checkbox } from "antd"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setUser } from '../../redux/userSlice'
import {  useAppDispatch } from "../../redux/store"
import "../../App.css"
import "./style.css"
import { useService } from "../../hooks/useService"
import { AuthorizeService } from "../../services/Implementations/AuthorizeService"
import { LocalStorageKeys, User } from "../../utils/testData."

enum SignType { In, Reg }

const selected = "selected"
const hidden = "hidden"


const getHiddenStatusFor = (component:number, signType: SignType, className: string ) => {
		if(component == 1 || component == 0) {
				switch(component) {
						case 0: return signType == SignType.In ? "" : className
						case 1: return signType == SignType.Reg ? "" : className
				}
		}

		return "";
}

export function Authorization() {

		const [sign, setSign] = useState(SignType.In)

		return <div className="auth-container">
				<div className="auth-body">
						<div className="auth-selection-mode">
								<Button type="dashed" className={` ${getHiddenStatusFor(0, sign, selected )}`} onClick={()=> setSign(SignType.In)}>Вход </Button>
								<Button type="dashed" className={`${getHiddenStatusFor(1, sign, selected )}`} onClick={()=> setSign(SignType.Reg)}>Регистрация </Button>
						</div>

						<div className="auth-enter">
								{sign == SignType.In ? <LoginComponent/> : <RegistrationComponent/>}
						</div>
				</div>
		</div>
			
}

function RegistrationComponent() {

		const [userEmail, setUserEmail] = useState('')  
		const [userPassword, setUserPassword] = useState('')

		const [isButtonEnable, setIsButtonEnable] = useState(false)
		const dispatch = useAppDispatch()
		const navigate = useNavigate()
		const authService = useService(AuthorizeService)   

		
		const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => setUserEmail(event.target.value)
		const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => setUserPassword(event.target.value)


		const registerClickHandler = () => {
				authService.Register({Email: userEmail, Password:userPassword})
				.then(result => { 
						dispatch(setUser({
						email: userEmail,
						password: userPassword,
						token: (result.token)
				}))
				navigate('/')})
		} 

		useEffect(() => {
				setIsButtonEnable(!(userEmail.length > 3 && userPassword.length > 3))
		},[userEmail, userPassword]);

		return(
				<div>
				<div className="auth-text-type">Регистрация</div>
				<Input onChange={emailHandler} placeholder="Почта" />
				<Input onChange={passwordHandler} placeholder="Пароль"/>

				<div className="auth-accept">
						<Checkbox  > Я принимаю условия соглашения </Checkbox>
				</div>
				<div>  
						<Button disabled={isButtonEnable} onClick={registerClickHandler} type="primary">Продолжить</Button>    
				</div>
		</div>

		)
}
function LoginComponent() {
		const [userEmail, setUserEmail] = useState('')  
		const [userPassword, setUserPassword] = useState('')

		const [isButtonEnable, setIsButtonEnable] = useState(false)
		const dispatch = useAppDispatch()
		const navigate = useNavigate()
		const authService = useService(AuthorizeService)   

		const authClickHandler = () => {
				authService.Auth({Email: userEmail, Password: userPassword})
						.then(result => {
								console.log(result)

								dispatch(setUser({
										email: userEmail,
										password: userPassword,
										token: (result.token)
								}))
								navigate('/')

						})
		}

		useEffect(() => {
				setIsButtonEnable(!(userEmail.length > 3 && userPassword.length > 3))
		},[userEmail, userPassword]);


		const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => setUserEmail(event.target.value)
		const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => setUserPassword(event.target.value)

	return <div className="auth-body">   
		<div className="auth-text-type">Вход</div>
			<div>
				<Input onChange={emailHandler} placeholder="Почта" />
				<Input onChange={passwordHandler} placeholder="Пароль"/>
			</div>

			<div>
				<Button disabled={isButtonEnable} type="primary" onClick={authClickHandler}>Продолжить</Button>
			</div>
</div>
}