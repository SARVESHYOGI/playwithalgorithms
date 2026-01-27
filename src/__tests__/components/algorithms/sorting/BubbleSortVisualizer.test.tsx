import { render, screen, fireEvent, act } from "@testing-library/react";
import BubbleSortVisualizer from "@/components/algorithms/sorting/BubbleSortVisualizer";

jest.useFakeTimers();

describe("BubbleSortVisualizer", () => {
  test("renders correctly", () => {
    render(<BubbleSortVisualizer />);
    expect(screen.getByText("Bubble Sort Visualizer")).toBeInTheDocument();
  });

  test("start button works", () => {
    render(<BubbleSortVisualizer />);
    const startButton = screen.getByText("Start Sort");
    fireEvent.click(startButton);
    expect(screen.getByText("Sorting...")).toBeInTheDocument();
  });
});
