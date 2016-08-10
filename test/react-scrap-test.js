import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import scrap from "../src/react-scrap";

describe("react-scrap", function() {
  it("should concat passed class names", function() {
    const Component = scrap("div", "bar", "fizz");
    const wrapper = shallow(
      <Component className="foo"/>
    );

    expect(wrapper.prop("className")).to.equal("bar fizz foo");
  });

  it("should compute and concat dynamic class names", function() {
    const Component = scrap("div", {bar: true, ugly: false}, "fizz", ({a, b, c}) => ({a, b, c}));
    const wrapper = shallow(
      <Component className="foo" a={true} b={false} c={true}/>
    );

    expect(wrapper.prop("className")).to.equal("bar fizz a c foo");
  });

  it("should render the passed custom component", function() {
    const AA = scrap("button", "aa");
    const BB = scrap(AA, "bb");

    const wrapperAA = shallow(
      <AA>some content</AA>
    );

    const wrapperBB = shallow(
      <BB>more content</BB>
    );

    expect(
      wrapperAA.equals(
        <button className="aa">some content</button>
      )
    ).to.equal(true);

    expect(
      wrapperBB.equals(
        <AA className="bb">more content</AA>
      )
    ).to.equal(true);
  });
});
