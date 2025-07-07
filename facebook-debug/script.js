const html = document.querySelector('html');
console.log(html)
console.log(html.hasAttribute('amp'), html.hasAttribute('⚡'), html.hasAttribute('\u26A1'), '\u26A1' === '⚡')