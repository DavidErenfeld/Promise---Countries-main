export const loadCountriesData = async (endpoint) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading the countries:", error);
  }
};

export const resetElementContent = (elementId) => {
  const elementList = document.getElementById(`${elementId}`);
  elementList.innerHTML = "";
};

export const darkMode = document.getElementById("darkMode");
darkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
});
