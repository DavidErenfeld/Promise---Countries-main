import { loadCountriesData, resetElementContent } from "./common.js";

const countryName = localStorage.getItem("countryName");

const createButton = (content) => {
  const button = document.createElement("button");
  button.className = "btn";
  button.innerHTML = content;
  return button;
};

const createButtonList = (parentElement, array) => {
  if (array.length > 0) {
    array.forEach((item) => {
      const button = createButton(item);
      parentElement.appendChild(button);
    });
  }
};

const findBorderCountries = async (country) => {
  const countriesData = await loadCountriesData(`name/${country}`);
  const borderCountriesCodes = countriesData[0].borders || [];

  if (borderCountriesCodes.length > 0) {
    const borders = await Promise.all(
      borderCountriesCodes.map(async (code) => {
        const currentCountry = await loadCountriesData(`/alpha/${code}`);
        return currentCountry[0].name.common;
      })
    );
    return borders;
  } else {
    return null;
  }
};

const createCountryElement = async (country) => {
  const countryElement = document.getElementById("countryDetails");
  const currencies = Object.values(country.currencies)
    .map((currency) => `${currency.name} (${currency.symbol})`)
    .join(", ");
  const languages = Object.values(country.languages).join(", ");
  const borders = await findBorderCountries(countryName);
  countryElement.innerHTML = `
    <div class="country-flag">
      <img
        src="${country.flags.png}"
        alt="Flag of ${country.name.common}"
      />
    </div>
    <div class="country-info col-2">
      <h1><strong>${country.name.common}</strong></h1>
      <div class="col-2">
        <ul>
          <li><strong>Native Name: </strong>${country.name.official}</li>
          <li><strong>Population: </strong>${country.population}</li>
          <li><strong>Region: </strong>${country.region}</li>
          <li><strong>Sub Region: </strong>${country.subregion}</li>
          <li><strong>Capital: </strong>${country.capital.join(", ")}</li>
        </ul>
        <ul>
          <li><strong>Top Level Domain: </strong>${country.tld.join(", ")}</li>
          <li><strong>Currencies: </strong>${currencies}</li>
          <li><strong>Languages: </strong>${languages}</li>
        </ul>
      </div>
      <div class="col-3">
        <p><strong>Border Countries: </strong></p>
        <div class="buttn-list col-3" id="buttnList">
        </div>
      </div>
    </div>`;
  const buttonListElement = document.getElementById("buttnList");
  createButtonList(buttonListElement, borders);
};

const initPage = async (countryName) => {
  try {
    const data = await loadCountriesData(`name/${countryName}`);
    const country = data[0];
    resetElementContent("countryDetails");
    createCountryElement(country);
  } catch (error) {
    console.error("Error loading the countrie:", error);
  }
};

initPage(countryName);
