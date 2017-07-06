export function styler(element) {
    function getElement() {
        return element instanceof HTMLElement ? element : document.querySelector(element);
    }
 
    return {
        get(styles) {
            if (!Array.isArray(styles)) {
                throw new Error('Second parameter of this function should be an array');
            }
 
            let elem = getElement();
            let obj = {};
 
            if (elem instanceof HTMLElement && styles) {
                styles.map((style) => obj[style] = window.getComputedStyle(elem, null).getPropertyValue(style));
                return obj;
            }
        },
 
        set(styles) {
            if (typeof styles !== 'object') {
                throw new Error('Second parameter of this function should be an object');
            }
 
            let elem = getElement();
 
            if (elem instanceof HTMLElement && styles) {
                for (let i in styles) {
                    elem.style[i] = styles[i];
                }
            }
        }
    }
}