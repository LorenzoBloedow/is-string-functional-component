# Usage

```
import isStringFunctionalComponent from "is-string-functional-component"

const functionalComponent =
`function ExampleComponent() {
    return <h1>This is an example!</h1>
}`
isStringFunctionalComponent(functionalComponent) // Returns true.


const randomString = "foo";
isStringFunctionalComponent(randomString) // Returns false.


const classComponent =
`class Test extends React.component {
    render(<h1>Testing</h1>);
}`
isStringFunctionalComponent(classComponent) // Returns false.
```