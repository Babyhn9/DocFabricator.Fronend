	import { NavLink, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
	import { RequireAuth } from '../../Hocs/RequreAuth';
	import './style.css'

function _TemplatesNavigation () {

		return ( 
				<div className="templates__">
					<div className='templates__component'>
						<Outlet/>
					</div>
				</div>
			)
	}

	

	export const TemplatesNavigation = RequireAuth(_TemplatesNavigation);
