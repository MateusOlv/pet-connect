import React from "react";
import { render } from "@testing-library/react-native";
import { BackButton } from "../BackButton";

describe("BackButton", () => {
    test("the component rendered", () =>{
        render(<BackButton />);
    })
});