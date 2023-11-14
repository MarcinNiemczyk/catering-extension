(async () => {
    const service = await import(browser.runtime.getURL("./service.js"));
    const utils = await import(browser.runtime.getURL("./utils.js"));

    const mealElements = document.getElementsByClassName("src__Box-sc-1sbtrzs-0 epuDbI");
    const meals = Array.from(mealElements).filter(el => utils.isElementVisible(el));

    const summary = service.getDailySummary(meals);
    console.log(summary);

})();