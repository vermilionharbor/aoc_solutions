const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let foodToIngredient = [];
let foodToAllergens = [];

const pushUnique = (arr, val) => {
    if (!arr.some(e => e === val)) {
        arr.push(val);
    }
}

let allergenList = [];
let allergenToFood = {};
let ingredientToFoodCount = {};

lines.forEach((l, foodIndex) => {
    // console.log(l);
    let terms = l.split("(");
    let ingredients = terms[0];
    let allergens = terms[1].trim();
    const allergenPreamble = "contains"
    allergens = allergens.slice(allergenPreamble.length, allergens.length-1).trim();
    foodToIngredient[foodIndex] = [];
    foodToAllergens[foodIndex] = [];

    console.log(allergens);
    // console.log(ingredients);
    let individualIngredients = ingredients.trim().split(" ");
    individualIngredients.forEach(i => {
        // console.log(i);
        foodToIngredient[foodIndex].push(i);
        if (ingredientToFoodCount[i] === undefined) {
            ingredientToFoodCount[i] = 1;
        } else {
            ingredientToFoodCount[i]++;
        }
    })

    let individualAllergens = allergens.trim().split(",");
    individualAllergens = individualAllergens.map(a => a.trim());
    individualAllergens.forEach(a => {
        foodToAllergens[foodIndex].push(a);
        pushUnique(allergenList, a);
        if (allergenToFood[a] === undefined) {
            allergenToFood[a] = [];
        }
        allergenToFood[a].push(foodIndex);
    })
})

console.log("foodToIngredient");
console.log(foodToIngredient);
console.log("");
console.log("foodToAllergens");
console.log(foodToAllergens);
console.log("");
console.log("allergenList");
console.log(allergenList);
console.log("");
console.log("allergenToFood");
console.log(allergenToFood);
console.log("");
// for each allergen, go from allergen --> food ---> ingredient
// any ingredient that does not appear in all of these foods, can not be the allergen

let allergenToIngredient = {};
let allergenToIngredientCandidates = {};
let ingredientToAllergen = {};

allergenList.forEach(a => {
    let foods = allergenToFood[a];
    allergenToIngredientCandidates[a] = [];
    console.log(`---> Processing ${foods.length} ${a} foods...`);
    let allergenToIngredientCount = {};
    foods.forEach(f => {
        let ingr = foodToIngredient[f];
        // console.log(ingr);
        ingr.forEach(i => {
            if (allergenToIngredientCount[i] === undefined) {
                allergenToIngredientCount[i] = 1;
            } else {
                allergenToIngredientCount[i] ++;
            }
        })
    })

    // console.log(allergenToIngredientCount);
    let candidateCount = 0;
    let lastIngr;
    for (let [ingr, allerCount] of Object.entries(allergenToIngredientCount)) {
        if (allerCount === foods.length) {
            console.log(`${ingr} might be ${a}`);
            candidateCount ++;
            lastIngr = ingr;
            allergenToIngredientCandidates[a].push(ingr);
        }
    }
    if (candidateCount === 1) {
        allergenToIngredient[a] = lastIngr;
        ingredientToAllergen[lastIngr] = a;
    }
});

console.log(allergenToIngredient);
console.log(ingredientToAllergen);
console.log(allergenToIngredientCandidates);
let numDeduced = 1;

while (numDeduced > 0) {
    let nextCandidates = {};
    numDeduced = 0;
    for ([aller, candList] of Object.entries(allergenToIngredientCandidates)) {
        let nextList = [];
        let lastCand;
        candList.forEach(cand => {
            if (ingredientToAllergen[cand] === undefined) {
                nextList.push(cand);
                lastCand = cand;
            }
        })
        nextCandidates[aller] = nextList;
        if (nextList.length === 1) {
            numDeduced++;
            allergenToIngredient[aller] = lastCand;
            ingredientToAllergen[lastCand] = aller;
        }
    }
    allergenToIngredientCandidates = nextCandidates;

    console.log("next round");
}

console.log(allergenToIngredient);
console.log(ingredientToAllergen);

console.log("");
// console.log(allergenToIngredientCandidates);
console.log(allergenList);
// console.log(ingredientToFoodCount);

let ingrCount = 0;
let totalFoodCount = 0
let allergenCount = 0;
for ([ingr, foodCount] of Object.entries(ingredientToFoodCount)) {
    if (ingredientToAllergen[ingr] === undefined) {
        ingrCount += foodCount;
        // console.log(`${ingr} not allergen appears ${foodCount} times`);
    } else {
        allergenCount += foodCount;
    }
    totalFoodCount += foodCount;
}
console.log(`ingrCount ${ingrCount} allergenCount ${allergenCount} totalCount ${totalFoodCount}`);
console.log(`check ${ingrCount + allergenCount}`);
allergenList.sort();
console.log(allergenList);
let dangerous = allergenList.reduce((acc, val) => {
    let temp = (acc === "") ? allergenToIngredient[val] : ","+allergenToIngredient[val];
    return acc + temp;
}, "");
console.log(dangerous);





