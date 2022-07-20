import { CreateTemplateRequest } from "../Models/Requests/CreateTemplateRequest";
import { InitTemplateRequest } from "../Models/Requests/InitTemplateRequest";
import { CreateTemplateResponce } from "../Models/Responces/CreateTemplateResponce";
import { GetTemplateResponce } from "../Models/Responces/GetTemplateResponce";
import { GetTemplatesResponce } from "../Models/Responces/GetTemplatesResponce";
import { Guid } from "../Models/Types";

export interface ITemplateService {
	GetTemplates(): Promise<GetTemplatesResponce>,
	GetTemplate(id: Guid): Promise<GetTemplateResponce>,
	InitTemplate(request: InitTemplateRequest): Promise<any>
	CreateTemplate(request: CreateTemplateRequest): Promise<CreateTemplateResponce>
}
