import { TemplatedWordDTO } from "./TemplatedWordDTO";

export class ConfiguredWordDTO extends TemplatedWordDTO {
    Description: string = '';
    Label: string = ''
    
    constructor() {
        super('','');
    }
}