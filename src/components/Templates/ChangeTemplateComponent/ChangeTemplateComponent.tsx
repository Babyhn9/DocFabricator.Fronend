import { MouseEvent, useEffect, useState } from "react";
import { useService } from "../../../hooks/useService";
import { TemplateSerive } from "../../../services/Implementations/TemplateSerive";
import { useNavigate, useParams } from 'react-router-dom';
import { Guid, NewTemplateFieldModel, TemplateModel } from '../../../services/Models/Types';
import './style.css'

// Все вхождения (Entries) считаются не включительно. 
//если подряд будет идти 1 1 1 и пользователь выделяет последнюю единицу, то кол-во entries - 2

class TemporalField extends NewTemplateFieldModel {
	templatedValue: string = ""
	offset: number = 0
	lineId: number = 0
}

type TemporalFieldsProps = {
	fields: Array<TemporalField>
	removeAction: (elem: TemporalField) => void
}

function TemproralFieldsContainer({fields, removeAction}: TemporalFieldsProps) {
	return (
		<div className="temporal-fields-list">
			{
			fields.map((el, index)	=> 
				<div key={index} className="item">
					<button onClick={() => removeAction(el)}>{el.templatedValue}</button>
				</div>	 
			)}
		</div>
	)
}
export function ChangeTemplateComponent() {

	const templateService = useService(TemplateSerive);
	const [template, setTemplate] = useState(new TemplateModel());
	const [splitedText, setSplitedText] = useState([''])
	const [newTemporalField, setNewTemporalField] = useState(new TemporalField);
	const [countOfCreatedFields, setCountOfCreatedFields] = useState(0);

	const [temporalFields, setTemporalFields] = useState(new Array<TemporalField>());
	const navigate = useNavigate();
	const {id} = useParams();

	useEffect(()=> {

		if(template.id == '') {
				templateService.GetTemplate(id as Guid).then(el => {
		
				setTemplate(el.template);
				setSplitedText(el.flatText.replaceAll('\r', '').split('\n'));
			});
		}

		onmouseup = (event) => {
			const selection = getSelection();
			if(selection?.toString() == "")
			{
				setNewTemporalField(new TemporalField());
				console.log('disable button');
			}
		}

	}, [])  

	const addNewTemporalField = () => 
	{	
		const templatedValue = `{${countOfCreatedFields}}`;
		newTemporalField.templatedValue = templatedValue;
		const line = splitedText[newTemporalField.lineId]
		const textBeforeWord = line.substring(0, newTemporalField.offset);
		const textAfterWord = line.substring(newTemporalField.offset + newTemporalField.value.length);
		console.log(`selecttion: ${newTemporalField.value}\noffset: ${newTemporalField.offset}`);
		console.log(textBeforeWord);		
		console.log(textAfterWord);

		const newLine =  textBeforeWord + templatedValue + textAfterWord;
		
		setSplitedText(el => {
			const editedText =[...el]
			editedText[newTemporalField.lineId] = newLine;
			return editedText;
		});

		setCountOfCreatedFields(prev => prev+=1);
		setTemporalFields(prev=> [...prev, newTemporalField])
	}

	const finishTemplateClickHandle = () => 
	{

	}

	const removeTemporalField = (field: TemporalField) => {
		const line = splitedText[field.lineId];
		const changedLine = line.replace(field.templatedValue, field.value);

		setTemporalFields(prev => prev.filter(el => el.templatedValue != field.templatedValue));
		setSplitedText(prev => {
			const newText = [...prev];
			newText[field.lineId] = changedLine;
			return newText;
		});

		
		

	}

	const getCountOfEntriesInLine = (lineText: string, selection: Selection) => {
		const selectionText = selection.toString();
		const checkingText  = lineText.substring(0, selection.focusOffset - selectionText.length);

		const splitedCheckingText = checkingText.split(selectionText);
		
		return splitedCheckingText.length - 1;
	}

	const getCountOfEntriesInText = (text: string, selection: Selection) => {
		const splitedCheckingText = text.split(selection.toString());
		return splitedCheckingText.length - 1;
	}

	const onParagraphSelect = (el: MouseEvent<HTMLParagraphElement>) => {
		const clickTarget = el.target as HTMLParagraphElement;
		const paragraphIndex:number = Number.parseInt(clickTarget.id.split('-')[1])
		const selection = getSelection() 

		if(selection != null && selection.toString().length > 0 ) {
			
			
			const containsTemplatedValue = /{\d+}/;
			if(!containsTemplatedValue.test(selection.toString()))
			{
				const textBeforeLine = splitedText.filter((val,index) => index < paragraphIndex).join();
				const countOfEntriesInLine = getCountOfEntriesInLine(splitedText[paragraphIndex], selection);
				const countEntriesBeforeLine = getCountOfEntriesInText(textBeforeLine, selection);
				
				console.log(selection);

				setNewTemporalField({
				value: selection.toString(),
				skipCount: countEntriesBeforeLine + countOfEntriesInLine, 
				templatedValue: `{${countOfCreatedFields}}`,
				offset: (Math.min(selection.anchorOffset, selection.focusOffset)),
				lineId: paragraphIndex
				});

				console.log(
					`
					кол-во повторений без выбранной строки:  ${countEntriesBeforeLine}
					кол-во повторений в выбранной строке: ${countOfEntriesInLine}
					всего повторений: ${countEntriesBeforeLine + countOfEntriesInLine}
					 `)
			}
			else
			{
				selection.empty();
				console.log('Нельзя выделять уже шаблонизированный текст');
			}
			
			
			
		
			

		}
	}

return (
	<div className="change-template-container">	
		<div className="change-template-body">
			<div className="change-template-name">
				{template.name}
			</div>

			<div className="change-template-slide">
				<div className="change-template-flat">
						{
						splitedText.map((el,index) => 
							<p 
								id={`line-${index}`} 
								key={index}
								onMouseUp={onParagraphSelect}>
									{el.trim()}

							</p>
						)}
				</div>

				<TemproralFieldsContainer removeAction={removeTemporalField} fields={temporalFields}/>

				<div className="change-template-controls">
						<div className="change-template-controls-items">
							<button onClick={addNewTemporalField} disabled={newTemporalField?.value == ""} className='item'>Добавить</button>
						</div>
						<div className="change-template-controls-items">
							<button onClick={finishTemplateClickHandle}>Завершить</button>
						</div>
				</div>
			</div>

		</div>
	</div>
)
}



