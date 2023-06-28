export const  scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
}

export const validate = (form, fileName, steps) => {

  // const patron = /^(?!^(\w)\1*$)\S*\s+\S*$/;
  const patron = /^.*?(\S)\1{2,}.*?$/
  console.log(steps);
  const errors = {};

  if (form.name.trim().length === 0) {
    errors.name = "Name is required";
  }
  else if(patron.test(form.name)) {
    errors.name = "Must be a valid name"
  }

  if (form.name.length > 60) {
    errors.name = "Name must be less than 60 characters";
  }

  if (form.summary.trim().length === 0) {
    errors.summary = "Summary is required";
  }
  else if (form.summary.length > 500) {
    errors.summary = "It has a maximum of 500 characters"    
  }
  
  else if(patron.test(form.summary)) {
    errors.summary = "Must be a valid text"
  }

  if (fileName === "No selected image") {
    errors.image = "Image is required";
  } 
  
  if (form.healthScore < 1) {
    errors.healthScore = "Health score must be between 1 and 100";
  }

  if(patron.test(steps)) {
    errors.steps = "Must be a valid text"
  }

  if(steps && steps.length === 0){
    errors.steps = "Steps are required";
  }

  return errors;
};

export const getTotalPages = (hasFilteredRecipes, filteredRecipes, recipesByName, allRecipes, perPage) => {
  let recipes = []
  if(hasFilteredRecipes){
    recipes = filteredRecipes
  } else if (recipesByName.length > 0) {
    recipes = recipesByName
  } else {
    recipes = allRecipes
  }
  
  return Math.ceil(recipes.length / perPage)
}