/**
 * @jest-environment node
 */
import isUserDefinedComponent from "../dist/index.js";

it("Will return false given anything but a string.", () => {
    expect(isUserDefinedComponent(4)).toBe(false);
    expect(isUserDefinedComponent({})).toBe(false);
    expect(isUserDefinedComponent(undefined)).toBe(false);
});

it("Will return false given a string that is not a component", () => {
    expect(isUserDefinedComponent("Testing")).toBe(false);
    expect(isUserDefinedComponent("0101010")).toBe(false);
});

it("Will return false given a built-in component.", () => {
    expect(isUserDefinedComponent("<h1>Testing</h1>"));
});

it("Will return false given an invalid functional component.", () => {
    expect(isUserDefinedComponent(
        `function Test( {
            return <h1>Testing</h1>
        }`)
    ).toBe(false);

    expect(isUserDefinedComponent(
        `function Test() {
            reurn <h1>Testing</h1>
        }`)
    ).toBe(false);

    expect(isUserDefinedComponent(
        `funon Test( {
            return <h1>Testing</h1>
        }`)
    ).toBe(false);

    expect(isUserDefinedComponent(
        `function Test( {
            dfsfsd
            return <h1>Testing</h1>
        }`)
    ).toBe(false);

    expect(isUserDefinedComponent(
        `function Test( {
            dfsfsd
            return <h1Testing</h1>
        }`)
    ).toBe(false);
});

it("Will return false given a class component", () => {
    expect(isUserDefinedComponent(
        `class Test extends React.component {
            render(<h1>Testing</h1>)
        }`)
    ).toBe(false);
})

it("Will return true given a valid user-defined component.", () => {
    expect(isUserDefinedComponent(
        `function Test() {
            return <h1>Testing</h1>
        }`)
    ).toBe(true);
});