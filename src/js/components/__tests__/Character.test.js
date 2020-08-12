import React from "react";
import { shallow } from "enzyme";
import Character from "../Character";

describe("Character", () => {
	it("snapshot renders", () => {
		const component = shallow(<Character />);
		expect(component).toMatchSnapshot();
	});
});
