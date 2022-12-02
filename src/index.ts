import { transformSync } from "@babel/core";
import React from "react";

function isUserDefinedComponent(input: string) {
    if (typeof input !== 'string') {
        return false;
    }
    
    let component;
    try {
        component = transformSync(input, {
            "presets": ["@babel/preset-react", "@babel/preset-env"]
        });
    } catch {
        // If it's invalid JSX.
        return false;
    }
    
    component = component?.code;
    if (!component) {
        return false;
    }
    
    // Remove "use strict".
    component = component.slice(15);
    
    // Create a function body that returns the component generated.
    const functionBody = "return @component".replace("@component", component);

    // Assign React to the global scope because functions created with the function constructor can only access the global scope.
    if (typeof window !== "undefined") {
        window.React = React;
    }
    if (typeof global !== "undefined") {
        global.React = React;
    }
 
    // Now this function will return the component.
    component = new Function(functionBody);
    try {
        // Access the returned component.
        component = component();
    } catch {
        // If it's not a valid user-defined component.
        return false;
    }
    

    component = component.toString() as string;
   
    const functionDeclarationRegex = /function\W+[A-Z]\w+\(\)\W+{/;
    // If the function declaration is not the first thing in the component string.
    if (component.search(functionDeclarationRegex) !== 0) {
        return false;
    }

    const returnRegex = /return/;
    if (!component.match(returnRegex)) {
        return false;
    }

    const createElementRegex = /React.createElement/;
    if (!component.match(createElementRegex)) {
        return false;
    }

    return true
}

export default isUserDefinedComponent;