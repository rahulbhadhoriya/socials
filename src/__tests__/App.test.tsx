import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { fetchUserStories } from "../App.service";
import App from "../App";
import { TEST_ID } from "../common/constants";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../App.service", () => ({
  fetchUserStories: vi.fn(),
}));

describe("App Component Integration Tests", () => {
  beforeEach(() => {
    fetchUserStories.mockResolvedValue([
      {
        id: 1,
        iconUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1",
        stories: [
          {
            id: 11,
            type: "image",
            url: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95",
            duration: 5000,
          },
          {
            id: 12,
            type: "image",
            duration: 5000,
            url: "https://images.unsplash.com/photo-1695747003514-83297acc8de3",
          },
        ],
        viewed: false,
      },
      {
        id: 2,
        iconUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        stories: [
          {
            id: 21,
            type: "image",
            url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
            duration: 5000,
          },
          {
            id: 22,
            type: "image",
            duration: 5000,
            url: "https://images.unsplash.com/photo-1531256456869-ce942a665e80",
          },
        ],
        viewed: false,
      },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays user list on initial load", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID.USERLIST)).toBeInTheDocument()
    );
  });

  it("displays user lists with stories", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getAllByTestId(TEST_ID.USER).length).toBeGreaterThan(0)
    );
  });

  it("open first story successfully", async () => {
    render(<App />);

    await waitFor(() =>
      fireEvent.click(screen.getAllByTestId(TEST_ID.USER)[0])
    );
    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID.IMAGE)).toBeInTheDocument()
    );
  });

  it("open next story on right click", async () => {
    render(<App />);
    await waitFor(() =>
      fireEvent.click(screen.getAllByTestId(TEST_ID.USER)[0])
    );
    await waitFor(() => fireEvent.click(screen.getByTestId(TEST_ID.RIGHT)));
  });

  it("open prev story on left click", async () => {
    render(<App />);
    await waitFor(() =>
      fireEvent.click(screen.getAllByTestId(TEST_ID.USER)[0])
    );
    await waitFor(() => fireEvent.click(screen.getByTestId(TEST_ID.LEFT)));
  });

  it("on cross button it closes the stories", async () => {
    render(<App />);
    await waitFor(() =>
      fireEvent.click(screen.getAllByTestId(TEST_ID.USER)[0])
    );
    await waitFor(() => fireEvent.click(screen.getByTestId(TEST_ID.CROSSBTN)));
    await waitFor(() =>
      expect(screen.queryByTestId(TEST_ID.IMAGE)).not.toBeInTheDocument()
    );
  });
});
