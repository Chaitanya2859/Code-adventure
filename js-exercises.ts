interface Concept {
  title: string;
  desc: string;
}

interface CodeSnippet {
  html1: string;
  html2: string;
  css1: string;
  css2: string;
}

interface DefaultFiles {
  html: string;
  css?: string;
  js?: string;
}

interface Exercise {
  numberTitle: string;
  mainHeading: string;
  introduction: string;
  conceptExplanation: string;
  funFact?: string;
  relatedConcepts?: Concept[];
  taskTheme: string;
  steps: string[];
  codeSnippet?: CodeSnippet;
  closingLine?: string;
  hint: string;
  defaultFiles: DefaultFiles;
  language: 'html' | 'css' | 'js';
}

const jsExercises: Record<string, Exercise> = {

  'first-script': {
    numberTitle: '01. Your First Script',
    mainHeading: 'Your First Script',
    introduction: 'Every great programmer started with a single line of code. Today, that line is yours! JavaScript is the language that brings websites to life — and you\'re about to write your very first script. 🚀',
    conceptExplanation: 'JavaScript is a programming language that runs directly in the browser. A "script" is just a file containing JavaScript instructions. When the browser loads your page, it reads and runs your script automatically. You write JS in a `.js` file and link it to your HTML using a `&lt;script&gt;` tag.',
    funFact: 'JavaScript was created in just 10 days by Brendan Eich in 1995. It was originally called "Mocha", then "LiveScript", before finally being named JavaScript!',
    relatedConcepts: [
      { title: 'Script', desc: 'A file containing a sequence of instructions written in a programming language.' },
      { title: '&lt;script&gt; tag', desc: 'An HTML tag used to embed or reference JavaScript code in a web page.' },
      { title: 'Browser Runtime', desc: 'The environment inside a browser that reads and executes JavaScript code.' }
    ],
    taskTheme: 'Write your very first JavaScript instruction and watch the browser respond! 🎉',
    steps: [
      'Open the JS tab in the editor.',
      'Type <code>console.log("My first script!");</code> on the first line.',
      'Click Run and check the output area below — you should see your message printed!'
    ],
    closingLine: 'You just ran your first script — welcome to the world of programming! 🌍✨',
    hint: 'Make sure you are writing inside the JS tab, not the HTML tab. Use console.log("...") to print something.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Your First Script</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Check the console or output area below! 👇</h2>\n    <p>Use <strong>console.log()</strong> in the JS tab to print your first message.</p>\n  </body>\n</html>\n',
      js: '// Write your first JavaScript instruction below!\n'
    },
    language: 'js'
  },

  'console-log': {
    numberTitle: '02. Console Log',
    mainHeading: 'Console Log',
    introduction: 'Sometimes, you need a secret channel to talk to the browser or inspect what is happening behind the scenes. The JavaScript console is that channel! 🕵️',
    conceptExplanation: 'We use `console.log()` to print messages or evaluate values in the web developer console. It is the most common tool for debugging and diagnosing problems in JavaScript applications.',
    funFact: 'Almost all modern browsers have developer tools built right in. You can open them by pressing F12 or right-clicking on any page and selecting "Inspect"!',
    relatedConcepts: [
      { title: 'console.log()', desc: 'A built-in function that prints the provided argument to the debugging console.' },
      { title: 'Developer Tools', desc: 'A suite of web authoring and debugging tools built directly into modern browsers.' }
    ],
    taskTheme: 'Send your first message to the developer console! 📨',
    steps: [
      'Open the JS tab and write <code>console.log("Hello from the console!");</code>.',
      'Check the output area or your browser developer console to see the message.'
    ],
    closingLine: 'Message received loud and clear! 📡✨',
    hint: 'Type console.log("your message"); in the JS tab and click Run.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Console Log</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Open browser console to inspect output!</h2>\n  </body>\n</html>\n',
      js: '// Write your JavaScript below\n'
    },
    language: 'js'
  },

  'js-in-html': {
    numberTitle: '03. JS in HTML',
    mainHeading: 'JS in HTML',
    introduction: 'HTML builds the structure, but JavaScript is what makes it interactive. The two work as a team — and knowing how to connect them is your first superpower as a web developer! 🦸',
    conceptExplanation: 'You can include JavaScript in your HTML in two ways: inline using a `&lt;script&gt;` tag directly in the HTML file, or externally by linking a separate `.js` file with `&lt;script src="script.js"&gt;&lt;/script&gt;`. Using an external file keeps your code organised and is the industry standard.',
    funFact: 'The `defer` attribute on a script tag tells the browser to wait until the HTML is fully loaded before running the JavaScript — preventing common "element not found" bugs!',
    relatedConcepts: [
      { title: 'Inline Script', desc: 'JavaScript written directly inside &lt;script&gt; tags within an HTML file.' },
      { title: 'External Script', desc: 'JavaScript stored in a separate .js file and linked via the src attribute of a &lt;script&gt; tag.' },
      { title: 'defer', desc: 'A script attribute that delays JS execution until the HTML document has been fully parsed.' }
    ],
    taskTheme: 'Use JavaScript to change what appears on your webpage! 🖊️',
    steps: [
      'Look at the HTML tab — notice the &lt;script src="script.js" defer&gt;&lt;/script&gt; tag in the &lt;head&gt;.',
      'Open the JS tab and write <code>document.getElementById("output").textContent = "JS is connected!";</code>.',
      'Click Run — the text on the page should update!'
    ],
    closingLine: 'HTML and JS are now best friends, thanks to you! 🤝✨',
    hint: 'The HTML already has a <div id="output"> waiting. Use document.getElementById("output") in JS to target it.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>JS in HTML</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>JS in HTML</h2>\n    <div id="output">JavaScript has not run yet...</div>\n  </body>\n</html>\n',
      js: '// Use JavaScript to update the page!\n// Try: document.getElementById("output").textContent = "JS is connected!";\n'
    },
    language: 'js'
  },

  'declare-variables': {
    numberTitle: '04. Declare Variables',
    mainHeading: 'Declare Variables',
    introduction: 'Imagine you need to remember someone\'s name, their score, or whether they\'ve logged in. In JavaScript, you store information using variables — named containers that hold your data. 📦',
    conceptExplanation: 'A variable is declared using the `var`, `let`, or `const` keyword, followed by a name and an optional value. For example: `let name = "Alice";`. The variable name is like a label on a box — you use it to retrieve or update the value inside.',
    funFact: '`var` is the old way of declaring variables in JavaScript. Modern JS prefers `let` and `const` because they have safer, more predictable scoping rules.',
    relatedConcepts: [
      { title: 'Variable', desc: 'A named storage location that holds a value which can be referenced and manipulated in a program.' },
      { title: 'Declaration', desc: 'The act of creating a variable using a keyword like let, const, or var.' },
      { title: 'Assignment', desc: 'Setting a value to a variable using the = operator.' }
    ],
    taskTheme: 'Create your own variables and log them to the console! 🗂️',
    steps: [
      'In the JS tab, declare a variable: <code>let myName = "Your Name";</code>',
      'On the next line, declare another: <code>let myAge = 20;</code>',
      'Log both to the console: <code>console.log(myName, myAge);</code>',
      'Click Run and check the output!'
    ],
    closingLine: 'Variables stored and ready to use — great work! 🎯',
    hint: 'Use let to declare a variable: let variableName = value; Then use console.log(variableName) to print it.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Declare Variables</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Declare Variables</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Declare your variables below\n'
    },
    language: 'js'
  },

  'reassign-values': {
    numberTitle: '05. Reassign Values',
    mainHeading: 'Reassign Values',
    introduction: 'What if a player\'s score changes mid-game? Or a user updates their username? Variables declared with `let` can be updated anytime — that\'s what makes them powerful! 🔄',
    conceptExplanation: 'After declaring a variable with `let`, you can change its value by simply assigning a new one — no keyword needed the second time. For example: `let score = 0; score = 10;`. The variable now holds `10`. This is called reassignment.',
    funFact: 'Trying to reassign a `const` variable causes a TypeError — JavaScript won\'t allow it! That\'s why `const` is great for values that should never change.',
    relatedConcepts: [
      { title: 'Reassignment', desc: 'Changing the value stored in an existing variable using the = operator.' },
      { title: 'Mutable', desc: 'A value or variable that can be changed after it is created. `let` variables are mutable.' },
      { title: 'Immutable', desc: 'A value that cannot be changed after creation. `const` variables are immutable references.' }
    ],
    taskTheme: 'Track a score that changes over time using reassignment! 🎮',
    steps: [
      'Declare a variable: <code>let score = 0;</code>',
      'Log it: <code>console.log("Start:", score);</code>',
      'Reassign it: <code>score = 50;</code>',
      'Log again: <code>console.log("Updated:", score);</code>',
      'Run and see how the value changed!'
    ],
    closingLine: 'Variables that update — the backbone of every dynamic app! 💡',
    hint: 'After declaring with let, just use variableName = newValue; (no let keyword the second time).',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Reassign Values</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Reassign Values</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Declare a variable, then reassign it below\n'
    },
    language: 'js'
  },

  'let-const': {
    numberTitle: '06. Use let & const',
    mainHeading: 'Use let & const',
    introduction: 'Modern JavaScript gives you two great tools: `let` for values that will change, and `const` for values that stay fixed. Choosing the right one makes your code safer and easier to read! 🔐',
    conceptExplanation: '`let` declares a variable that can be reassigned later. `const` declares a constant — once set, it cannot be reassigned. Use `const` by default and only switch to `let` when you know the value will need to change. This is considered best practice in modern JavaScript.',
    funFact: '`const` does not make objects or arrays immutable — you can still modify their contents! It only prevents the variable from being reassigned to a different value entirely.',
    relatedConcepts: [
      { title: 'let', desc: 'Declares a block-scoped variable that can be reassigned.' },
      { title: 'const', desc: 'Declares a block-scoped variable that cannot be reassigned after initialisation.' },
      { title: 'Block Scope', desc: 'Variables declared with let or const only exist within the block {} they are defined in.' }
    ],
    taskTheme: 'Decide what should be let and what should be const — and test the rules! ⚖️',
    steps: [
      'Declare: <code>const PI = 3.14159;</code> — this should never change.',
      'Declare: <code>let lives = 3;</code> — this will change.',
      'Log both: <code>console.log(PI, lives);</code>',
      'Reassign lives: <code>lives = 2;</code> and log again.',
      'Try reassigning PI and observe the error!'
    ],
    closingLine: 'Knowing when to use let vs const is a sign of a thoughtful programmer! 🏆',
    hint: 'Use const for values that should not change (like PI), and let for values that will update (like a score or counter).',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Use let &amp; const</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Use let &amp; const</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice using let and const below\n'
    },
    language: 'js'
  },

  'string-practice': {
    numberTitle: '07. String Practice',
    mainHeading: 'String Practice',
    introduction: 'Strings are how JavaScript handles text — names, messages, URLs, and more. Mastering strings means you can build anything from chat apps to search engines! 💬',
    conceptExplanation: 'A string is a sequence of characters wrapped in single quotes (`\'..\'`), double quotes (`"..."`), or backticks (`` `...` ``). Backtick strings (called template literals) are especially powerful because they allow you to embed variables directly using `${variable}` syntax.',
    funFact: 'You can find the length of any string using `.length` — so `"hello".length` returns `5`. This is used in everything from password validation to character counters!',
    relatedConcepts: [
      { title: 'String', desc: 'A data type representing a sequence of characters, used to store text.' },
      { title: 'Template Literal', desc: 'A string defined with backticks that can embed expressions using ${} syntax.' },
      { title: 'Concatenation', desc: 'Joining two or more strings together using the + operator.' }
    ],
    taskTheme: 'Build a personal greeting using string techniques! 👋',
    steps: [
      'Declare: <code>const firstName = "Your Name";</code>',
      'Declare: <code>const greeting = `Hello, ${firstName}! Welcome to JavaScript.`;</code>',
      'Log it: <code>console.log(greeting);</code>',
      'Also log: <code>console.log("Length:", greeting.length);</code>',
      'Click Run and see your greeting!'
    ],
    closingLine: 'Strings are the voice of your program — and now you speak fluently! 🗣️✨',
    hint: 'Use backticks for template literals: `Hello, ${variableName}!` — it\'s cleaner than concatenation with +.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>String Practice</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>String Practice</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice strings below\n'
    },
    language: 'js'
  },

  'number-practice': {
    numberTitle: '08. Number Practice',
    mainHeading: 'Number Practice',
    introduction: 'From prices to scores to temperatures, numbers are everywhere in programming. JavaScript handles both integers and decimals with the same `number` type — simple and flexible! 🔢',
    conceptExplanation: 'In JavaScript, all numbers — whether whole (`42`) or decimal (`3.14`) — are of type `number`. You can do arithmetic with `+`, `-`, `*`, `/`, and get the remainder with `%`. The `Math` object provides extra tools like `Math.round()`, `Math.floor()`, and `Math.max()`.',
    funFact: '`NaN` stands for "Not a Number" and is paradoxically of type `number` in JavaScript. It appears when you do invalid math like `"text" / 2`.',
    relatedConcepts: [
      { title: 'Number', desc: 'A JavaScript data type that represents both integer and floating-point values.' },
      { title: 'NaN', desc: 'A special value meaning "Not a Number", returned when a math operation fails.' },
      { title: 'Math Object', desc: 'A built-in JavaScript object with properties and methods for mathematical operations.' }
    ],
    taskTheme: 'Do some calculations and explore the number type! 🧮',
    steps: [
      'Declare: <code>const price = 49.99;</code> and <code>const quantity = 3;</code>',
      'Calculate total: <code>const total = price * quantity;</code>',
      'Log: <code>console.log("Total:", total);</code>',
      'Try: <code>console.log(Math.round(total));</code>',
      'Run and check the results!'
    ],
    closingLine: 'Numbers crunched perfectly — you\'re already thinking like a developer! 💰',
    hint: 'Use * for multiplication and Math.round() to round a decimal to the nearest whole number.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Number Practice</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Number Practice</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice numbers below\n'
    },
    language: 'js'
  },

  'boolean-practice': {
    numberTitle: '09. Boolean Practice',
    mainHeading: 'Boolean Practice',
    introduction: 'Every decision in a program comes down to a simple question: is this true or false? Booleans are the yes/no switches that power all logic in JavaScript! ✅❌',
    conceptExplanation: 'A boolean is a data type with only two possible values: `true` or `false`. Booleans are typically the result of comparisons (like `5 > 3`) or stored directly (`let isLoggedIn = true`). They are the foundation of all conditional logic in programming.',
    funFact: 'The word "Boolean" comes from George Boole, a 19th-century mathematician who invented Boolean algebra — the math that modern computers are built on!',
    relatedConcepts: [
      { title: 'Boolean', desc: 'A data type with only two values: true or false.' },
      { title: 'Truthy', desc: 'A value that evaluates to true in a boolean context (e.g., non-zero numbers, non-empty strings).' },
      { title: 'Falsy', desc: 'A value that evaluates to false in a boolean context (e.g., 0, "", null, undefined, NaN).' }
    ],
    taskTheme: 'Explore true, false, and what makes a value truthy or falsy! 🔍',
    steps: [
      'Declare: <code>const isOnline = true;</code>',
      'Declare: <code>const hasPermission = false;</code>',
      'Log both: <code>console.log(isOnline, hasPermission);</code>',
      'Try a comparison: <code>console.log(10 > 5);</code>',
      'Check a falsy value: <code>console.log(Boolean(0));</code>'
    ],
    closingLine: 'True or false — now you can make decisions in code! ⚖️✨',
    hint: 'Boolean() converts any value to its true/false equivalent. Try Boolean(0), Boolean("hello"), Boolean(null) to see what\'s truthy and falsy.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Boolean Practice</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Boolean Practice</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice booleans below\n'
    },
    language: 'js'
  },

  'math-operators': {
    numberTitle: '10. Math Operators',
    mainHeading: 'Math Operators',
    introduction: 'JavaScript is a powerful calculator. Whether you\'re splitting a bill, calculating game scores, or building a finance app — math operators are your toolkit! ➕➖✖️➗',
    conceptExplanation: 'JavaScript supports all standard arithmetic operators: `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%` (modulo/remainder), and `**` (exponentiation). There are also shorthand operators like `+=`, `-=`, `++`, and `--` to update variables quickly.',
    funFact: 'The modulo operator `%` is incredibly useful in programming — it can tell you if a number is even or odd, cycle through items in a list, or wrap a clock from 12 back to 1!',
    relatedConcepts: [
      { title: 'Arithmetic Operators', desc: 'Symbols like +, -, *, / that perform mathematical calculations.' },
      { title: 'Modulo (%)', desc: 'Returns the remainder after dividing one number by another. E.g., 7 % 3 = 1.' },
      { title: 'Increment / Decrement', desc: '++ and -- operators that add or subtract 1 from a variable.' }
    ],
    taskTheme: 'Build a mini calculator using different math operators! 🧮',
    steps: [
      'Declare: <code>let a = 20;</code> and <code>let b = 6;</code>',
      'Log: <code>console.log(a + b, a - b, a * b, a / b);</code>',
      'Log the remainder: <code>console.log(a % b);</code>',
      'Try exponentiation: <code>console.log(2 ** 8);</code>',
      'Use shorthand: <code>a += 10; console.log(a);</code>'
    ],
    closingLine: 'Math done, operators mastered — your calculator skills are real! 🏅',
    hint: 'Use % to get the remainder of a division. For example, 10 % 3 gives 1 because 10 divided by 3 leaves a remainder of 1.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Math Operators</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Math Operators</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice math operators below\n'
    },
    language: 'js'
  },

  'comparison-operators': {
    numberTitle: '11. Comparison Operators',
    mainHeading: 'Comparison Operators',
    introduction: 'How does JavaScript know if a user is old enough to sign up, or if a score qualifies for the leaderboard? By comparing values! Comparison operators return `true` or `false`. 🔍',
    conceptExplanation: 'Comparison operators compare two values and return a boolean. Key ones: `==` (equal value, loose), `===` (equal value AND type, strict), `!=`, `!==`, `>`, `<`, `>=`, `<=`. Always prefer `===` over `==` in modern JavaScript to avoid unexpected type coercion.',
    funFact: '`==` in JavaScript does type coercion, so `"5" == 5` is `true`! That\'s why `===` (strict equality) exists — `"5" === 5` is `false` because the types differ.',
    relatedConcepts: [
      { title: '=== (Strict Equality)', desc: 'Checks that two values are equal in both value and data type.' },
      { title: '== (Loose Equality)', desc: 'Checks value equality but performs type coercion, which can lead to unexpected results.' },
      { title: 'Type Coercion', desc: 'JavaScript automatically converting one data type to another during comparison.' }
    ],
    taskTheme: 'Compare values and reveal the true/false results! ⚖️',
    steps: [
      'Declare: <code>const age = 18;</code>',
      'Log: <code>console.log(age >= 18);</code> — is the user an adult?',
      'Compare types: <code>console.log("18" === 18);</code> — strict check',
      'Compare types (loose): <code>console.log("18" == 18);</code> — spot the difference!',
      'Try: <code>console.log(age !== 21);</code>'
    ],
    closingLine: 'Comparisons mastered — you can now make JavaScript ask the right questions! 🎯',
    hint: 'Always prefer === over == to avoid bugs from type coercion. "5" === 5 is false because one is a string and the other is a number.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Comparison Operators</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Comparison Operators</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice comparison operators below\n'
    },
    language: 'js'
  },

  'logical-operators': {
    numberTitle: '12. Logical Operators',
    mainHeading: 'Logical Operators',
    introduction: 'What if a user needs to be both over 18 AND have a valid email to sign up? Or maybe a discount applies if they\'re a student OR a senior? Logical operators combine conditions! 🧠',
    conceptExplanation: 'Logical operators combine boolean expressions. `&&` (AND) returns true only if both sides are true. `||` (OR) returns true if at least one side is true. `!` (NOT) flips the value — `!true` becomes `false`. These are the building blocks of complex decision-making in code.',
    funFact: 'JavaScript uses "short-circuit evaluation" — with `&&`, if the left side is false, it stops and never checks the right side. With `||`, if the left is true, it skips the right. This is used as a performance trick by experienced developers!',
    relatedConcepts: [
      { title: '&& (AND)', desc: 'Returns true only if both the left and right expressions are true.' },
      { title: '|| (OR)', desc: 'Returns true if at least one of the expressions is true.' },
      { title: '! (NOT)', desc: 'Reverses a boolean value — !true becomes false, and !false becomes true.' }
    ],
    taskTheme: 'Build a multi-condition check for an imaginary app! 🔐',
    steps: [
      'Declare: <code>const isAdult = true;</code> and <code>const hasAccount = false;</code>',
      'AND check: <code>console.log(isAdult &amp;&amp; hasAccount);</code>',
      'OR check: <code>console.log(isAdult || hasAccount);</code>',
      'NOT check: <code>console.log(!hasAccount);</code>',
      'Combine them: <code>console.log(isAdult &amp;&amp; !hasAccount);</code>'
    ],
    closingLine: 'Logic unlocked — your code can now think in combinations! 🧩✨',
    hint: 'Use && when ALL conditions must be true, || when ANY condition can be true, and ! to flip a boolean.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Logical Operators</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Logical Operators</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice logical operators below\n'
    },
    language: 'js'
  },

  'create-function': {
    numberTitle: '13. Create Function',
    mainHeading: 'Create Function',
    introduction: 'Imagine writing the same 10 lines of code over and over. Painful, right? Functions let you write code once and reuse it as many times as you want — they\'re the ultimate productivity hack! ⚙️',
    conceptExplanation: 'A function is a reusable block of code that performs a specific task. You define it once using the `function` keyword (or as an arrow function), then call it by name whenever you need it. Functions make code organised, readable, and DRY (Don\'t Repeat Yourself).',
    funFact: 'In JavaScript, functions are "first-class citizens" — they can be stored in variables, passed as arguments to other functions, and even returned from functions. This enables powerful patterns like callbacks!',
    relatedConcepts: [
      { title: 'Function Declaration', desc: 'Defining a function using the function keyword: function myFunc() { ... }' },
      { title: 'Function Call', desc: 'Executing a function by writing its name followed by parentheses: myFunc()' },
      { title: 'DRY Principle', desc: 'Don\'t Repeat Yourself — a coding principle that encourages reusing code through functions.' }
    ],
    taskTheme: 'Write a function that greets any user by name! 👋',
    steps: [
      'Define a function: <code>function greet() { console.log("Hello, World!"); }</code>',
      'Call it: <code>greet();</code>',
      'Click Run and see the output.',
      'Call it multiple times: <code>greet(); greet(); greet();</code>',
      'Notice how you reused the same code effortlessly!'
    ],
    closingLine: 'One function, infinite uses — you just levelled up your code game! 🎮✨',
    hint: 'Define the function first using function name() { ... }, then call it by writing name(); below.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Create Function</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Create Function</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Define and call your function below\n'
    },
    language: 'js'
  },

  'return-values': {
    numberTitle: '14. Return Values',
    mainHeading: 'Return Values',
    introduction: 'A function that just prints is useful, but a function that hands back a result you can use? That\'s a whole new level of power. The `return` keyword turns functions into answer machines! 🔮',
    conceptExplanation: 'The `return` statement exits a function and sends a value back to wherever the function was called. For example, `function add(a, b) { return a + b; }` — calling `add(3, 4)` gives back `7`, which you can store in a variable or use directly.',
    funFact: 'A function that doesn\'t explicitly return a value automatically returns `undefined` in JavaScript. Many bugs come from forgetting to `return`!',
    relatedConcepts: [
      { title: 'return', desc: 'A keyword that ends function execution and specifies the value to send back to the caller.' },
      { title: 'Return Value', desc: 'The value a function produces and sends back when it is called.' },
      { title: 'undefined', desc: 'The default return value of a function that has no explicit return statement.' }
    ],
    taskTheme: 'Build a function that calculates and returns a result you can reuse! 🔁',
    steps: [
      'Write: <code>function square(n) { return n * n; }</code>',
      'Store the result: <code>const result = square(5);</code>',
      'Log it: <code>console.log(result);</code>',
      'Use it directly: <code>console.log(square(3) + square(4));</code>',
      'Run and verify the outputs!'
    ],
    closingLine: 'Return values: turning functions into building blocks you can stack! 🏗️✨',
    hint: 'Inside your function, write return someValue; to send a result back. Then you can use it like: const x = myFunction();',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Return Values</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Return Values</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write a function that returns a value\n'
    },
    language: 'js'
  },

  'function-parameters': {
    numberTitle: '15. Function Parameters',
    mainHeading: 'Function Parameters',
    introduction: 'What if your greet function could say hello to *anyone*, not just "World"? Parameters let you pass custom inputs into a function, making it flexible and dynamic! 🎛️',
    conceptExplanation: 'Parameters are variables listed inside the parentheses when you define a function. When you call the function, you pass in values called arguments. For example: `function greet(name) { ... }` — `name` is the parameter, and `"Alice"` in `greet("Alice")` is the argument.',
    funFact: 'JavaScript functions don\'t complain if you call them with too many or too few arguments. Missing parameters become `undefined`, and extra ones are silently ignored (unless you use the `arguments` object or rest parameters).',
    relatedConcepts: [
      { title: 'Parameter', desc: 'A named variable inside the function definition that receives an incoming value.' },
      { title: 'Argument', desc: 'The actual value passed into a function when it is called.' },
      { title: 'Default Parameter', desc: 'A fallback value assigned to a parameter if no argument is provided: function greet(name = "Guest") { ... }' }
    ],
    taskTheme: 'Create a flexible function that works with any input you give it! 🎯',
    steps: [
      'Write: <code>function greet(name) { console.log(`Hello, ${name}!`); }</code>',
      'Call it: <code>greet("Alice");</code>',
      'Call it again: <code>greet("Bob");</code>',
      'Add a default: <code>function greet(name = "Guest") { ... }</code>',
      'Call with no argument: <code>greet();</code> — see the default in action!'
    ],
    closingLine: 'Flexible functions with parameters — the secret to writing reusable code! 🔑✨',
    hint: 'Put the parameter name inside the parentheses when defining the function: function myFunc(param) { ... }. Then pass a value when calling it: myFunc("value");',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Function Parameters</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Function Parameters</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Create a function with parameters below\n'
    },
    language: 'js'
  },

  'create-array': {
    numberTitle: '16. Create Array',
    mainHeading: 'Create Array',
    introduction: 'What if you need to store a whole list of items — like a shopping cart, a playlist, or a leaderboard? That\'s what arrays are for. One variable, many values! 📋',
    conceptExplanation: 'An array is an ordered list of values stored in a single variable. You create one using square brackets: `let fruits = ["apple", "banana", "mango"];`. Arrays can hold any mix of data types — numbers, strings, booleans, even other arrays. Each item has a position called its index.',
    funFact: 'Arrays in JavaScript are zero-indexed — meaning the first item is at position 0, not 1. This trips up almost every beginner at least once!',
    relatedConcepts: [
      { title: 'Array', desc: 'An ordered collection of values stored in a single variable, created with square brackets [].' },
      { title: 'Element', desc: 'A single value stored inside an array.' },
      { title: 'Index', desc: 'The numeric position of an element in an array, starting at 0.' }
    ],
    taskTheme: 'Create a list of your favourite things using an array! 📝',
    steps: [
      'Create an array: <code>const colours = ["red", "green", "blue"];</code>',
      'Log the whole array: <code>console.log(colours);</code>',
      'Log just one item: <code>console.log(colours[0]);</code>',
      'Log the array\'s length: <code>console.log(colours.length);</code>',
      'Run and inspect the output!'
    ],
    closingLine: 'Arrays created — you can now store entire lists in a single variable! 🗃️✨',
    hint: 'Create an array with square brackets: const myList = ["item1", "item2", "item3"]; Then access items with myList[0], myList[1], etc.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Create Array</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Create Array</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Create your array below\n'
    },
    language: 'js'
  },

  'array-indexing': {
    numberTitle: '17. Array Indexing',
    mainHeading: 'Array Indexing',
    introduction: 'Storing data in an array is great — but how do you pull out exactly the item you need? With indexing! It\'s like picking the right book off a numbered shelf. 📚',
    conceptExplanation: 'Every element in an array has an index — a number that represents its position, starting from `0`. To access an element, you write `arrayName[index]`. The last element is always at index `array.length - 1`. You can also update elements by assigning a new value to a specific index.',
    funFact: 'You can access the last element of any array without knowing its size using `arr[arr.length - 1]`. Many developers also now use the new `arr.at(-1)` method, which does the same thing!',
    relatedConcepts: [
      { title: 'Zero-Based Indexing', desc: 'Arrays start counting at 0, so the first element is at index 0.' },
      { title: 'Bracket Notation', desc: 'The syntax array[index] used to access or update elements in an array.' },
      { title: '.length', desc: 'A property that returns the number of elements in an array.' }
    ],
    taskTheme: 'Access and update specific items in your array by index! 🎯',
    steps: [
      'Create: <code>const planets = ["Mercury", "Venus", "Earth", "Mars"];</code>',
      'Log the first planet: <code>console.log(planets[0]);</code>',
      'Log the last planet: <code>console.log(planets[planets.length - 1]);</code>',
      'Update an element: <code>planets[1] = "VENUS";</code>',
      'Log the full array again: <code>console.log(planets);</code>'
    ],
    closingLine: 'Index accessed — you can now pinpoint any item in a list! 🔭✨',
    hint: 'Remember: arrays start at index 0. So the second item is at index 1. Use array[index] to access or update any element.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Array Indexing</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Array Indexing</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice array indexing below\n'
    },
    language: 'js'
  },

  'push-pop': {
    numberTitle: '18. Push & Pop',
    mainHeading: 'Push & Pop',
    introduction: 'Arrays would be pretty limited if you couldn\'t add or remove items on the fly. `push` and `pop` let you treat your array like a dynamic stack — perfect for todo lists, history stacks, and more! 📤📥',
    conceptExplanation: '`array.push(item)` adds one or more elements to the **end** of an array. `array.pop()` removes the **last** element and returns it. These two methods are the most common way to modify arrays dynamically. There\'s also `unshift` (add to front) and `shift` (remove from front).',
    funFact: 'A "stack" is a classic data structure that works exactly like push/pop — Last In, First Out (LIFO). Your browser\'s back button is essentially a stack!',
    relatedConcepts: [
      { title: '.push()', desc: 'Adds one or more elements to the end of an array and returns the new length.' },
      { title: '.pop()', desc: 'Removes and returns the last element of an array.' },
      { title: 'Stack (LIFO)', desc: 'A data structure where the last item added is the first one removed — like a stack of plates.' }
    ],
    taskTheme: 'Build a dynamic shopping list using push and pop! 🛒',
    steps: [
      'Create: <code>const cart = ["apples", "bread"];</code>',
      'Add an item: <code>cart.push("milk");</code>',
      'Log the cart: <code>console.log(cart);</code>',
      'Remove the last item: <code>const removed = cart.pop();</code>',
      'Log what was removed and the updated cart: <code>console.log(removed, cart);</code>'
    ],
    closingLine: 'Push and pop mastered — your arrays are now truly dynamic! 🎉✨',
    hint: 'Use cart.push("item") to add to the end. Use cart.pop() to remove the last item. Store the result of pop() if you want to know what was removed.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Push &amp; Pop</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Push &amp; Pop</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice push and pop below\n'
    },
    language: 'js'
  },

  'create-object': {
    numberTitle: '19. Create Object',
    mainHeading: 'Create Object',
    introduction: 'Arrays store lists. But what if you need to store structured data about one thing — like a user\'s name, age, and email? Objects let you group related information together under one roof! 🏠',
    conceptExplanation: 'An object is a collection of key-value pairs. You create one using curly braces: `const user = { name: "Alice", age: 25 };`. Each key is a property name, and each value can be any data type — string, number, boolean, array, or even another object.',
    funFact: 'Almost everything in JavaScript is secretly an object — arrays, functions, dates, and more. Understanding objects unlocks the deeper mechanics of the language!',
    relatedConcepts: [
      { title: 'Object', desc: 'A collection of named values (key-value pairs) stored in a single variable.' },
      { title: 'Property', desc: 'A key-value pair within an object. The key is a name, and the value is the stored data.' },
      { title: 'Object Literal', desc: 'The shorthand syntax for creating objects using curly braces {}.' }
    ],
    taskTheme: 'Create a profile object to represent a person or character! 🧑‍💻',
    steps: [
      'Create an object: <code>const person = { name: "Alex", age: 22, isStudent: true };</code>',
      'Log the whole object: <code>console.log(person);</code>',
      'Log one property: <code>console.log(person.name);</code>',
      'Log another: <code>console.log(person.age);</code>',
      'Run and inspect the structure!'
    ],
    closingLine: 'Object created — now you can model real-world things in code! 🌍✨',
    hint: 'Create an object with curly braces: const obj = { key1: value1, key2: value2 }; Then access properties with obj.key1.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Create Object</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Create Object</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Create your object below\n'
    },
    language: 'js'
  },

  'access-properties': {
    numberTitle: '20. Access Properties',
    mainHeading: 'Access Properties',
    introduction: 'Creating an object is just the start — you need to know how to reach inside and pull out exactly the data you want. There are two ways to do it, and each has its place! 🗝️',
    conceptExplanation: 'You can access object properties using dot notation (`obj.key`) or bracket notation (`obj["key"]`). Dot notation is cleaner and preferred when the key name is known. Bracket notation is needed when the key is stored in a variable or contains special characters.',
    funFact: 'Bracket notation is what makes dynamic property access possible — for example, `obj[userInput]` lets the user decide which property to retrieve at runtime!',
    relatedConcepts: [
      { title: 'Dot Notation', desc: 'Accessing a property using a period: object.propertyName.' },
      { title: 'Bracket Notation', desc: 'Accessing a property using square brackets: object["propertyName"] or object[variable].' },
      { title: 'Dynamic Access', desc: 'Using a variable as the key in bracket notation to access properties at runtime.' }
    ],
    taskTheme: 'Access properties from a user profile using both notations! 🔑',
    steps: [
      'Create: <code>const user = { name: "Jordan", age: 28, role: "developer" };</code>',
      'Dot notation: <code>console.log(user.name);</code>',
      'Bracket notation: <code>console.log(user["role"]);</code>',
      'Dynamic key: <code>const key = "age"; console.log(user[key]);</code>',
      'Run and compare the results!'
    ],
    closingLine: 'Property access mastered — you can now read any data from any object! 📖✨',
    hint: 'Use object.property for regular access, and object["property"] when the key is in a variable or has special characters.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Access Properties</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Access Properties</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice accessing object properties below\n'
    },
    language: 'js'
  },

  'modify-object': {
    numberTitle: '21. Modify Object',
    mainHeading: 'Modify Object',
    introduction: 'Objects aren\'t static snapshots — they can evolve. Update a user\'s email, add a new field, or remove an outdated one. Objects in JavaScript are mutable and flexible! 🔧',
    conceptExplanation: 'You can add a new property by simply assigning to it: `obj.newKey = value;`. To update an existing one, reassign it the same way. To remove a property entirely, use the `delete` keyword: `delete obj.key;`. These operations make objects great for tracking changing state.',
    funFact: 'You can check if a property exists in an object using the `in` operator: `"name" in user` returns `true` if `name` is a key. This is handy before trying to access a property that might not exist!',
    relatedConcepts: [
      { title: 'Property Update', desc: 'Changing the value of an existing property by reassigning it: obj.key = newValue.' },
      { title: 'Property Addition', desc: 'Adding a new key-value pair to an existing object: obj.newKey = value.' },
      { title: 'delete', desc: 'A keyword that removes a property from an object: delete obj.key.' }
    ],
    taskTheme: 'Update, add, and delete properties from a profile object! ✏️',
    steps: [
      'Create: <code>const profile = { username: "coder99", level: 1 };</code>',
      'Update: <code>profile.level = 5;</code>',
      'Add a new property: <code>profile.badges = ["starter", "explorer"];</code>',
      'Delete a property: <code>delete profile.username;</code>',
      'Log the final object: <code>console.log(profile);</code>'
    ],
    closingLine: 'Object modified — you can now shape data structures on the fly! 🎨✨',
    hint: 'To add or update: obj.key = value; To remove: delete obj.key; Then log the object to see the changes.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Modify Object</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Modify Object</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Practice modifying an object below\n'
    },
    language: 'js'
  },

  'if-condition': {
    numberTitle: '22. If Condition',
    mainHeading: 'If Condition',
    introduction: 'Programs need to make decisions. Should the user see a welcome screen or a login page? Should a discount be applied? The `if` statement is how your code chooses! 🤔',
    conceptExplanation: 'An `if` statement runs a block of code only when a specified condition is `true`. The syntax is: `if (condition) { // code to run }`. If the condition is false, the block is skipped entirely. You can add an `else` block to handle the false case.',
    funFact: 'Every time you see "if" in spoken English used to express a condition, it maps almost directly to an `if` statement in code. Programming is surprisingly close to how we think!',
    relatedConcepts: [
      { title: 'if Statement', desc: 'Executes a block of code only when a condition evaluates to true.' },
      { title: 'else', desc: 'An optional block that runs when the if condition is false.' },
      { title: 'Condition', desc: 'An expression that evaluates to true or false, used to control program flow.' }
    ],
    taskTheme: 'Write a condition that gives different responses based on a score! 🎮',
    steps: [
      'Declare: <code>const score = 75;</code>',
      'Write an if-else: <code>if (score >= 50) { console.log("Pass!"); } else { console.log("Fail."); }</code>',
      'Click Run — which message appears?',
      'Change score to 30 and run again.',
      'Observe how the output changes!'
    ],
    closingLine: 'Your code can now make decisions — the foundation of all logic! 🧠✨',
    hint: 'The condition goes inside if ( ... ) — if it\'s true, the code in { } runs. Otherwise the else { } block runs.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>If Condition</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>If Condition</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write your if condition below\n'
    },
    language: 'js'
  },

  'else-if': {
    numberTitle: '23. Else If',
    mainHeading: 'Else If',
    introduction: 'Sometimes there are more than two possibilities. What if a score could be an A, B, C, or fail? `else if` lets you chain multiple conditions together and handle every case! 🪜',
    conceptExplanation: '`else if` extends an `if` statement to check additional conditions when the first one is false. JavaScript checks each condition from top to bottom and executes the first block that is true. If none match, the final `else` block runs as a fallback.',
    funFact: 'If you have many discrete cases to check, a `switch` statement can be more readable than a long chain of `else if` blocks. Both are valid; the choice depends on the situation!',
    relatedConcepts: [
      { title: 'else if', desc: 'Adds an additional condition to an if statement, checked only when the previous condition was false.' },
      { title: 'Chained Conditions', desc: 'Multiple if / else if / else blocks that evaluate conditions in sequence.' },
      { title: 'switch', desc: 'An alternative to else if chains for comparing a single value against multiple cases.' }
    ],
    taskTheme: 'Build a grade calculator using if, else if, and else! 🏫',
    steps: [
      'Declare: <code>const score = 82;</code>',
      'Write: <code>if (score >= 90) { console.log("A"); } else if (score >= 80) { console.log("B"); } else if (score >= 70) { console.log("C"); } else { console.log("Fail"); }</code>',
      'Run — what grade does 82 get?',
      'Try different score values and run again.',
      'Trace through which condition fires each time!'
    ],
    closingLine: 'Multi-branch logic complete — your code can handle any scenario! 🗺️✨',
    hint: 'JavaScript checks conditions from top to bottom. The first one that is true runs — and the rest are skipped.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Else If</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Else If</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write your if / else if / else chain below\n'
    },
    language: 'js'
  },

  'logical-checks': {
    numberTitle: '24. Logical Checks',
    mainHeading: 'Logical Checks',
    introduction: 'Real-world decisions are rarely simple. A user might need to be logged in AND have a premium account to access a feature. Combining conditions with logical operators gives your `if` statements real power! 💡',
    conceptExplanation: 'You can combine conditions inside `if` statements using `&&` (AND), `||` (OR), and `!` (NOT). For example: `if (isLoggedIn && isPremium)` only runs if both are true. This lets you encode complex business rules cleanly without nesting lots of separate `if` blocks.',
    funFact: 'The "ternary operator" is a one-line shortcut for simple if/else: `condition ? valueIfTrue : valueIfFalse`. For example: `let label = age >= 18 ? "Adult" : "Minor";`',
    relatedConcepts: [
      { title: 'Combined Conditions', desc: 'Using && or || to combine multiple boolean expressions inside a single if statement.' },
      { title: 'Ternary Operator', desc: 'A shorthand for if/else: condition ? trueValue : falseValue.' },
      { title: 'Guard Clause', desc: 'An early if check that exits or returns before the main logic runs, reducing nesting.' }
    ],
    taskTheme: 'Write a smart access checker using combined logical conditions! 🔐',
    steps: [
      'Declare: <code>const isLoggedIn = true;</code> and <code>const isPremium = false;</code>',
      'Write: <code>if (isLoggedIn &amp;&amp; isPremium) { console.log("Full access"); } else if (isLoggedIn) { console.log("Basic access"); } else { console.log("Please log in"); }</code>',
      'Run and see which message shows.',
      'Try: <code>const label = isPremium ? "Premium" : "Free"; console.log(label);</code>',
      'Change the variables and re-run to test all branches!'
    ],
    closingLine: 'Complex conditions conquered — your logic skills are sharpening fast! ⚔️✨',
    hint: 'Use && when both conditions must be true, || when either one works. The ternary operator is great for simple true/false choices in one line.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Logical Checks</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Logical Checks</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write your logical checks below\n'
    },
    language: 'js'
  },

  'for-loop': {
    numberTitle: '25. For Loop',
    mainHeading: 'For Loop',
    introduction: 'Imagine printing "Hello" 100 times. You wouldn\'t write 100 lines — you\'d use a loop! Loops are one of the most powerful tools in programming, letting you repeat actions efficiently. 🔁',
    conceptExplanation: 'A `for` loop repeats a block of code a set number of times. It has three parts: initialisation (`let i = 0`), condition (`i < 5`), and update (`i++`). The loop runs as long as the condition is true, and the update step runs after each iteration.',
    funFact: 'The variable `i` in for loops stands for "index" or "iterator". It\'s a universal convention in programming — you\'ll see it in code from every language!',
    relatedConcepts: [
      { title: 'for Loop', desc: 'A loop that repeats code a fixed number of times using an initialiser, condition, and update.' },
      { title: 'Iteration', desc: 'One pass through a loop body. A loop with 5 iterations runs its code 5 times.' },
      { title: 'Loop Counter', desc: 'A variable (often i) that tracks the current iteration of a loop.' }
    ],
    taskTheme: 'Use a for loop to count, repeat, and iterate! 🔢',
    steps: [
      'Write: <code>for (let i = 0; i &lt; 5; i++) { console.log("Iteration:", i); }</code>',
      'Run and watch the output count from 0 to 4.',
      'Change the limit to 10 and run again.',
      'Try: <code>for (let i = 1; i &lt;= 5; i++) { console.log(i * i); }</code> — print squares!',
      'Understand each part: init, condition, update.'
    ],
    closingLine: 'Loops unlocked — you can now make computers do repetitive work so you don\'t have to! 🤖✨',
    hint: 'The three parts of a for loop are separated by semicolons: for (start; condition; update). The loop stops when the condition becomes false.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>For Loop</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>For Loop</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write your for loop below\n'
    },
    language: 'js'
  },

  'while-loop': {
    numberTitle: '26. While Loop',
    mainHeading: 'While Loop',
    introduction: 'A `for` loop is great when you know how many times to repeat. But what about when you want to keep going until something changes — like waiting for a user to guess correctly? That\'s the `while` loop! ⏳',
    conceptExplanation: 'A `while` loop repeats its code block as long as a condition remains `true`. Unlike the `for` loop, you manage the counter manually. It\'s perfect for situations where the number of repetitions isn\'t known in advance — just make sure the condition eventually becomes false, or you\'ll create an infinite loop!',
    funFact: 'An infinite loop (`while(true) { ... }`) is intentionally used in some programs — like game loops or server listeners — that should run forever until explicitly stopped.',
    relatedConcepts: [
      { title: 'while Loop', desc: 'Repeats a block of code as long as its condition evaluates to true.' },
      { title: 'Infinite Loop', desc: 'A loop that never ends because the condition never becomes false. Usually a bug, but sometimes intentional.' },
      { title: 'do...while', desc: 'A variant of while that runs the code block at least once before checking the condition.' }
    ],
    taskTheme: 'Use a while loop to simulate a countdown! 🚀',
    steps: [
      'Declare: <code>let count = 5;</code>',
      'Write: <code>while (count &gt; 0) { console.log("Count:", count); count--; }</code>',
      'Run and watch it count down from 5 to 1.',
      'Add after the loop: <code>console.log("Blast off! 🚀");</code>',
      'Run again and see the full countdown!'
    ],
    closingLine: 'While loops mastered — now you can keep code running for as long as it needs! 🕹️✨',
    hint: 'Make sure your loop condition eventually becomes false! In the countdown, count-- reduces count each time until it hits 0 and the loop stops.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>While Loop</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>While Loop</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Write your while loop below\n'
    },
    language: 'js'
  },

  'loop-array': {
    numberTitle: '27. Loop Through Array',
    mainHeading: 'Loop Through Array',
    introduction: 'Arrays and loops are made for each other. One stores a list; the other visits every item on that list. Together, they let you process entire datasets with just a few lines of code! 🔗',
    conceptExplanation: 'You can loop through an array using a `for` loop with the index (`for (let i = 0; i < arr.length; i++)`), a `for...of` loop for cleaner syntax (`for (const item of arr)`), or the `.forEach()` method. `for...of` is the most modern and readable for simply visiting each element.',
    funFact: 'JavaScript arrays also have powerful built-in methods like `.map()`, `.filter()`, and `.reduce()` that loop under the hood. Mastering these will make your code dramatically cleaner — they\'re worth exploring after this lesson!',
    relatedConcepts: [
      { title: 'for...of Loop', desc: 'A modern loop that iterates directly over the values of an iterable like an array.' },
      { title: '.forEach()', desc: 'An array method that executes a function once for each element.' },
      { title: '.map()', desc: 'An array method that creates a new array by applying a function to each element.' }
    ],
    taskTheme: 'Loop through a list and process each item! 📋',
    steps: [
      'Create: <code>const fruits = ["apple", "banana", "mango", "grape"];</code>',
      'Use a for loop: <code>for (let i = 0; i &lt; fruits.length; i++) { console.log(fruits[i]); }</code>',
      'Run — all fruits print!',
      'Now try for...of: <code>for (const fruit of fruits) { console.log("I like", fruit); }</code>',
      'Compare both approaches — notice how for...of is cleaner!'
    ],
    closingLine: 'Arrays looped, data processed — you now wield the full power of lists in JavaScript! 🏆✨',
    hint: 'Use for...of for the cleanest syntax: for (const item of myArray) { ... }. It automatically gives you each element without needing to manage an index.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Loop Through Array</title>\n    <script src="script.js" defer></script>\n  </head>\n  <body>\n    <h2>Loop Through Array</h2>\n    <p>Check the console or output area for your results.</p>\n  </body>\n</html>\n',
      js: '// Loop through your array below\n'
    },
    language: 'js'
  }

};

export default jsExercises;
