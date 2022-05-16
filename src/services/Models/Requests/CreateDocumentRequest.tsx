import { Guid, IBuildTemplateField } from "../Types";

export interface CreateDocumentRequest {
    TemplateId: Guid,
    Fields: Array<IBuildTemplateField>
}

