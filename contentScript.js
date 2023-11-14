(() => {
    function isVisible(element) {
        if (element.style.display === 'none' || window.getComputedStyle(element).display === 'none') {
            return false;
        }
        if (element.parentElement) {
            return isVisible(element.parentElement);
        }
        return true;
    }

    let mealElements = document.getElementsByClassName("src__Box-sc-1sbtrzs-0 epuDbI");
    let meals = Array.from(mealElements).filter(el => isVisible(el));

    let protein = 0;
    let carbs = 0;
    let fats = 0;
    let calories = 0;

    meals.forEach(meal => {
        let macrosText = meal.children[0].innerHTML;
        let kcalText = meal.children[1].innerHTML;

        let proteinMatch = macrosText.match(/B:\s*([\d.]+)/);
        let carbsMatch = macrosText.match(/W:\s*([\d.]+)/);
        let fatsMatch = macrosText.match(/T:\s*([\d.]+)/);

        if (proteinMatch) {
            protein += parseFloat(proteinMatch[1]);
        }

        if (carbsMatch) {
            carbs += parseFloat(carbsMatch[1]);
        }

        if (fatsMatch) {
            fats += parseFloat(fatsMatch[1]);
        }

        let caloriesMatch = kcalText.match(/(\d+) kcal/);

        if (caloriesMatch) {
            calories += parseInt(caloriesMatch[1]);
        }


    })
    protein = Math.floor(protein * 100) / 100;
    carbs = Math.floor(carbs * 100) / 100;
    fats = Math.floor(fats * 100) / 100;

    let summaryString = `B: ${protein}, W: ${carbs}, T: ${fats}, Kcal: ${calories}`;
    console.log(summaryString);
})();