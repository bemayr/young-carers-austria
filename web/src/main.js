import './styles/main.css';

import Alpine from 'alpinejs';
import { marked } from 'marked';
import slugify from '@sindresorhus/slugify';

window.Alpine = Alpine;
window.slugify = slugify;

Alpine.start();

Alpine.directive(
  "markdown",
  (el, { expression }, { effect, evaluateLater }) => {
    let getHTML = evaluateLater(expression);

    effect(() => {
      getHTML((input) => {
        el.innerHTML = marked(input, { mangle: false, headerIds: false });
      });
    });
  }
);

const env = document.querySelector('body').dataset.env;

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}
