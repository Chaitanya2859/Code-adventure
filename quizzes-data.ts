export interface QuizQuestion {
 id: number;
 question: string;
 codeSnippet?: string;
 options: string[];
 correctAnswer: number; // 0-based index
 explanation: string;
 topic: string;
}

export interface QuizPack {
 id: 'html' | 'css' | 'javascript';
 courseId: number;
 title: string;
 tagline: string;
 desc: string;
 difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
 xpReward: number;
 isPaid: boolean;
 requiredPlan?: string;
 icon: string;
 badge: string;
 accentColor: string;
 questions: QuizQuestion[];
}

export const QUIZ_PACKS: Record<string, QuizPack> = {
 html: {
 id: 'html',
 courseId: 1,
 title: 'HTML Adventure Quiz',
 tagline: 'The Skeleton of the Web',
 desc: 'Test your mastery of foundational tags, HTML5 semantic elements, forms, and document structure.',
 difficulty: 'Beginner',
 xpReward: 50,
 isPaid: false,
 icon: '/books.png',
 badge: ' Free to Play',
 accentColor: 'from-orange-500/20 to-red-500/20 border-orange-500/50',
 questions: [
 {
 id: 1,
 topic: 'Document Structure',
 question: 'What is the purpose of the <!DOCTYPE html> declaration at the beginning of an HTML document?',
 options: [
 'It links an external CSS stylesheet to the page',
 'It tells the browser to render the page using standard HTML5 mode',
 'It acts as the root element containing all other tags',
 'It is an encryption key for secure web connections'
 ],
 correctAnswer: 1,
 explanation: '<!DOCTYPE html> instructs modern web browsers to parse and render the document in full standards mode according to the HTML5 specification.'
 },
 {
 id: 2,
 topic: 'Semantic HTML',
 question: 'Which of the following is considered a semantic HTML5 element?',
 codeSnippet: `<div>\n <span>Click me</span>\n</div>`,
 options: [
 '<div>',
 '<span>',
 '<article>',
 '<b>'
 ],
 correctAnswer: 2,
 explanation: '<article> is a semantic element because its tag name clearly conveys its meaning and self-contained content to browsers, search engines, and assistive devices.'
 },
 {
 id: 3,
 topic: 'Links & Navigation',
 question: 'Which attribute in an <a> tag opens the destination URL in a new browser tab?',
 codeSnippet: `<a href="https://codeadventure.io" target="____">Visit</a>`,
 options: [
 'target="_self"',
 'target="_blank"',
 'target="_parent"',
 'target="_newtab"'
 ],
 correctAnswer: 1,
 explanation: 'Setting target="_blank" instructs the browser to open the hyperlinked document in a new tab or window.'
 },
 {
 id: 4,
 topic: 'Media & Accessibility',
 question: 'Why is the "alt" attribute essential on an <img> tag?',
 codeSnippet: `<img src="/hero.png" alt="A brave pixel knight" />`,
 options: [
 'It sets the tooltip text when hovering over the image',
 'It specifies alternate image resolutions for high-DPI screens',
 'It provides screen readers and text browsers with descriptive fallback text',
 'It caches the image in browser memory for fast rendering'
 ],
 correctAnswer: 2,
 explanation: 'The alt attribute provides critical accessibility support for visually impaired users using screen readers and displays fallback text if the image fails to load.'
 },
 {
 id: 5,
 topic: 'Form Elements',
 question: 'Which input type displays a toggleable round button where only one option in a grouped set can be selected at a time?',
 options: [
 '<input type="checkbox">',
 '<input type="button">',
 '<input type="radio">',
 '<input type="toggle">'
 ],
 correctAnswer: 2,
 explanation: 'Radio buttons (<input type="radio">) sharing the same "name" attribute restrict user selection to only one item in the group.'
 },
 {
 id: 6,
 topic: 'Head Metadata',
 question: 'Where should the <title> tag be placed inside an HTML document?',
 options: [
 'Inside the <body> tag at the very top',
 'Inside the <head> tag',
 'Directly after the </html> closing tag',
 'Inside a <header> element'
 ],
 correctAnswer: 1,
 explanation: 'The <title> tag belongs inside the <head> section; it determines the title shown on the browser tab and search engine results.'
 },
 {
 id: 7,
 topic: 'Lists',
 question: 'What is the correct tag for creating a numbered (ordered) list in HTML?',
 options: [
 '<ul>',
 '<nl>',
 '<ol>',
 '<list type="number">'
 ],
 correctAnswer: 2,
 explanation: '<ol> stands for Ordered List and produces an automatically numbered list containing <li> items.'
 },
 {
 id: 8,
 topic: 'Tables',
 question: 'Which HTML tag represents a single cell in a table body?',
 codeSnippet: `<tr>\n <td>Level 1</td>\n <td>100 XP</td>\n</tr>`,
 options: [
 '<th>',
 '<tc>',
 '<td>',
 '<cell>'
 ],
 correctAnswer: 2,
 explanation: '<td> stands for "table data" and represents a standard data cell inside a table row (<tr>).'
 },
 {
 id: 9,
 topic: 'Inline vs Block',
 question: 'Which of the following elements is inline by default?',
 options: [
 '<p>',
 '<span>',
 '<section>',
 '<h1>'
 ],
 correctAnswer: 1,
 explanation: '<span> is an inline element that does not start on a new line and only takes up as much width as its content.'
 },
 {
 id: 10,
 topic: 'HTML5 Semantics',
 question: 'What is the most suitable semantic element for encapsulating website navigation links?',
 options: [
 '<menu>',
 '<navigate>',
 '<nav>',
 '<links>'
 ],
 correctAnswer: 2,
 explanation: 'The <nav> element is intended specifically for major navigation blocks containing internal or external navigational links.'
 }
 ]
 },
 css: {
 id: 'css',
 courseId: 2,
 title: 'CSS Wizardry Quiz',
 tagline: 'The Aesthetics of Modern Web',
 desc: 'Challenge your understanding of the box model, Flexbox, CSS Grid, selectors, specificity, and responsive layouts.',
 difficulty: 'Intermediate',
 xpReward: 50,
 isPaid: false,
 icon: '/rainbow.png',
 badge: ' Free to Play',
 accentColor: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/50',
 questions: [
 {
 id: 1,
 topic: 'Box Model',
 question: 'With "box-sizing: border-box", what is included in the element\'s declared width and height?',
 options: [
 'Only the content area',
 'Content, padding, and border',
 'Content, padding, border, and margin',
 'Padding and margin only'
 ],
 correctAnswer: 1,
 explanation: '"box-sizing: border-box" calculates width and height to include the content, padding, and border, making responsive layouts much easier to manage.'
 },
 {
 id: 2,
 topic: 'Flexbox Alignment',
 question: 'In a flex container with "flex-direction: row", which property aligns items along the MAIN (horizontal) axis?',
 codeSnippet: `.container {\n display: flex;\n flex-direction: row;\n ___________: center;\n}`,
 options: [
 'align-items',
 'justify-content',
 'align-content',
 'place-items'
 ],
 correctAnswer: 1,
 explanation: 'justify-content aligns flex items along the main axis (horizontal when flex-direction is row), whereas align-items controls the cross axis.'
 },
 {
 id: 3,
 topic: 'Specificity',
 question: 'Which CSS selector has the HIGHEST specificity?',
 options: [
 '.card .header span (2 classes, 1 element)',
 '#super-hero (1 ID selector)',
 'div.container > p (1 class, 2 elements)',
 '* (universal selector)'
 ],
 correctAnswer: 1,
 explanation: 'An ID selector (#super-hero) has a specificity value of (1, 0, 0), easily overriding class selectors (0, 1, 0) and element selectors (0, 0, 1).'
 },
 {
 id: 4,
 topic: 'Display Property',
 question: 'What is the main difference between "display: none" and "visibility: hidden"?',
 options: [
 '"display: none" hides the element but keeps its occupied space; "visibility: hidden" removes the space',
 '"display: none" completely removes the element from document flow; "visibility: hidden" keeps its empty space',
 'There is no difference, both behave identically in all browsers',
 '"visibility: hidden" only applies to text, not images or containers'
 ],
 correctAnswer: 1,
 explanation: '"display: none" removes the element from rendering flow entirely, while "visibility: hidden" hides the visual pixels but preserves the dimensions and layout position.'
 },
 {
 id: 5,
 topic: 'CSS Grid',
 question: 'Which CSS Grid shorthand creates 3 equal-width columns that dynamically adapt to the container?',
 codeSnippet: `.grid {\n display: grid;\n grid-template-columns: _________;\n}`,
 options: [
 'repeat(3, 1fr)',
 '3fr 3fr 3fr',
 'auto auto auto auto',
 'columns(3, 33%)'
 ],
 correctAnswer: 0,
 explanation: 'repeat(3, 1fr) creates three equal columns, each taking one fraction (1fr) of the remaining available space.'
 },
 {
 id: 6,
 topic: 'Positioning',
 question: 'An element with "position: absolute" is positioned relative to what?',
 options: [
 'Always relative to the <body> element',
 'Relative to its nearest ancestor with a position other than "static"',
 'Relative to the user\'s screen resolution',
 'Relative to its next sibling element'
 ],
 correctAnswer: 1,
 explanation: 'An absolutely positioned element looks up its DOM tree for the closest ancestor with a position other than "static" (e.g. relative, absolute, fixed, sticky).'
 },
 {
 id: 7,
 topic: 'Units',
 question: 'What is the value of 1rem based on?',
 options: [
 'The font-size of the element\'s immediate parent',
 'The viewport height divided by 100',
 'The root (<html>) element\'s font-size',
 'The device screen DPI'
 ],
 correctAnswer: 2,
 explanation: '"rem" stands for "Root EM" and is relative directly to the font-size of the root <html> element (usually default 16px).'
 },
 {
 id: 8,
 topic: 'Pseudo-classes',
 question: 'Which pseudo-class targets an element only when a user navigates to it using the keyboard or clicks into an input?',
 options: [
 ':hover',
 ':active',
 ':focus',
 ':visited'
 ],
 correctAnswer: 2,
 explanation: ':focus applies when an interactive element (like an <input>, <button>, or <a>) receives keyboard or click focus.'
 },
 {
 id: 9,
 topic: 'Media Queries',
 question: 'What does the following media query target?',
 codeSnippet: `@media (min-width: 768px) {\n .sidebar { display: block; }\n}`,
 options: [
 'Screens that are at most 768px wide (mobile only)',
 'Screens that are 768px wide or wider (tablets and desktops)',
 'Devices in portrait orientation only',
 'Only screens that have exactly 768 pixels'
 ],
 correctAnswer: 1,
 explanation: 'min-width: 768px uses mobile-first styling and applies the rules for viewport widths of 768px and greater.'
 },
 {
 id: 10,
 topic: 'Z-Index & Stacking',
 question: 'Why might an element with "z-index: 9999" fail to appear on top of other elements?',
 options: [
 'It has position: static, so z-index has no effect without a positioned element',
 'z-index cannot exceed 1000 in standard CSS',
 'z-index only works inside <table> tags',
 'The element has a background color applied'
 ],
 correctAnswer: 0,
 explanation: 'z-index only applies to positioned elements (position: relative, absolute, fixed, or sticky) or children of flex/grid containers.'
 }
 ]
 },
 javascript: {
 id: 'javascript',
 courseId: 3,
 title: 'JavaScript Master Quiz',
 tagline: 'The Brain & Logic of the Web',
 desc: 'Put your JavaScript skills to the test! Dive into closures, promises, array methods, scoping, event loops, and DOM manipulation.',
 difficulty: 'Advanced',
 xpReward: 60,
 isPaid: true,
 requiredPlan: 'Adventurer & Legend',
 icon: '/star2.gif',
 badge: ' Adventurer & Legend',
 accentColor: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50',
 questions: [
 {
 id: 1,
 topic: 'Variables & Scope',
 question: 'What will be printed to the console?',
 codeSnippet: `console.log(x);\nvar x = 42;`,
 options: [
 '42',
 'ReferenceError: x is not defined',
 'undefined',
 'null'
 ],
 correctAnswer: 2,
 explanation: 'Variables declared with "var" are hoisted to the top of their scope and initialized with "undefined" before code execution.'
 },
 {
 id: 2,
 topic: 'Equality Comparison',
 question: 'What does the expression 0 == false and 0 === false evaluate to in JavaScript?',
 codeSnippet: `console.log(0 == false, 0 === false);`,
 options: [
 'true, true',
 'false, false',
 'true, false',
 'false, true'
 ],
 correctAnswer: 2,
 explanation: 'The loose equality operator (==) performs type coercion (0 coercing to false, yielding true), whereas strict equality (===) checks both type (number vs boolean) and value, yielding false.'
 },
 {
 id: 3,
 topic: 'Array Methods',
 question: 'Which array method transforms an array by applying a function to every element and returns a BRAND NEW array of the same length?',
 codeSnippet: `const scores = [10, 20, 30];\nconst doubled = scores.____(x => x * 2);`,
 options: [
 'forEach()',
 'map()',
 'filter()',
 'reduce()'
 ],
 correctAnswer: 1,
 explanation: 'map() returns a new array with the results of calling the provided callback function on every element without mutating the original array.'
 },
 {
 id: 4,
 topic: 'Closures & Scope',
 question: 'What is outputted when this function executes?',
 codeSnippet: `function createCounter() {\n let count = 0;\n return () => ++count;\n}\nconst counter = createCounter();\ncounter();\nconsole.log(counter());`,
 options: [
 '1',
 '2',
 'undefined',
 'ReferenceError'
 ],
 correctAnswer: 1,
 explanation: 'The inner arrow function forms a closure over the lexical environment containing "count". The first call counter() increments count to 1, and the second call increments and returns 2.'
 },
 {
 id: 5,
 topic: 'Asynchronous JavaScript',
 question: 'In what order are the numbers logged?',
 codeSnippet: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
 options: [
 '1, 2, 3, 4',
 '1, 4, 3, 2',
 '1, 4, 2, 3',
 '4, 1, 3, 2'
 ],
 correctAnswer: 1,
 explanation: 'Synchronous code runs first (1, 4). Microtasks (Promise.then callbacks) run next (3). Macrotasks (setTimeout) run after all microtasks have drained (2).'
 },
 {
 id: 6,
 topic: 'Typeof Operator',
 question: 'What is the output of typeof null in JavaScript?',
 codeSnippet: `console.log(typeof null);`,
 options: [
 '"null"',
 '"undefined"',
 '"object"',
 '"boolean"'
 ],
 correctAnswer: 2,
 explanation: 'In JavaScript, typeof null returns "object" — this is a historic quirk stemming from the first version of JS where object type tags were represented as 0 in binary memory.'
 },
 {
 id: 7,
 topic: 'Arrow Functions & "this"',
 question: 'How do arrow functions determine the value of the "this" keyword?',
 options: [
 'They bind "this" to whatever object called the method',
 'They inherit "this" lexically from the enclosing parent scope',
 'Their "this" is always bound to the global window/global object',
 'They cannot access "this" and will throw a SyntaxError'
 ],
 correctAnswer: 1,
 explanation: 'Arrow functions do not have their own "this" binding; they retain the "this" value of the enclosing lexical execution context.'
 },
 {
 id: 8,
 topic: 'DOM Manipulation',
 question: 'Which method adds a click event listener that does NOT overwrite existing click handlers on an element?',
 codeSnippet: `const btn = document.querySelector("#btn");`,
 options: [
 'btn.onclick = () => {}',
 'btn.attachClick(() => {})',
 'btn.addEventListener("click", () => {})',
 'btn.bind("click", () => {})'
 ],
 correctAnswer: 2,
 explanation: 'addEventListener() registers an event listener and allows multiple independent listeners to attach to the same event on an element.'
 },
 {
 id: 9,
 topic: 'Destructuring & Spread',
 question: 'What is the value of "rest"?',
 codeSnippet: `const [first, ...rest] = [10, 20, 30, 40];\nconsole.log(rest);`,
 options: [
 '10',
 '[20, 30, 40]',
 '[10, 20, 30, 40]',
 'undefined'
 ],
 correctAnswer: 1,
 explanation: 'The rest parameter (...rest) collects all remaining elements of the array into a new array: [20, 30, 40].'
 },
 {
 id: 10,
 topic: 'JSON & Objects',
 question: 'Which method converts a JavaScript object into a JSON string format?',
 options: [
 'JSON.parse()',
 'JSON.stringify()',
 'JSON.toObject()',
 'Object.toJSON()'
 ],
 correctAnswer: 1,
 explanation: 'JSON.stringify() serializes a JavaScript value or object into a standard valid JSON string.'
 }
 ]
 }
};
