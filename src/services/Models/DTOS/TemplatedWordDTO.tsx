
export class TemplatedWordDTO {
    Template: string = ""
    Word: string = ""
    SkipCount:number = 0

    constructor(word:string, template: string, skipCount: number = 0) {
        this.Template = template;
        this.Word = word;
        this.SkipCount = skipCount
    }
    
}