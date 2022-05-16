import { Button, Input, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAppDispatch } from "../../../redux/store";
import { setFields, setName, setTemplate } from "../../../redux/fieldsConfiguratorSlice";
import { DocumentService } from "../../../services/Implementations/DocumentService";
import { TemplatedWordDTO } from "../../../services/Models/DTOS/TemplatedWordDTO";
import { GetCountOfEntries, ReplaceAt } from "../../../utils/testData.";
import './style.css'
import { Paths } from "../../../utils/Pats";

// используется только внутри этой компоненты
class UserSelection { 
    Word : string = ''
    Offset: number = 0

    constructor(word:string, offset:number) {
        this.Word = word;
        this.Offset = offset;
    }
}


export function NewTemplateComponent() {
    
    const baseReplacementWord = 'nbv' 

    const [file, setFile] = useState<File>();
    const [documentText, setDocumentText] = useState('')
    const [userSelection, setUserSelection] = useState(new UserSelection('', 0)) 
    const [wordsToConvert, setWordsToConvert] = useState(new Array<TemplatedWordDTO>())
    const [templateName, setTemplateName] = useState('')
    const [countOfTemplatedWords, setCountOfTemplatedWords] = useState(1)
    const documentService = useService(DocumentService)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const removeWordFromTemplate = (word: TemplatedWordDTO) => {

    }

    const canAddNewWord = () => userSelection.Word.length > 0 
    const canCreateNewTemplate = () => wordsToConvert.length > 0 && templateName.length > 0

    const addNewWordClickHandler = () => {

        const replacedTemplatedWord = `{<${baseReplacementWord}${countOfTemplatedWords}>}`
        const newTemplateWord = new TemplatedWordDTO(userSelection.Word, replacedTemplatedWord)
        const countOfEntries = GetCountOfEntries(documentText.substring(0, userSelection.Offset), userSelection.Word); 
        newTemplateWord.SkipCount = countOfEntries == 0 ? countOfEntries : countOfEntries - 1 

        const newText = ReplaceAt(documentText, userSelection.Offset - userSelection.Word.length - 1, userSelection.Word, replacedTemplatedWord)
        wordsToConvert.push(newTemplateWord)

        setCountOfTemplatedWords(countOfTemplatedWords+1) 
        setDocumentText(newText)
        setUserSelection(new UserSelection('', 0))
        setWordsToConvert(wordsToConvert)
    }

    const onFileSelect = useCallback((e: UploadChangeParam) => {
        if(e.file && e.file.status == 'error' )
            setFile(e.file.originFileObj)      

    }, [file])


    const nextStepClickHanle = () => {
        if(file)
        {
            dispatch(setTemplate(file));
            dispatch(setName(templateName));
            dispatch(setFields(wordsToConvert));
            //navigate(Paths.fieldsConfigure);
            
        }else{
            alert('File load error, reload page, and try again')
        }
    }

    useEffect(()=> {
        onmouseup = (ev) => {
                let selection = getSelection()
            if(selection?.anchorNode?.parentElement?.classList.contains('newTemplate__text'))
                {
                    const selectionText = selection.toString()
                    const parentText = selection.anchorNode.nodeValue ?? ""

                    const absoluteRejection = new RegExp('[<\{\}>]') // если попали спец символы
                    const nbvEntry = new RegExp('[nbv0-9]') // если есть совпадение по любой из букв
                    if(absoluteRejection.test(selectionText))
                        selection.empty()
                    else if(nbvEntry.test(selectionText)) {
                        if(selection.focusOffset < 8 && absoluteRejection.test(parentText.substring(0,8))) // если совпадение в начале 
                            selection.empty()  
                        if( selection.focusOffset + 8 >= parentText.length && 
                            absoluteRejection.test(parentText.substring(parentText.length - 9, parentText.length - 1)))
                            {
                                console.log('selection at End')
                                selection.empty()                            

                            }
                    }

                    setUserSelection(new UserSelection(selection.toString() || "", selection.focusOffset))
                }
        }
    }, [])  

    useEffect(() => {
        if(file)
        {
            const formData = new FormData()
            formData.append('request', file);
            documentService.GetText( formData )
                .then(result => {
                    setDocumentText(result.data)
                })
        }   
            
    }, [file])


return <>
        <div className="newTemplate__">

            <div className="newTemplate__header">
                <div className="newTemplate__header_H">
                    Новый шаблон
                </div>
            </div>

            <div className="newTemplate__sides">
                <div className="newTemplate__leftSide">
            
                    <div className="newTemplate__nameValueRow">
                        <div className="newTemplate__nameValueRow__name"> 
                            Название: 
                        </div>

                        <div className="newTemplate__nameValueRow__value">
                            <Input type={'text'} onChange={(e)=> setTemplateName(e.target.value)}/>
                        </div>
                    </div>
                        
                    <div className="newTemplate__text">       
                        {documentText}
                    </div>
                </div>

                <div className="newTemplate__rightSide">
                    <div className="newTemplate__controls">
                        <div>
                            <Upload accept=".docx" showUploadList={false} onChange={onFileSelect} >
                                <Button>Загрузить файл</Button>
                            </Upload>
                        </div>

                        <div>
                            <Button disabled={!canAddNewWord()} type="primary" onClick={ addNewWordClickHandler }> Добавить в шаблон </Button> 
                        </div>

                       
                    </div>

                    <hr />
                    
                    <div className="newTemplate__fields">
                        { wordsToConvert.map(item => 
                            <div>
                                <div>{item.Template}-{item.Word}</div>
                                <div><Button onClick={() => removeWordFromTemplate(item)}>x</Button></div>
                            </div>)
                        }
                    </div>
                    <hr />
                    <div className="newTemplate__controls">
                        <div>
                            <Button disabled={!canCreateNewTemplate()} type='primary' onClick={ nextStepClickHanle }> Далее</Button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</> 
}



