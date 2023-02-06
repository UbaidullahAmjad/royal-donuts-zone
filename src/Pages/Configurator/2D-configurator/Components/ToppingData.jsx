/* eslint-disable no-unused-vars */
/** ********************* Glazes ******************* */
import Glaze_AlaçageAuAucre from "../images/glazes/glaze-alaçage au sucre.png";
import Glaze_BeurreDeCacahuète from "../images/glazes/glaze-beurre de cacahuète.png";
import Glaze_Caramel from "../images/glazes/glaze-caramel.png";
import Glaze_ChocolatNoir from "../images/glazes/glaze-chocolat noir.png";
import Glaze_ChocolatAuLait from "../images/glazes/glaze-chocolat au lait.png";
import Glaze_ChocolatBlanc from "../images/glazes/glaze-chocolat blanc.png";
import Glaze_ConfitureDeFraises from "../images/glazes/glaze-confiture de fraises.png";
import Glaze_CrèmeBueno from "../images/glazes/glaze-crème bueno.png";
import Glaze_CrèmeDeNutella from "../images/glazes/glaze-crème de nutella.png";
import Glaze_GlaçageAuCitron from "../images/glazes/glaze-glaçage au citron.png";
import Glaze_SansGlaçage from "../images/glazes/glaze-sans glaçage.png";
import Glaze_SucreDeCannelle from "../images/glazes/glaze-sucre de cannelle.png";
import Glaze_SucreEnPoudre from "../images/glazes/glaze-sucre en poudre.png";
import Layer_AlaçageAuAucre from "../images/glazes/layer-alaçage au sucre.png";
import Layer_BeurreDeCacahuète from "../images/glazes/layer-beurre de cacahuète.png";
import Layer_Caramel from "../images/glazes/layer-caramel.png";
import Layer_ChocolatNoir from "../images/glazes/layer-chocolat noir.png";
import Layer_ChocolatAuLait from "../images/glazes/layer-chocolat au lait.png";
import Layer_ChocolatBlanc from "../images/glazes/layer-chocolat blanc.png";
import Layer_ConfitureDeFraises from "../images/glazes/layer-confiture de fraises.png";
import Layer_CrèmeBueno from "../images/glazes/layer-crème bueno.png";
import Layer_CrèmeDeNutella from "../images/glazes/layer-crème de nutella.png";
import Layer_GlaçageAuCitron from "../images/glazes/layer-glaçage au citron.png";
import Layer_SansGlaçage from "../images/glazes/layer-sans glaçage.png";
import Layer_SucreDeCannelle from "../images/glazes/layer-sucre de cannelle.png";
import Layer_SucreEnPoudre from "../images/glazes/layer-sucre en poudre.png";
// *************************************************

/** ******************** Toppings ****************** */
import icon_waffeln from "../images/toppings/icon_waffeln.webp";
// ************************************************

/** ******************** Sauces ******************** */
import Sauce_Bueno from "../images/sauces/sauce-bueno.png";
import Sauce_SauceCaramel from "../images/sauces/sauce-sauce caramel.png";
import Sauce_Sauce_ChocolatAuLait from "../images/sauces/sauce-chocolat au lait.png";
import Sauce_Sauce_ChocolatBlanc from "../images/sauces/sauce-chocolat blanc.png";
import Sauce_Sauce_ChocolatNoir from "../images/sauces/sauce-chocolat noir.png";
import Sauce_CrèmeAuNutella from "../images/sauces/sauce-crème au nutella.png";
import Sauce_CrèmeDeLotus from "../images/sauces/sauce-crème de lotus.png";
import Sauce_SauceKiwi from "../images/sauces/sauce-sauce kiwi.png";
import Sauce_Sauce_SucreEnPoudre from "../images/sauces/sauce-sucre en poudre.png";
import Sauce_SansSauce from "../images/sauces/sauce-sans sauce.png";
import Layer_Bueno from "../images/sauces/layer-bueno.png";
import Layer_SauceCaramel from "../images/sauces/layer-sauce caramel.png";
import Layer_Sauce_ChocolatAuLait from "../images/sauces/layer-chocolat au lait.png";
import Layer_Sauce_ChocolatBlanc from "../images/sauces/layer-chocolat blanc.png";
import Layer_Sauce_ChocolatNoir from "../images/sauces/layer-chocolat noir.png";
import Layer_CrèmeAuNutella from "../images/sauces/layer-crème au nutella.png";
import Layer_CrèmeDeLotus from "../images/sauces/layer-crème de lotus.png";
import Layer_SauceKiwi from "../images/sauces/layer-sauce kiwi.png";
import Layer_Sauce_SucreEnPoudre from "../images/sauces/layer-sucre en poudre.png";
// *************************************************

