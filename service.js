export function getDailySummary(meals) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;
    let calories = 0;

    meals.forEach(meal => {
        const macrosText = meal.children[0].innerHTML;
        const kcalText = meal.children[1].innerHTML;

        const proteinMatch = macrosText.match(/B:\s*([\d.]+)/);
        const carbsMatch = macrosText.match(/W:\s*([\d.]+)/);
        const fatsMatch = macrosText.match(/T:\s*([\d.]+)/);

        if (proteinMatch) {
            protein += parseFloat(proteinMatch[1]);
        }

        if (carbsMatch) {
            carbs += parseFloat(carbsMatch[1]);
        }

        if (fatsMatch) {
            fats += parseFloat(fatsMatch[1]);
        }

        const caloriesMatch = kcalText.match(/(\d+) kcal/);

        if (caloriesMatch) {
            calories += parseInt(caloriesMatch[1]);
        }

    })
    protein = Math.floor(protein * 100) / 100;
    carbs = Math.floor(carbs * 100) / 100;
    fats = Math.floor(fats * 100) / 100;

    return `B: ${protein} | W: ${carbs} | T: ${fats} | Kcal: ${calories}`;
}
