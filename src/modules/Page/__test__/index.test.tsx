import React from "react";
import { mount } from "enzyme";
import Page from '../page';

describe("Page", () => {
    it("should render without throwing an error", function () {
        const wrap = mount(<Page />);
        expect(wrap.find("h1").text()).toBe("Welcome to My Next App!");
    });
});
