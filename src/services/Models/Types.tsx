export type Guid = string;

export class TemplateModel {
    templateName: string = ""
    id: Guid = ""
    fields: ITemplateFieldModel[] = new Array() 
}

export interface ITemplateFieldModel {
    id: Guid
    toRename: string,
    label:string,
    description: string
}

export interface IBuildTemplateField{
    fieldId: Guid,
    value: string
}



