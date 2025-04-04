import React from "react";
import { render } from "@testing-library/react-native";
import { BottomBar } from "../BottomBar";

describe("BottomBar Component", () => {
    test("the component rendered", () => {
        render(<BottomBar />);
    })
});