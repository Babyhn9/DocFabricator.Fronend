export interface CreateTemplateRequest {
    Name: string
    File: FormData
    Fields: Array<DocumentFieldModel>
}

export interface DocumentFieldModel {
    ToRename:string,
    Label:string,
    Description: string
}