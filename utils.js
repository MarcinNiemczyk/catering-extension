export function isElementVisible(element) {
    if (element.style.display === 'none' || window.getComputedStyle(element).display === 'none') {
        return false;
    }
    if (element.parentElement) {
        return isElementVisible(element.parentElement);
    }
    return true;
}
