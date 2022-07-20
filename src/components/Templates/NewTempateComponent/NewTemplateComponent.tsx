import { Button, Input, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import './style.css'
import { TemplateSerive } from "../../../services/Implementations/TemplateSerive";


export function NewTemplate() {

	const [templateName, setTemplateName] = useState('');
	const [templateFile, setTemplateFile] = useState<File>();
	const [isFileSelected, setIsFileSelected] = useState(false);
	const templateService = useService(TemplateSerive);
	const navigate = useNavigate();
	const canCreateNewTemplate = templateName?.length >= 3 && templateFile != undefined;

	const onFileSelect = useCallback((e: UploadChangeParam) => {
		if(e.file && e.file.status == 'error' )
			{
				setTemplateFile(e.file.originFileObj)   
				setIsFileSelected(true);   
				console.log(e);
			}	
}, [templateFile])

	const hadleCreateClick = () => {
		if(templateFile)
		{
				templateService.CreateTemplate({
					TemplateName: templateName,
					File: templateFile
			}).then(result => {
				console.log(result);
			})
		}

	};

	
	return (
		<div className="newTemplate">
		<div className="newTemplate-container">
			<div className="newTemplate-header">
				Создание нового шаблона
			</div>

			<div className="newTemplate-fill">
					<div className="row">
							<div className="label">
									Название шаблона
							</div>
							<div className="fill">
									<Input onChange={(e)=> {setTemplateName(e.target.value)}} />
							</div>
					</div>

					<div className="row">
						<div className="label">
							Файл шаблона
						</div>
						<div className="fill">
							<Upload  accept=".docx"  onChange={onFileSelect} showUploadList={false} >
								<Button  >Загрузить файл</Button>
							</Upload>
						</div>
					</div>
				
			</div>

			{isFileSelected ? <></> : <div className="newTemplate-submit" style={{color:"red"}}>Загрузите файл!</div>}

				<div className="newTemplate-submit">
					<Button disabled={!canCreateNewTemplate} onClick={hadleCreateClick} >Создать</Button>
				</div>
			
		</div>
	</div>

	)
}