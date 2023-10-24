import React from "react";
import { render } from "@testing-library/react-native";
import Auth from "./../index";

describe("<Auth/>", () => {
  it("Show button to setup authentication if not present", async () => {
    const { findByTestId } = render(<Auth />);
    const setAuthenticationButton = await findByTestId("test-set-lock");
    expect(setAuthenticationButton).toBeTruthy();
  });

  it("Show button to authenticate user", async () => {
    jest
      .spyOn(require("expo-local-authentication"), "isEnrolledAsync")
      .mockImplementationOnce(() => true);
    const { findByTestId } = render(<Auth />);
    const authenticateButton = await findByTestId("test-authenticate");
    expect(authenticateButton).toBeTruthy();
  });
});
