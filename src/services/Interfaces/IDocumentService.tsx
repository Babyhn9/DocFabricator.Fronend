import { CreateDocumentRequest } from "../Models/Requests/CreateDocumentRequest";
import { CreateTemplateRequest } from "../Models/Requests/CreateTemplateRequest";
import { ReadWordFileRequest } from "../Models/Requests/ReadWordFileRequest";
import { CreateDocumentResponce } from "../Models/Responces/CreateDocumentResponce";
import { GetTemplateResponce } from "../Models/Responces/GetTemplateResponce";
import { GetTemplatesResponce } from "../Models/Responces/GetTemplatesResponce";
import { Guid, TemplateModel } from "../Models/Types";

export interface IDocumentService {
    /**
     * Используется чтобы получить список всех шаблонов
     */
    GetTemplates(): Promise<GetTemplatesResponce>, 
    /**
     * Используется для получения шаблона, чтобы приступить к заполнению 
     * @param templateId 
     */
    GetTemplate (templateId: Guid) : Promise<GetTemplateResponce>
    CreateTemplate(request: FormData) : Promise<Guid>
    CreateDocument(request: CreateDocumentRequest): Promise<CreateDocumentResponce>
    GetText(request: FormData): Promise<any>
}