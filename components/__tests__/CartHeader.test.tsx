import React from "react";
import { render } from "@testing-library/react-native";
import { CartHeader } from "../CartHeader";

describe("CartHeader", () => {
    test("the component rendered", () =>{
        render(<CartHeader />);
    })
});