export type Guid = string;

export class TemplateModel {
    name: string = ""
    id: Guid = ""
    description: string = ""
    fields: ITemplateFieldModel[] = new Array() 
}

export interface ITemplateFieldModel {
    id: Guid
    toRename: string,
    label:string,
    description: string
}

export class NewTemplateFieldModel 
{
    value: string = ""
    skipCount: number = 0
}
 