import { FillingsData } from "./Fillings/FillingsData";

import { ToppingsData } from "./Toppings/ToppingsData";

export const Toppings = {
  glazes: [
    {
      name: "Alaçage Au Aucre",
      image: Layer_AlaçageAuAucre,
      price: 0.5,
      logo: Glaze_AlaçageAuAucre,
    },
    {
      name: "Beurre De Cacahuète",
      image: Layer_BeurreDeCacahuète,
      price: 0.5,
      logo: Glaze_BeurreDeCacahuète,
    },
    {
      name: "Caramel",
      image: Layer_Caramel,
      price: 0.5,
      logo: Glaze_Caramel,
    },
    {
      name: "Chocolat Noir",
      image: Layer_ChocolatNoir,
      price: 0.5,
      logo: Glaze_ChocolatNoir,
    },
    {
      name: "Chocolat Au Lait",
      image: Layer_ChocolatAuLait,
      price: 0.5,
      logo: Glaze_ChocolatAuLait,
    },
    {
      name: "Chocolat Blanc",
      image: Layer_ChocolatBlanc,
      price: 0.5,
      logo: Glaze_ChocolatBlanc,
    },
    {
      name: "Confiture De Fraises",
      image: Layer_ConfitureDeFraises,
      price: 0.5,
      logo: Glaze_ConfitureDeFraises,
    },
    {
      name: "Crème Bueno",
      image: Layer_CrèmeBueno,
      price: 0.5,
      logo: Glaze_CrèmeBueno,
    },
    {
      name: "Crème De Nutella",
      image: Layer_CrèmeDeNutella,
      price: 0.5,
      logo: Glaze_CrèmeDeNutella,
    },
    {
      name: "Glaçage Au Citron",
      image: Layer_GlaçageAuCitron,
      price: 0.5,
      logo: Glaze_GlaçageAuCitron,
    },
    {
      name: "Sans Glaçage",
      image: Layer_SansGlaçage,
      price: 0.5,
      logo: Glaze_SansGlaçage,
    },
    {
      name: "Sucre De Cannelle",
      image: Layer_SucreDeCannelle,
      price: 0.5,
      logo: Glaze_SucreDeCannelle,
    },
    {
      name: "Sucre En Poudre",
      image: Layer_SucreEnPoudre,
      price: 0.5,
      logo: Glaze_SucreEnPoudre,
    },
  ],
  topping: ToppingsData,
  sauces: [
    {
      name: "Bueno",
      image: Layer_Bueno,
      price: 0.5,
      logo: Sauce_Bueno,
    },
    {
      name: "Sauce Caramel",
      image: Layer_SauceCaramel,
      price: 0.5,
      logo: Sauce_SauceCaramel,
    },
    {
      name: "Chocolat Au Lait",
      image: Layer_Sauce_ChocolatAuLait,
      price: 0.5,
      logo: Sauce_Sauce_ChocolatAuLait,
    },
    {
      name: "Chocolat Blanc",
      image: Layer_Sauce_ChocolatBlanc,
      price: 0.5,
      logo: Sauce_Sauce_ChocolatBlanc,
    },
    {
      name: "Chocolat Noir",
      image: Layer_Sauce_ChocolatNoir,
      price: 0.5,
      logo: Sauce_Sauce_ChocolatNoir,
    },
    {
      name: "Crème Au Nutella",
      image: Layer_CrèmeAuNutella,
      price: 0.5,
      logo: Sauce_CrèmeAuNutella,
    },
    {
      name: "Crème De Lotus",
      image: Layer_CrèmeDeLotus,
      price: 0.5,
      logo: Sauce_CrèmeDeLotus,
    },
    {
      name: "Sauce Kiwi",
      image: Layer_SauceKiwi,
      price: 0.5,
      logo: Sauce_SauceKiwi,
    },
    {
      name: "Sucre En Poudre",
      image: Layer_Sauce_SucreEnPoudre,
      price: 0.5,
      logo: Sauce_Sauce_SucreEnPoudre,
    },
    {
      name: "Pas de sauce",
      image: "",
      unselect: true,
      price: 0.5,
      logo: Sauce_SansSauce,
    },
  ],
  fillings: FillingsData,
};
