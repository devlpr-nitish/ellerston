import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Smooth scroll to a DOM element by selector (e.g., "#section")
 * @param {string} selector - DOM selector (e.g., '#experience_wrap')
 * @param {number} offsetY - Optional offset from top (default: 0)
 * @param {function} onStartCallback - Optional function to call before scroll
 */
export function scrollToTarget(selector, offsetY = 0, onStartCallback = null) {
    const target = document.querySelector(selector);
    if (target) {
        gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: target, offsetY },
            ease: 'power2.out',
            onStart: () => {
                if (typeof onStartCallback === 'function') {
                    onStartCallback();
                }
            },
        });
    } else {
        console.warn(`scrollToTarget: Element not found for selector ${selector}`);
    }
}
