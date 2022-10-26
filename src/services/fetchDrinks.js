async function fetchDrinks(name, radio) {
  let response;
  let data;
  switch (radio) {
  case 'Ingredient':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
    data = await response.json();
    return data;
  case 'name':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    data = await response.json();
    return data;
  case 'first-letter':
    if (name.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`);
    data = await response.json();
    return data;
  default:
    return 'teste';
  }
}

export default fetchDrinks;
