const getAllDonuts = async () => {
    return fetch ('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    .then(response => response.json())
}

//Exercise 2.1 Functions to retrive the Most sugary donut
const getSugaryDonut = async () => {
    try{
        const result = await getAllDonuts();
        manageSugaryDonuts(result);
    }catch (error){
        console.log(error);
    }   
}

const manageSugaryDonuts = (donuts) => {
    
    //loops through the all donuts array saving the sugar amount of each donut svaing it in 'sugarInDonuts' variable
    const sugarInDonuts = donuts.items.item.map( donut => {
        //per donut collects the sugar information converting it to numbers
        const sugarAmount = Number(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars.substring(0,2));
        return sugarAmount;
    })
    
    const maxSugar = Math.max(...sugarInDonuts);
    const theDonut = donuts.items.item.filter(donut => Number(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars.substring(0,2)) === maxSugar);
    console.log("El donut con mas azucar es: " + theDonut[0].name);
    
}

//Exercise 2.2


//Exercise 2.3 Functions to retrieve the Proteinest donut
const getProteinestDonut = async() => {
    try{
        const proteinDonuts = await getAllDonuts();
        findProteinestDonut(proteinDonuts);
    }catch (error){
        console.log(error);
    }
}

const findProteinestDonut = (donuts) => { 

    const filterProteinInDonut = donuts.items.item.map( donut =>{
        const proteinPerDonut =  Number(donut.nutrition_facts.nutrition.proteine.substring(0,2));
        return proteinPerDonut;
    });

    const getMaxProtienAmount = Math.max(...filterProteinInDonut);

    const theProteinDonut = donuts.items.item.filter( donut => Number(donut.nutrition_facts.nutrition.proteine.substring(0,2)) === getMaxProtienAmount)

    console.log("El donut con mas proteina es: " + theProteinDonut[0].name);
}


//Exercise 2.4 Functions to retrieve the less fiber donut
const getLessFiberDonut = async () => {
    try{
        const getFiberDonuts = await getAllDonuts();
        manageFiberDonuts(getFiberDonuts);
    }
    catch (error){
        console.log(error);
    }
}

const manageFiberDonuts = (donuts) => {
    
    const donutsWithFiber = donuts.items.item.map( donut => { 
        const fiberAmount = Number(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre.slice(0, -1));
        return fiberAmount;

    });

    const minFiberInDonut = Math.min(...donutsWithFiber);

    const donutWithLessFiber = donuts.items.item.filter( donut => { 
        const donutName = Number(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre.slice(0, -1)) === minFiberInDonut;
        return donutName
    });
       
    const donutsNames = donutWithLessFiber.map( donut  => donut.name);
    console.log("Los Donuts con menos fibra son: " + donutsNames + " ");
}


getIronyDonuts();
getProteinestDonut();
getSugaryDonut();
getLessFiberDonut();






//Exercise part 2 
const retrieveDonuts = async () => {
    try{
        const allDonuts = await getAllDonuts();
        findNameAndCalories(allDonuts);
        findNameAndCarbs(allDonuts);
        getAVGofDonuts(allDonuts)
        getSumOfSaturatedFats(allDonuts);
    }catch(error){
        console.log(error);
    }
}

//Exercise 2.1
const findNameAndCalories = (donuts) => {

    const nameAndCaloriesRetrieved = donuts.items.item.map( donut => { return { Name: donut.name, Calories: donut.nutrition_facts.nutrition.calories}})
    //console.log("Listado de los donuts y sus respectivas calorias: " + JSON.stringify(nameAndCaloriesRetrieved) );

}
//Exercise 2.2
// const findNameAndCarbs = (donuts) => {
//     const nameAndCarbsRetrieved = donuts.items.item.map( donut => { return { Name: donut.name, Carbohidrates: donut.nutrition_facts.nutrition.carbohydrate}})
//     const desglosedCarbs = nameAndCarbsRetrieved.Carbohidrates.carbs_detail.map(item => item.type)
//     console.log(nameAndCarbsRetrieved.Carbohidrates.carbs_detail);
// }

//Exercise 2.3
const getAVGofDonuts = (donuts) => {
    const donutCalories = donuts.items.item.map( donut => donut.nutrition_facts.nutrition.calories)
    const sumOfCalories = donutCalories.reduce((accumulator, currentValue) =>{
        return accumulator +currentValue;
    })
    console.log("The average of calories in the donuts is : " + sumOfCalories / donutCalories.length);
}

//Exercise 2.4
const getSumOfSaturatedFats = (donuts) => {
    const saturatedFats = donuts.items.item.map(donut => Number(donut.nutrition_facts.nutrition.fat.fat_type.saturated.slice(0, -1)));
    console.log(saturatedFats);
}

retrieveDonuts();
