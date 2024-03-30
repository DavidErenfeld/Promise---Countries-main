import { loadCountriesData, resetElementContent } from "./common.js";

const filterByRegion = document.getElementById("filterByRegion");
const regionList = document.getElementById("regionList");
const regionFilters = document.getElementById("regionFilters");
const searchInput = document.querySelector(".search-input");

const createCountryElement = (country) => {
  const countryElement = document.createElement("a");
  countryElement.addEventListener("click", () => {
    localStorage.setItem("countryName", country.name.common);
  });
  countryElement.href = "details.html";
  countryElement.className = "country scale-effect";
  countryElement.dataset.countryName = country.name.common;
  countryElement.innerHTML = `
  <div class="country-flag">
  <img src="${country.flags.png}" alt="${country.name.common} Flag" />
  </div>
  <div class="country-info">
  <h2 class="country-title">${country.name.common}</h2>
  <ul class="country-brief">
  <li><strong>population: </strong>${country.population}</li>
  <li><strong>Region: </strong>${country.region}</li>
  <li><strong>capital: </strong>${country.capital}</li>
  </ul>
  </div>
  `;
  countriesList.appendChild(countryElement);
};

const initApp = async (dataType) => {
  try {
    const data = await loadCountriesData(dataType);
    resetElementContent("countriesList");
    data.forEach((country) => {
      createCountryElement(country);
    });
    console.log(data);
  } catch (error) {
    console.error("Error loading the countries:", error);
  }
};

// EventListener
filterByRegion.addEventListener("click", function () {
  regionList.classList.toggle("hidden");
});

regionFilters.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", function () {
    regionList.classList.toggle("hidden");
    this.dataset.region !== "all"
      ? initApp(`region/${this.dataset.region}`)
      : initApp("all");
  });
});

searchInput.addEventListener("input", async function () {
  resetElementContent("countriesList");
  const data = await loadCountriesData("all");
  const searchTerm = this.value.toLowerCase();
  const updateData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  updateData.forEach((country) => {
    createCountryElement(country);
  });
});

initApp("all");
