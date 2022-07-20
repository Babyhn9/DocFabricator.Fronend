import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './redux/store'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Authorization } from './components/Authorization/Authorization';
import { General } from './components/General/General';
import { TemplateFiller as TemplateFillerComponent } from './components/Templates/TemplateFillerComponent/TemplateFillerComponent';
import { Editor } from './components/Editor/EditorComponent';
import { NewTemplate as NewTemplateComponent } from './components/Templates/NewTempateComponent/NewTemplateComponent';
import { AllTemplates as AllTemplatesComponent } from './components/Templates/AllTemplatesComponent/AllTemplatesComponent';
import { TemplatesNavigation as TemplatesNavigationComponent } from './components/Templates/TemplatesNavigationCompponent/TemplatesNavigationCompponent';
import { ChangeTemplateComponent } from './components/Templates/ChangeTemplateComponent/ChangeTemplateComponent';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<General/>}/>
            <Route path='auth' element={<Authorization/>}/>

            <Route path='/templates' element={<TemplatesNavigationComponent/>}>
              <Route index element={<AllTemplatesComponent/>}/>
							<Route path='new' element={<NewTemplateComponent/>}/>
							<Route path='fill/:id' element={<TemplateFillerComponent/>}/>
              <Route path='edit/:id' element={<ChangeTemplateComponent/>}/>
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


