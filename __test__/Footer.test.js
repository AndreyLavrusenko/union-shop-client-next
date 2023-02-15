import {render} from "@testing-library/react";
import Footer from "@/components/footer/Footer";
import axios from "axios";
import {screen} from "@testing-library/react";

jest.mock('axios')

describe("Footer test", () => {

    let response;
    beforeEach(() => {
        response = {
            "copyright": "© 2022 ЮНИОН"
        }
    })


    test("check copyright", async () => {
        axios.get.mockReturnValue(response)

        render(<Footer copyright={response.copyright} />)

        const copyright = await screen.getByTestId('footer-copyright')

        expect(copyright).not.toBeNull()
        expect(copyright).toHaveTextContent("© 2022 ЮНИОН")
    })
})