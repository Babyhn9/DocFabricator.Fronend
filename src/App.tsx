import './App.css'
import { useCallback } from 'react';
import { setUser } from './redux/userSlice';
import { useAppDispatch, useAppSelector } from './redux/store';
import { LocalStorageKeys, User } from './utils/testData.';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { Outlet } from 'react-router-dom';

function App() {
  
  const dispatch = useAppDispatch()
  let selectedUser = useAppSelector(state=> state.userReducer.user)

  const loadUserFromStorage = useCallback(() => {
    const storedUser = localStorage.getItem(LocalStorageKeys.user)
    if(storedUser != undefined) {
      selectedUser = JSON.parse(storedUser) as User
      if(selectedUser.token != '')
        dispatch(setUser(selectedUser))
    }
  
  }, [selectedUser])

  if(selectedUser.token == '' )
    loadUserFromStorage()

  return <div className='App__'>
        <ControlPanel/>
        <Outlet/>
  </div>
}


export default App;