import React from "react";
import{ render } from "@testing-library/react-native";
import { FormInput } from "../FormInput";

describe("FormInput", () => {
    test("the component rendered", () => {
        render(<FormInput label="Test Label" value="Test Value" onChangeText={() => {}} />)
    })
})
