import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldsConverter } from "../services/Converters/FieldsConverter";
import { ConfiguredWordDTO } from "../services/Models/DTOS/ConfiguredWordDTO";
import { TemplatedWordDTO } from "../services/Models/DTOS/TemplatedWordDTO";

const fieldsConfiguratorSlice = createSlice({
    name: 'fieldsConfigurator',
    initialState: {
        fieldsList: new Array<ConfiguredWordDTO>(),
        templateFile: new File([],'empty'),
        templateName: 'unset'
    },
    reducers: {

        setFields : (state, payload: PayloadAction<Array<TemplatedWordDTO>>) => {
            const converter = new FieldsConverter();
            const configureList = new Array<ConfiguredWordDTO>();
            payload.payload.forEach(el => configureList.push(converter.ToConfigure(el)))
            state.fieldsList = configureList 
        },
        setTemplate: (state, payload: PayloadAction<File>) => {
            state.templateFile = payload.payload;
        },
        setName : (state, payload: PayloadAction<string>) => {
            state.templateName = payload.payload;
        }
    }
});

export const {setFields, setTemplate, setName} = fieldsConfiguratorSlice.actions
export const fieldsConfiguratorReducer = fieldsConfiguratorSlice.reducer