
const getAllDonuts = async () => {
    return fetch ('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    .then(response => response.json())
}

//Functions to retrive the Most sugary donut
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

//Functions to retrieve the ironiest donut
const getIronyDonut = async() => {
    try{
        const ironDonuts = await getAllDonuts();
        findProteinestDonut(ironDonuts);
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


//Functions to retrieve the less fiber donut
getSugaryDonut();
getIronyDonut();

