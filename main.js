(async () => {
    const service = await import(browser.runtime.getURL("./service.js"));

    const className = "src__Box-sc-1sbtrzs-0 epuDbI";
    const parentClassName = "src__Box-sc-1sbtrzs-0 eVheZJ";
    const targetClass = "sc-jVKKsU kTAXMB";
    const altTargetClass = "sc-jVKKsU jJckyL";

    const observerCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.className === parentClassName) {
                        const meals = Array.from(node.getElementsByClassName(className));
                        const summary = service.getDailySummary(meals);
                        let targetElement = document.getElementsByClassName(targetClass)[0];
                        if (!targetElement) {
                            targetElement = document.getElementsByClassName(altTargetClass)[0];
                        }
                        targetElement.innerHTML = summary;
                        targetElement.style.margin = "20px 0";
                        targetElement.style.height = "32px";
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