import { GetTemplateResponce } from "../Models/Responces/GetTemplateResponce";
import { GetTemplatesResponce } from "../Models/Responces/GetTemplatesResponce";
import { Guid } from "../Models/Types";

export interface IDocumentService {
   
    
    /**
     * Используется для получения шаблона, чтобы приступить к заполнению 
     * @param templateId 
     */
    GetTemplate (templateId: Guid) : Promise<GetTemplateResponce>
    CreateTemplate(request: FormData) : Promise<Guid>
    //CreateDocument(request: CreateDocumentRequest): Promise<CreateDocumentResponce>
    GetText(request: FormData): Promise<any>
}