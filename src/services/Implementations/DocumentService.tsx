import { AxiosInstance } from "axios";
import { CreateDocumentRequest } from "../Models/Requests/CreateDocumentRequest";
import { ReadWordFileRequest } from "../Models/Requests/ReadWordFileRequest";
import { Guid, TemplateModel } from "../Models/Types";
import { IDocumentService } from "../Interfaces/IDocumentService";
import { Service } from "../service";
import { CreateTemplateRequest } from "../Models/Requests/CreateTemplateRequest";
import { GetTemplatesResponce } from "../Models/Responces/GetTemplatesResponce";
import { GetTemplateResponce } from "../Models/Responces/GetTemplateResponce";
import { CreateDocumentResponce } from "../Models/Responces/CreateDocumentResponce";


export class DocumentService extends Service implements IDocumentService {
  
    CreateTemplate(request: FormData): Promise<Guid> {
        return this.CreateService().post('documents/templates/create', request)
    }
    
    GetText(request: FormData): Promise<any> {
        return this.CreateService().post('documents/text', request) //this.Post('documents/text', request)
    }

    Token: string = "";
    
    GetTemplates(): Promise<GetTemplatesResponce> {
        return this.Get('documents/templates/all', {})
    }

    GetTemplate(templateId: string): Promise<GetTemplateResponce> {
        return this.Get(`documents/templates/${templateId}`,{})
    }
    CreateDocument(request: CreateDocumentRequest): Promise<CreateDocumentResponce> {
        return this.Post('documents/create', request)
    }
}
