import { useState } from "react";
import ApiContext from "./ApiContext";

export function ApiProvider({ children }) {
   
    

    return (
        <ApiContext value={{
            
        }}>
            {children}
        </ApiContext>
    )
}