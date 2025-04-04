import React from "react";
import { render } from "@testing-library/react-native";
import { CategoryGrid } from "../CategoryGrid";

describe("CategoryGrid", () => {
    test("the component rendered", () =>{
        render(<CategoryGrid />);
    })
});