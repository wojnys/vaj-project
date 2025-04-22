import { render, screen } from "@testing-library/react";
import JokeForm from "../components/forms/JokeForm";
import "@testing-library/jest-dom";

describe("FirstTest Component", () => {
    it("renders the heading with 'First test'", () => {
        // Render the component
        render(<JokeForm />);

        const inputElement = screen.getByRole("textbox");
        const selectElement = screen.getByRole("select");

        const button = screen.getByRole("button");
    });
});
