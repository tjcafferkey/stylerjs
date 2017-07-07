export default function styler(element) {
    function getElements() {
        if (element instanceof HTMLElement) {
            return [element];
        } else if (typeof element === 'string') {
            return document.querySelectorAll(element)
        }

        return [];
    }
 
    return {
        get(styles) {
            if (!Array.isArray(styles)) {
                throw new Error('Second parameter of this function should be an array');
            }
 
            let elems = getElements();
            
            if (elems.length === 0) {
                return false;
            }

            let elem = elems[0];
 
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
 
            let elems = getElements();

            if (elems.length === 0) {
                return false;
            }
 
            elems.forEach(function(elem) {
                for (let i in styles) {
                    if (styles.hasOwnProperty(i)) {
                        elem.style[i] = styles[i];
                    }
                }
            });
        }
    }
}