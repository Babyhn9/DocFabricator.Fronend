import { Guid } from './../Models/Types';
import { CreateTemplateRequest } from '../Models/Requests/CreateTemplateRequest';
import { CreateTemplateResponce } from '../Models/Responces/CreateTemplateResponce';
import { GetTemplateResponce } from '../Models/Responces/GetTemplateResponce';
import { GetTemplatesResponce } from '../Models/Responces/GetTemplatesResponce';
import { Service } from '../service';
import { ITemplateService } from './../Interfaces/ItemplateService';
import { InitTemplateRequest } from '../Models/Requests/InitTemplateRequest';

export class TemplateSerive extends Service implements ITemplateService {
	InitTemplate(request: InitTemplateRequest): Promise<any> {
			return this.Post('templates/init',request);
	}
	GetTemplate(id: Guid): Promise<GetTemplateResponce> {
		return this.Post(`/templates/get`, {templateId: id});
	}
	GetTemplates(): Promise<GetTemplatesResponce> {
		return this.Get('/templates/all');
	}

	CreateTemplate(request: CreateTemplateRequest): Promise<CreateTemplateResponce> {
		const form = new FormData();
		form.append("file", request.File)
		form.append("name", request.TemplateName)
		return this.Post('/templates/create', form);
	}
}