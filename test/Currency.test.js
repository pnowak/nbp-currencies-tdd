import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import { Currency, CurrencyApp, CurrencyList, FavouriteList } from '../src/Currency';

describe('CurrencyApp', () => {
  let container;
  let rate;
  const currencies = [
    { currency: "dolar amerykański", code: "USD" },
    { currency: "euro", code: "EUR" },
  ];

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = component => act(() => {
    ReactDOM.render(component, container);
  });

  const element = selector => container.querySelector(selector);
  const elements = selector => container.querySelectorAll(selector);

  it("renders a div with the right id", () => {
    render(<CurrencyApp currencies={currencies} favourites={[]} />, container);

    expect(element("div#currencyApp")).not.toBeNull();
  });

  it("initially shows a loading message", () => {
    render(<CurrencyApp isLoading={true} />);

    expect(container.textContent).toMatch("Loading...");
  });

  it("renders error message when fetch call fails", () => {
    render(
      <CurrencyApp currencies={currencies} error={Error} favourites={[]} />,
      container
    );

    expect(element(".error")).not.toBeNull();
    expect(element(".error").textContent).toMatch("error occurred");
  });

  describe('Currency', () => {
    it("renders the currency rate", () => {
      rate = { currency: "dolar amerykański" };

      render(<Currency rate={rate} />, container);
      expect(container.textContent).toMatch("dolar amerykański");
    });

    it("renders another the currency value", () => {
      rate = { currency: "euro" };

      render(<Currency rate={rate} />, container);
      expect(container.textContent).toMatch("euro");
    });
  })

  describe('contains', () => {
    describe("CurrencyList", () => {
      let container;

      beforeEach(() => {
        container = document.createElement("div");
      });

      it("renders a div with the right id", () => {
        render(<CurrencyList currencies={[]} />, container);

        expect(element("div#currencyList")).not.toBeNull();
      });

      it("renders multiple currencies in an ol element", () => {
        render(<CurrencyList currencies={currencies} />, container);

        expect(element("ol")).not.toBeNull();
        expect(element("ol").children).toHaveLength(2);
      });

      it("renders each currency in an li", () => {
        render(<CurrencyList currencies={currencies} />, container);

        expect(elements("li")).toHaveLength(2);
        expect(elements("li")[0].textContent).toEqual("dolar amerykański");
        expect(elements("li")[1].textContent).toEqual("euro");
      });

      it("has a button element in each li", () => {
        render(<CurrencyList currencies={currencies} />, container);

        expect(elements("li > button")).toHaveLength(2);
        expect(elements("li > button")[0].type).toEqual("button");
      });

      it('renders a button with value "Add"', () => {
        render(
          <CurrencyList currencies={currencies} buttonValue={"Add"} />,
          container
        );

        expect(elements("li > button")[0].textContent).toMatch("Add");
      });
    });

    describe("FavouriteList", () => {
      let container;

      beforeEach(() => {
        container = document.createElement("div");
      });

      it("renders a div with the right id", () => {
        render(<FavouriteList favourites={[]} />, container);

        expect(element("div#favouriteList")).not.toBeNull();
      });

      it("initially nothing to show", () => {
        render(<FavouriteList favourites={[]} />, container);

        expect(container.textContent).toMatch('');
      });
    });
  })

});