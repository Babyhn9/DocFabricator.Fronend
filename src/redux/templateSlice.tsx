import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TemplateModel } from "../services/Models/Types";


const templateSlice = createSlice({
    name: 'template',
    initialState: {
        selectedTemplate: new TemplateModel()
    },
    reducers: {
        setTemplate : (state, payload: PayloadAction<TemplateModel>) => {
            state.selectedTemplate = payload.payload
        }
    }
});

export const {setTemplate} = templateSlice.actions
export const templateReducer = templateSlice.reducer