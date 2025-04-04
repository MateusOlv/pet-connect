import React from "react";
import { render } from "@testing-library/react-native";
import { HomeHeader } from "../HomeHeader";

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true), // Mock para isLoaded
}));

describe("HomeHeader", () => {
  test("the component rendered", () => {
    render(<HomeHeader />);
  });
});