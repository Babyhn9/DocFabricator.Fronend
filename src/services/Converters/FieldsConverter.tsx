import { ConfiguredWordDTO } from "../Models/DTOS/ConfiguredWordDTO";
import { TemplatedWordDTO } from "../Models/DTOS/TemplatedWordDTO";

export class FieldsConverter { 
    ToConfigure(fieldDTO: TemplatedWordDTO): ConfiguredWordDTO {
        const newDTO = new  ConfiguredWordDTO();

        newDTO.SkipCount = fieldDTO.SkipCount;
        newDTO.Template = fieldDTO.Template;
        newDTO.Word = fieldDTO.Word;
        
        return newDTO;
    }
}