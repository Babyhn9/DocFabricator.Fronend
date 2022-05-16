import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './redux/store'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Authorization } from './components/Authorization/Authorization';
import { General } from './components/General/General';
import { AllTemplates } from './components/Templates/AllTemplatesCompponent/AllTemplatesComponent';
import { FillTemplate } from './components/Templates/FillTemplateComponent/FillTemplateComponent';
import { Editor } from './components/Editor/EditorComponent';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<General/>}/>
            <Route path='auth' element={<Authorization/>}/>

            <Route path='/templates'>
              <Route index element={<AllTemplates/>}/>
              <Route path='fill/:id' element={<FillTemplate/>}/>
            </Route>

            <Route path='/editor'>
              <Route index element={<Editor/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') 
);


