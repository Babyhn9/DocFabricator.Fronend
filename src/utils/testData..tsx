export class User {
    token:string = '' 
    email: string =''
    password:string = ''
}

export const LocalStorageKeys = {
    user : 'user'
}

export function GetCountOfEntries(text: string, entry:string) : number { 
    const lenght = text.split(entry).length 
    return lenght == 0 ? 0 : lenght - 1
}

export function ReplaceAt( text:string,  index:number, from:string, to:string) {
    const diffirence = to.length - from.length;
    return text.substring(0, index + 1) + to + text.substring(index - diffirence + 1 + to.length);
}