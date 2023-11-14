(async () => {
    const service = await import(browser.runtime.getURL("./service.js"));

    const className = "src__Box-sc-1sbtrzs-0 epuDbI";
    const parentClassName = "src__Box-sc-1sbtrzs-0 eVheZJ";

    const observerCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.className === parentClassName) {
                        const meals = Array.from(node.getElementsByClassName(className));
                        const summary = service.getDailySummary(meals);
                        console.log(summary)
                    }
                });
            }
        }
    };

    const observerOptions = {
        childList: true,
        subtree: true
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, observerOptions);

})();