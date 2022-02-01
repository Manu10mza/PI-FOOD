import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as recipes from "../db_tests.json";
import Card from "../components/Card.jsx";
//console.log(recipes.recipes);
configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let recipeCard;
  //console.log(recipeCard);
  let [rec1, rec2] = recipes.recipes;
  //console.log("rec1!!!!", rec1);
  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  beforeEach(() => {
    recipeCard = (e) =>
      shallow(<Card title={e.title} image={e.image} diet={e.diets} />);
    expect(isReact.classComponent(Card)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen de la receta', () => {
    expect(Card(rec1).find("img").at(0).prop("src")).toEqual(rec1.image);
    expect(Card(rec2).find("img").at(0).prop("src")).toEqual(rec2.image);
  });
  it('Debería renderizar un "h3" que contenga el Title', () => {
    expect(Card(rec1).find("h3").at(0).text()).toBe(rec1.title);
    expect(Card(rec2).find("h3").at(0).text()).toBe(rec2.title);
  });

  it('Debería renderizar un "h5" que contenga la Diet', () => {
    expect(Card(rec1).find("h5").at(1).text()).toBe(rec1.diet);
    expect(Card(rec2).find("h5").at(1).text()).toBe(rec2.diet);
  });
});
