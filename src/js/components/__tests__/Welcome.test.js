import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Welcome from "../Welcome";

describe("Welcome", () => {
	test("snapshot renders", () => {
		const component = renderer.create(<Welcome />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Check if show button", () => {
		const wrapper = mount(<Welcome />);
		const button = wrapper.find("button");

		expect(button.length).toEqual(1);
	});
});
