import { render, screen, waitFor } from "@testing-library/react";
import Conversations from "@/pages/conversations";

describe("Conversations page", () => {
    it("should render conversations page correctly", async () => {
        render(<Conversations />);
        await waitFor(() => {
            expect(screen.getByText(/Messagerie/)).toBeInTheDocument();
            expect(screen.getByText(/Conversations/)).toBeInTheDocument();
        });
    });
});
