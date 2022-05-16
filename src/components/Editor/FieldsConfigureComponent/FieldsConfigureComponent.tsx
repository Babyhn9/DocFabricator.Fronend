import { Button, Descriptions, Input } from "antd"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { useAppSelector } from "../../../redux/store";
import { DocumentService } from "../../../services/Implementations/DocumentService";
import { ConfiguredWordDTO } from "../../../services/Models/DTOS/ConfiguredWordDTO";
import { Paths } from "../../../utils/Pats";

import './style.css'

export function FieldsConfigureComponent( ) {

    const [selectedField, setSelectedField ] = useState(new ConfiguredWordDTO());
    const [rerender, setRerender] = useState({}) // trash state for component rerender (require to keep ref to selectedField)
    const fieldList = useAppSelector(state => state.fieldsConfiguratorReducer.fieldsList);
    const templateFile = useAppSelector(state => state.fieldsConfiguratorReducer.templateFile);
    const templateName = useAppSelector(state => state.fieldsConfiguratorReducer.templateName);
    const documentService = useService(DocumentService);
    const navigate = useNavigate();

    const handleClickSelection = (el: ConfiguredWordDTO) => () => setSelectedField(el)
    
    const handleChangeLabel = (e : ChangeEvent<HTMLInputElement>) => {
        selectedField.Label = e.target.value;
        setRerender({})
    }

    const handleChangeDescription = (e : ChangeEvent<HTMLInputElement>) => {
        selectedField.Description = e.target.value;
        setRerender({  })
    }
    
    const handleBuildClick = () => {

            const formData = new FormData();
            formData.append('file', templateFile)
            formData.append('name', templateName)
            fieldList.forEach(el => formData.append('Fields[]', JSON.stringify(el)))

            documentService.CreateTemplate(formData)
            .then(el => {
                //navigate(Paths.allTemplates)
            })
    }

    return (
        <div className="templateConfigurator__">
            <div className="templateConfigurator__body">
                <div className="templateConfigurator__top">
                    <div className="templateConfigurator__config">

                        <div className="templateConfigurator__config__pair">
                            <div className="templateConfigurator__config__name">
                                Название: 
                            </div>
                            
                            <div className="templateConfigurator__config__setter">
                                <Input onChange={handleChangeLabel} value={selectedField.Label} />
                            </div>
                        </div>

                        <div className="templateConfigurator__config__pair">
                            <div className="templateConfigurator__config__name">
                                Описание: 
                            </div>
                            
                            <div className="templateConfigurator__config__setter">
                                <Input onChange={handleChangeDescription} value={selectedField.Description}/>
                            </div>
                        </div>
                    </div>

                    <div className="templateConfigurator__fields">
                        <div>
                            <Button onClick={handleBuildClick}>Завершить</Button>
                        </div>
                        {fieldList.map(el => 
                            <div>
                                <Button type='primary' onClick={handleClickSelection(el)}>{el.Template}</Button>
                            </div>)
                        }
                    </div>
                </div>

            <div>
                Значение шаблона:
                <div>
                    {selectedField.Word}
                </div>
            </div>
        </div>

    </div>

    )

}