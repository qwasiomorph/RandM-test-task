import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemListElement from "../shared/ItemList/ItemListElement";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("elem test", () => {
  it("Renders", () => {
    render(
      <BrowserRouter>
        <ItemListElement item={{ name: "Test", url: "test" }} />
      </BrowserRouter>,
    );
    const text = screen.getByText("Test");
    expect(text).toBeInTheDocument();
  });
});
