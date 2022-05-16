import { Button, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { useService } from '../../../hooks/useService';
import { useAppDispatch } from '../../../redux/store';
import { setTemplate } from '../../../redux/templateSlice';
import { DocumentService } from '../../../services/Implementations/DocumentService'
import { Guid, TemplateModel } from '../../../services/Models/Types';
import { Paths } from '../../../utils/Pats';
import { RequireAuth } from '../../Hocs/RequreAuth';
import './style.css'

type DisplayTemplateComponentProps = {
    template: TemplateModel,
    clickAction: (id:Guid)=>void
}

function DisplayTemplateComponent({ template, clickAction}: DisplayTemplateComponentProps) {
    return (
        <div className='templates__list__item'>
            <Button 
                 type='primary' 
                 onClick={()=> clickAction(template.id)}>
                 {template.templateName}
             </Button> 
        </div>
    )
 }

 function AllTemplatesComponent () {
    const [templates, setTemplates] = useState<TemplateModel[]>()
    const [displayingTemplates, setDisplayingTemplates] = useState<TemplateModel[]>()
    const [searchFilter, setSearchFilter] = useState('');
    const debouncedSerchFilter = useDebounce(searchFilter, 450)
    const documentService = useService(DocumentService);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = (id: Guid) => {
        documentService.GetTemplate(id).then(el => {
            dispatch(setTemplate(el.template))
            navigate(Paths.templates.fill)
        })
    } 

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value)
    } 

    //load templates at component mount
    useEffect(()=> {
        documentService.GetTemplates()
        .then(el=>
            {
                setTemplates(el.templates)
                setDisplayingTemplates(el.templates)
            }
        )
    }, [])

    //filter templates
    useEffect(() => {
        if(debouncedSerchFilter != "") {
            const filteredTemplates = templates?.filter(el => 
                el.templateName.toLocaleLowerCase()
                    .includes(debouncedSerchFilter
                        .trim()
                        .toLocaleLowerCase()))

            setDisplayingTemplates(filteredTemplates)
        } else {
            setDisplayingTemplates(templates)
        }
    }, [debouncedSerchFilter])

    return (
        <div className='templates__'>
            <div className="templates__header">
                Все шаблоны {debouncedSerchFilter}
            </div>

            <div className="templates__search">
                <div className="templates__search__field">
                    <Input onChange={handleSearchInput}/>
                </div>
                <div className="templates__search__icon">

                </div>
            </div>

            <div className='templates__list'>
                {displayingTemplates?.map((el,index)=> <DisplayTemplateComponent key={index} clickAction={handleClick} template={el}/>)}
            </div>
        </div>
            
    )
}


export const AllTemplates = RequireAuth(AllTemplatesComponent)
