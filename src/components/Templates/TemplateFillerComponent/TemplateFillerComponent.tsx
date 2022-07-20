import { Button, Input } from "antd"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService"
import { useAppSelector } from "../../../redux/store"
import { Guid,  ITemplateFieldModel, TemplateModel } from "../../../services/Models/Types"

export function TemplateFiller () {
    const id = useParams().id || "";
    const [template, setTemplate] = useState<TemplateModel>(new TemplateModel())
    const [fieldValues, setFieldsValues] = useState([''])
    const [downloadURL, setDownloadURL] = useState('')
    const [file, setFile] = useState<File>()
    const navigate = useNavigate()

    const setField = (index:number, value:string) => {
        setFieldsValues(prev => {
            const newState = prev
            newState[index] = value
            return newState
        })
    }

    const createChangeHandle = (index:number) => (e:ChangeEvent<HTMLInputElement>) => setField(index, e.target.value)
    
    const buildHandleClick = () => {
      
        /*documentService.CreateDocument({
            TemplateId: template.id,
            Fields: builedFields
        }).then(result => {
            const bytes = Uint8Array.from(atob(result.bytesOfDocument), c => c.charCodeAt(0))
            const _file = new File([bytes], 'File.doc')
            setFile(_file)
            const url = URL.createObjectURL(_file)
            console.log(url)
            setDownloadURL(URL.createObjectURL(_file))
        }).catch(el => alert('error!!!!!'))
			*/
    }  

    useEffect(()=>{
          //  .GetTemplate(id).then(result => setTemplate(result.template))
    },[])

    return (
           <div>
               <div>
                   {template.name}
               </div>

               <div>
                   {template.fields.map((el,index)=> <DisplayFieldComponent field={el} onChange={createChangeHandle(index)}/>)}
               </div>

               <div>
                   <Button type="primary" onClick={buildHandleClick} >Заполнить Документ</Button>
                   {downloadURL.length > 0 ? <a href={downloadURL}  download='test.doc'>Скачать</a> : <></>}
                   
               </div>
           </div>
       )
}

type DisplayFieldProps = {
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
    field: ITemplateFieldModel
}

function DisplayFieldComponent ( {onChange, field} :DisplayFieldProps) {
    return (
        <div>
            {field.label}
            <Input type='text' onChange={onChange}/>
        </div>
    )
}