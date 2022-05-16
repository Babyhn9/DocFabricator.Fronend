import { useState } from "react";

export interface CreatedState<T> {
    get(): T
    set(value: T): void
    
}

export function useCreate<T>(baseValue?: T): CreatedState<T> {
   
    const [get,set] = useState(baseValue)
    return {
        get: () => get ?? {} as T, 
        set
    }
}