import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should call mixPokemonArray when mounted", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );

    const wrapper = shallowMount(PokemonPage);
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("should match snapshot when load pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should render PokemonPicture and PokemonOptions components", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBe(true);
    expect(options.exists()).toBe(true);

    expect(picture.attributes("pokemonid")).toBe("1");
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(`Correto, ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(2);

    expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`);
  });
});
