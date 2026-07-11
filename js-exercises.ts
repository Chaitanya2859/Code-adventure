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

const baseHTML = (title: string, heading: string, sub: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="panel">
    <h1>${heading}</h1>
    <p>${sub}</p>
  </div>
  <script src="script.js" defer></script>
</body>
</html>`;

const baseCSS = (accent: string) => `body {
  font-family: 'Segoe UI', sans-serif;
  background: #0d1117;
  color: ${accent};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.panel {
  text-align: center;
  border: 2px solid ${accent};
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 0 20px ${accent}55;
  max-width: 480px;
}`;

export const newExercises: Record<string, Exercise> = {

  // ===================== 1. INTRODUCTION TO JAVASCRIPT =====================

  'first-script': {
    numberTitle: '01. First Script',
    mainHeading: 'Your First Script',
    introduction:
      "🎮 Welcome, Code Adventurer! Every legendary coder starts with a single line of code. Today you're going to write your very first JavaScript command and bring this page to life! ✨",
    conceptExplanation:
      "JavaScript is a programming language that runs inside your browser and can make web pages interactive. A <code>.js</code> file is where you write JavaScript instructions, called <strong>statements</strong>, which the browser reads and runs one by one.",
    funFact:
      "JavaScript was created in just 10 days in 1995 by Brendan Eich — and despite the name, it has almost nothing to do with the Java programming language!",
    relatedConcepts: [
      { title: 'Statements', desc: 'Individual instructions in your code, usually ending in a semicolon.' },
      { title: 'The Console', desc: "A tool for developers to see output and debug messages from their code." },
    ],
    taskTheme: '🚀 Launch your very first line of JavaScript and prove you belong on this quest!',
    steps: [
      'Open <code>script.js</code> in the editor.',
      'Write a statement using <code>console.log()</code> that prints the message <code>"Hello, Code Adventure!"</code>.',
      'Make sure your line ends with a semicolon <code>;</code>.',
      'Run your code and check the console panel for your greeting!',
    ],
    closingLine: "🏅 ACHIEVEMENT UNLOCKED: First Script Written! Every great codebase starts exactly like this. 🎉",
    hint: 'The syntax is <code>console.log("your message here");</code> — don\'t forget the quotation marks around your text!',
    defaultFiles: {
      html: baseHTML('First Script', '🎮 Code Adventure', 'Open the console to see your first script run!'),
      css: baseCSS('#58a6ff'),
      js: `// TODO: Use console.log() to print "Hello, Code Adventure!"
`,
    },
    language: 'js',
  },

  'console-log': {
    numberTitle: '02. Console Log',
    mainHeading: 'Console Log Mastery',
    introduction:
      "🕵️ Detective work time! The <code>console.log()</code> command is your magnifying glass — it lets you peek inside your code and see exactly what's happening. Let's put it to work! 🔍",
    conceptExplanation:
      "<code>console.log()</code> prints whatever you put inside its parentheses to the browser's developer console. You can log text, numbers, math results, or even multiple values separated by commas.",
    funFact:
      "Professional developers use console.log() constantly for debugging — it's often jokingly called 'programming by print statement', and it's still one of the most common debugging techniques even at big tech companies!",
    relatedConcepts: [
      { title: 'Strings', desc: 'Text values wrapped in quotes, like "hello".' },
      { title: 'Debugging', desc: 'The process of finding and fixing problems in your code.' },
    ],
    taskTheme: '🔍 Use your detective console to log three different clues and crack the case!',
    steps: [
      'Open <code>script.js</code>.',
      'Log the text <code>"Clue 1: The vault code is hidden"</code> using <code>console.log()</code>.',
      'On a new line, log the number <code>42</code> by itself.',
      'On a third line, log the result of <code>10 + 32</code> directly inside <code>console.log()</code>.',
      'Run your code and check the console — all three clues should appear in order!',
    ],
    closingLine: "🕵️ CASE CLOSED! Your console logging skills are sharp enough to crack any code mystery. 🎉",
    hint: 'You can call <code>console.log()</code> as many times as you want — each call prints on its own new line in the console.',
    defaultFiles: {
      html: baseHTML('Console Log', '🕵️ Detective Console', 'Open the console to review your logged clues!'),
      css: baseCSS('#3fb950'),
      js: `// TODO: Log "Clue 1: The vault code is hidden"

// TODO: Log the number 42

// TODO: Log the result of 10 + 32
`,
    },
    language: 'js',
  },

  'js-in-html': {
    numberTitle: '03. JS in HTML',
    mainHeading: 'JavaScript Inside HTML',
    introduction:
      "🔗 Time to connect the wires! JavaScript doesn't live alone — it needs to be linked to your HTML page so the browser knows to run it. Let's wire everything up! ⚡",
    conceptExplanation:
      "You connect a JavaScript file to an HTML page using a <code>&lt;script&gt;</code> tag with a <code>src</code> attribute pointing to your <code>.js</code> file. Adding the <code>defer</code> attribute makes sure the HTML loads fully before your script runs.",
    funFact:
      "In the early days of the web, developers wrote JavaScript directly inside HTML using inline event handlers like onclick=\"...\" — linking external files as we do today became the standard only as best practices matured.",
    relatedConcepts: [
      { title: 'The DOM', desc: 'The browser\'s live representation of your HTML page that JavaScript can read and change.' },
      { title: 'defer attribute', desc: 'Tells the browser to run the script only after the HTML has fully loaded.' },
    ],
    taskTheme: '⚡ Wire up the circuit board! Connect your script to the page and light up the console.',
    steps: [
      'Open <code>index.html</code>. Notice the <code>&lt;body&gt;</code> currently has no <code>&lt;script&gt;</code> tag.',
      'Add a <code>&lt;script src="script.js" defer&gt;&lt;/script&gt;</code> tag just before the closing <code>&lt;/body&gt;</code> tag.',
      'Open <code>script.js</code> and confirm it already logs a message.',
      'Run your code — if the wiring is correct, you\'ll see the message appear in the console!',
    ],
    closingLine: "⚡ CIRCUIT COMPLETE! HTML and JavaScript are now talking to each other perfectly. 🎉",
    hint: 'Your script tag needs three things: the <code>src</code> pointing to <code>"script.js"</code>, the <code>defer</code> keyword, and it must be placed inside the HTML file.',
    defaultFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>JS in HTML</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="panel">
    <h1>⚡ Circuit Board</h1>
    <p>Wire up the script tag below to power this page!</p>
  </div>
  <!-- TODO: Add your <script> tag here -->
</body>
</html>`,
      css: baseCSS('#f0883e'),
      js: `console.log("The circuit is powered! ⚡");
`,
    },
    language: 'html',
  },

  // ===================== 2. VARIABLES =====================

  'declare-variables': {
    numberTitle: '01. Declare Variables',
    mainHeading: 'Declaring Variables',
    introduction:
      "📦 Every adventurer needs a backpack to store their loot! Variables are just like labeled boxes that hold values for later use. Let's pack your first items! 🎒",
    conceptExplanation:
      "A variable is a named container for storing a value. You create one using <code>let</code> or <code>const</code>, followed by a name, an equals sign <code>=</code>, and the value you want to store.",
    funFact:
      "The keywords let and const were only added to JavaScript in 2015 (ES6) — before that, developers only had var, which caused a lot of tricky bugs due to how it behaved differently!",
    relatedConcepts: [
      { title: 'let', desc: 'Declares a variable that can be reassigned later.' },
      { title: 'const', desc: 'Declares a variable that cannot be reassigned.' },
    ],
    taskTheme: '🎒 Pack your adventurer backpack by declaring three variables to hold your gear!',
    steps: [
      'Open <code>script.js</code>.',
      'Declare a variable named <code>playerName</code> using <code>let</code> and set it to your favorite hero name as a string.',
      'Declare a variable named <code>playerLevel</code> using <code>let</code> and set it to the number <code>1</code>.',
      'Declare a variable named <code>hasSword</code> using <code>let</code> and set it to <code>true</code>.',
      'Log all three variables to the console to confirm your backpack is packed!',
    ],
    closingLine: "🎒 BACKPACK PACKED! You've successfully declared your first variables. Adventure awaits! 🎉",
    hint: 'The pattern is always: <code>let variableName = value;</code> — make sure your string value is wrapped in quotes.',
    defaultFiles: {
      html: baseHTML('Declare Variables', '🎒 Adventurer Backpack', 'Open the console to check your packed gear!'),
      css: baseCSS('#d29922'),
      js: `// TODO: Declare playerName (a string) using let

// TODO: Declare playerLevel (a number) using let

// TODO: Declare hasSword (a boolean) using let

// TODO: Log all three variables
`,
    },
    language: 'js',
  },

  'reassign-values': {
    numberTitle: '02. Reassign Values',
    mainHeading: 'Reassigning Values',
    introduction:
      "🔄 Your hero just leveled up! When values change over time — like a level counter going up — you need a variable that can be reassigned. Let's level up! ⭐",
    conceptExplanation:
      "Variables declared with <code>let</code> can be given a new value after they're created, simply by writing <code>variableName = newValue;</code> — no <code>let</code> keyword needed the second time.",
    funFact:
      "Reassignment is the backbone of almost every game score counter, timer, and progress bar you've ever seen in a video game or app!",
    relatedConcepts: [
      { title: 'let', desc: 'Allows a variable\'s value to change after declaration.' },
      { title: 'Increment (++)', desc: 'A shorthand operator that increases a number variable by 1.' },
    ],
    taskTheme: '⭐ Level up your hero by reassigning their level and updating their status!',
    steps: [
      'Open <code>script.js</code>. You\'ll see a variable <code>heroLevel</code> already declared with <code>let</code> and set to <code>1</code>.',
      'Log <code>heroLevel</code> to the console to see the starting value.',
      'Reassign <code>heroLevel</code> to <code>2</code> (without using <code>let</code> again).',
      'Log <code>heroLevel</code> again to confirm the level increased.',
      'Reassign the variable <code>heroStatus</code> from <code>"Resting"</code> to <code>"Ready for Battle"</code> and log it.',
    ],
    closingLine: "⭐ LEVEL UP COMPLETE! Your hero is stronger and ready for the next challenge. 🎉",
    hint: 'To reassign, just write <code>heroLevel = 2;</code> — leave out the <code>let</code> keyword since the variable already exists.',
    defaultFiles: {
      html: baseHTML('Reassign Values', '⭐ Hero Status', 'Open the console to track your hero\'s progress!'),
      css: baseCSS('#a371f7'),
      js: `let heroLevel = 1;
let heroStatus = "Resting";

// TODO: Log heroLevel

// TODO: Reassign heroLevel to 2

// TODO: Log heroLevel again

// TODO: Reassign heroStatus to "Ready for Battle" and log it
`,
    },
    language: 'js',
  },

  'let-const': {
    numberTitle: '03. Let vs Const',
    mainHeading: 'Let vs Const',
    introduction:
      "⚖️ Every adventurer must choose their tools wisely! Some values should stay locked forever (like a hero's birth year), while others need to change (like their health points). Let's learn when to use each! 🔒",
    conceptExplanation:
      "Use <code>const</code> when a value should never change after it's set — trying to reassign it causes an error. Use <code>let</code> when you expect the value to change later in your program.",
    funFact:
      "Many style guides recommend defaulting to const for everything, and only switching to let when you know for certain the value needs to change — it helps prevent accidental bugs!",
    relatedConcepts: [
      { title: 'const', desc: 'Locks a variable\'s value — reassignment throws an error.' },
      { title: 'let', desc: 'Allows reassignment, ideal for values that change over time.' },
    ],
    taskTheme: '🔒 Choose the right lock for each treasure — decide between let and const for your hero\'s stats!',
    steps: [
      'Open <code>script.js</code>.',
      'Declare <code>heroName</code> using <code>const</code> and set it to a name of your choice (this should never change).',
      'Declare <code>currentHP</code> using <code>let</code> and set it to <code>100</code> (this will change during battle).',
      'Simulate taking damage by reassigning <code>currentHP</code> to <code>75</code>.',
      'Log both <code>heroName</code> and <code>currentHP</code> to the console to check your hero\'s status.',
    ],
    closingLine: "🔒 WISE CHOICES MADE! You now know exactly when to lock a value and when to let it change. 🎉",
    hint: "If you try to reassign a <code>const</code> variable, JavaScript will throw a <code>TypeError</code> — that's how you know const is doing its job!",
    defaultFiles: {
      html: baseHTML('Let vs Const', '🔒 Hero Stat Vault', 'Open the console to check your hero\'s locked and unlocked stats!'),
      css: baseCSS('#db6d28'),
      js: `// TODO: Declare heroName using const

// TODO: Declare currentHP using let, starting at 100

// TODO: Reassign currentHP to 75 to simulate taking damage

// TODO: Log heroName and currentHP
`,
    },
    language: 'js',
  },

  // ===================== 3. STRINGS / NUMBERS / BOOLEANS =====================

  'string-practice': {
    numberTitle: '01. Strings',
    mainHeading: 'Working With Strings',
    introduction:
      "📜 A wise old scroll-keeper hands you an ancient scroll and says: 'Master the art of text, young coder, and you shall control every word in this kingdom!' Let's practice strings! ✍️",
    conceptExplanation:
      "A <strong>string</strong> is a piece of text in JavaScript, always wrapped in quotes — either single <code>'like this'</code>, double <code>\"like this\"</code>, or backticks <code>`like this`</code>. Strings can be joined together using the <code>+</code> operator.",
    funFact:
      "Backtick strings (called template literals) let you embed variables directly inside text using ${} — a feature added in 2015 that saved developers from writing messy string concatenation!",
    relatedConcepts: [
      { title: 'Concatenation', desc: 'Joining two or more strings together using +.' },
      { title: 'Template Literals', desc: 'Backtick strings that let you embed variables with ${}.' },
    ],
    taskTheme: '✍️ Inscribe a magical greeting scroll by combining strings together!',
    steps: [
      'Open <code>script.js</code>. You\'ll see a variable <code>scrollOwner</code> already set to a name.',
      'Declare a variable <code>greeting</code> and set it to the string <code>"Welcome to the kingdom, "</code>.',
      'Create a new variable <code>fullScroll</code> that joins <code>greeting</code> and <code>scrollOwner</code> together using <code>+</code>.',
      'Log <code>fullScroll</code> to the console to read your finished scroll.',
    ],
    closingLine: "📜 THE SCROLL IS INSCRIBED! Your words now hold the power of ancient string magic. 🎉",
    hint: 'Joining strings looks like: <code>greeting + scrollOwner</code> — make sure your <code>greeting</code> string ends with a space so the words don\'t squish together!',
    defaultFiles: {
      html: baseHTML('String Practice', '📜 Scroll of Strings', 'Open the console to read your magical scroll!'),
      css: baseCSS('#e3b341'),
      js: `const scrollOwner = "Sir Codealot";

// TODO: Declare greeting as "Welcome to the kingdom, "

// TODO: Combine greeting and scrollOwner into fullScroll

// TODO: Log fullScroll
`,
    },
    language: 'js',
  },

  'number-practice': {
    numberTitle: '02. Numbers',
    mainHeading: 'Working With Numbers',
    introduction:
      "🔢 The Royal Treasurer needs your help! Gold coins need to be counted, taxes calculated, and totals reported. Numbers are the currency of computation — let's crunch some! 💰",
    conceptExplanation:
      "JavaScript numbers can be whole (<code>integers</code>) or decimal (<code>floats</code>), and you can perform math directly using operators like <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>.",
    funFact:
      "Unlike many languages, JavaScript uses just one number type for both whole numbers and decimals — internally it's all stored as a 'double-precision floating point', following the international IEEE 754 standard!",
    relatedConcepts: [
      { title: 'Arithmetic Operators', desc: 'Symbols like +, -, *, / used to perform math.' },
      { title: 'Order of Operations', desc: 'JavaScript follows standard math rules (PEMDAS) when evaluating expressions.' },
    ],
    taskTheme: '💰 Help the Royal Treasurer calculate the kingdom\'s total gold reserves!',
    steps: [
      'Open <code>script.js</code>. You\'ll see two variables, <code>goldCoins</code> and <code>silverCoins</code>, already declared.',
      'Declare a variable <code>totalCoins</code> that adds <code>goldCoins</code> and <code>silverCoins</code> together.',
      'Declare a variable <code>taxAmount</code> that calculates 10% of <code>totalCoins</code> (multiply by <code>0.1</code>).',
      'Declare a variable <code>remainingCoins</code> that subtracts <code>taxAmount</code> from <code>totalCoins</code>.',
      'Log <code>totalCoins</code>, <code>taxAmount</code>, and <code>remainingCoins</code> to the console.',
    ],
    closingLine: "💰 THE ROYAL LEDGER IS BALANCED! The Treasurer bows in gratitude for your number skills. 🎉",
    hint: 'To calculate 10%, multiply the total by <code>0.1</code>, like this: <code>totalCoins * 0.1</code>.',
    defaultFiles: {
      html: baseHTML('Number Practice', '💰 Royal Treasury', 'Open the console to check the kingdom\'s finances!'),
      css: baseCSS('#f2cc60'),
      js: `const goldCoins = 240;
const silverCoins = 580;

// TODO: Declare totalCoins (goldCoins + silverCoins)

// TODO: Declare taxAmount (10% of totalCoins)

// TODO: Declare remainingCoins (totalCoins - taxAmount)

// TODO: Log totalCoins, taxAmount, and remainingCoins
`,
    },
    language: 'js',
  },

  'boolean-practice': {
    numberTitle: '03. Booleans',
    mainHeading: 'Working With Booleans',
    introduction:
      "🚪 A mysterious door blocks your path, guarded by a riddle-loving gatekeeper who only accepts TRUE or FALSE answers. Booleans are about to become your best friend! 🔑",
    conceptExplanation:
      "A <strong>boolean</strong> is a value that's either <code>true</code> or <code>false</code>. They're often the result of a comparison, like checking if one number is greater than another using <code>&gt;</code>.",
    funFact:
      "Booleans are named after George Boole, a 19th-century mathematician who invented Boolean algebra — a system of logic that computers still use today to make every single decision!",
    relatedConcepts: [
      { title: 'Comparison Operators', desc: 'Symbols like ==, >, < used to compare values and produce a boolean.' },
      { title: 'Logical Operators', desc: '&&, ||, and ! combine or invert boolean values.' },
    ],
    taskTheme: '🔑 Answer the gatekeeper\'s riddles with booleans to unlock the ancient door!',
    steps: [
      'Open <code>script.js</code>. You\'ll see variables <code>playerLevel</code> and <code>requiredLevel</code> already declared.',
      'Declare a variable <code>hasEnoughLevel</code> that checks if <code>playerLevel</code> is greater than or equal to <code>requiredLevel</code> using <code>&gt;=</code>.',
      'Declare a variable <code>hasKey</code> and set it directly to <code>true</code>.',
      'Declare a variable <code>canEnter</code> that combines <code>hasEnoughLevel</code> and <code>hasKey</code> using the <code>&amp;&amp;</code> operator.',
      'Log <code>canEnter</code> to the console to see if the gatekeeper lets you through!',
    ],
    closingLine: "🔑 THE DOOR CREAKS OPEN! Your mastery of true and false has unlocked the path forward. 🎉",
    hint: 'The <code>&amp;&amp;</code> operator only returns <code>true</code> if BOTH sides are <code>true</code> — like <code>hasEnoughLevel &amp;&amp; hasKey</code>.',
    defaultFiles: {
      html: baseHTML('Boolean Practice', '🚪 The Gatekeeper\'s Door', 'Open the console to see if the gate opens!'),
      css: baseCSS('#56d364'),
      js: `const playerLevel = 12;
const requiredLevel = 10;

// TODO: Declare hasEnoughLevel (playerLevel >= requiredLevel)

// TODO: Declare hasKey and set it to true

// TODO: Declare canEnter (hasEnoughLevel && hasKey)

// TODO: Log canEnter
`,
    },
    language: 'js',
  },

  // ===================== 4. OPERATORS =====================

  'math-operators': {
    numberTitle: '01. Math Operators',
    mainHeading: 'Math Operators',
    introduction:
      "🧙 A wizard's potion recipe requires precise measurements! One wrong calculation and the potion could explode. Let's use math operators to mix it perfectly! ⚗️",
    conceptExplanation:
      "JavaScript's math operators are <code>+</code> (add), <code>-</code> (subtract), <code>*</code> (multiply), <code>/</code> (divide), and <code>%</code> (modulo — gives the remainder after division).",
    funFact:
      "The modulo operator (%) is secretly one of the most useful tools in programming — it's how games check for 'every 3rd frame' effects, and how calendars figure out leap years!",
    relatedConcepts: [
      { title: 'Modulo (%)', desc: 'Returns the remainder of a division, useful for checking even/odd numbers.' },
      { title: 'Operator Precedence', desc: 'Multiplication and division happen before addition and subtraction.' },
    ],
    taskTheme: '⚗️ Mix the wizard\'s potion by calculating the exact ingredient measurements!',
    steps: [
      'Open <code>script.js</code>. You\'ll see <code>waterDrops</code> and <code>herbGrams</code> already declared.',
      'Declare <code>totalMixture</code> by adding <code>waterDrops</code> and <code>herbGrams</code>.',
      'Declare <code>potionStrength</code> by multiplying <code>herbGrams</code> by <code>3</code>.',
      'Declare <code>dropsRemainder</code> using the modulo operator to find the remainder of <code>waterDrops % 4</code>.',
      'Log <code>totalMixture</code>, <code>potionStrength</code>, and <code>dropsRemainder</code> to the console.',
    ],
    closingLine: "⚗️ POTION PERFECTED! The wizard is impressed by your precise mathematical brewing. 🎉",
    hint: 'The modulo operator <code>%</code> gives you the leftover amount after dividing — for example, <code>10 % 3</code> equals <code>1</code>.',
    defaultFiles: {
      html: baseHTML('Math Operators', '⚗️ Wizard\'s Cauldron', 'Open the console to check your potion measurements!'),
      css: baseCSS('#bc8cff'),
      js: `const waterDrops = 18;
const herbGrams = 7;

// TODO: Declare totalMixture (waterDrops + herbGrams)

// TODO: Declare potionStrength (herbGrams * 3)

// TODO: Declare dropsRemainder (waterDrops % 4)

// TODO: Log all three variables
`,
    },
    language: 'js',
  },

  'comparison-operators': {
    numberTitle: '02. Comparison',
    mainHeading: 'Comparison Operators',
    introduction:
      "⚖️ The Royal Judge needs to settle disputes in the kingdom! Comparison operators are the judge's gavel, deciding which value is bigger, smaller, or equal. Order in the court! 🔨",
    conceptExplanation:
      "Comparison operators compare two values and return a boolean. Key ones are <code>===</code> (strictly equal), <code>!==</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code>.",
    funFact:
      "JavaScript actually has two equality operators: == and ===. Using === (triple equals) is almost always recommended because it checks both value AND type, avoiding sneaky bugs from automatic type conversion!",
    relatedConcepts: [
      { title: 'Strict Equality (===)', desc: 'Compares both value and type — the safest way to check equality.' },
      { title: 'Loose Equality (==)', desc: 'Compares value only, converting types automatically — often avoided.' },
    ],
    taskTheme: '🔨 Help the Royal Judge settle three court cases using comparison operators!',
    steps: [
      'Open <code>script.js</code>. You\'ll see <code>defendantGold</code> and <code>plaintiffGold</code> already declared.',
      'Declare <code>isEqual</code> that checks if <code>defendantGold</code> is strictly equal (<code>===</code>) to <code>plaintiffGold</code>.',
      'Declare <code>defendantIsRicher</code> that checks if <code>defendantGold</code> is greater than <code>plaintiffGold</code>.',
      'Declare <code>caseIsValid</code> that checks if <code>defendantGold</code> is not equal (<code>!==</code>) to <code>0</code>.',
      'Log all three verdicts to the console.',
    ],
    closingLine: "🔨 CASE CLOSED! The Royal Judge declares your verdicts fair and logically sound. 🎉",
    hint: 'Always prefer <code>===</code> over <code>==</code> — it avoids unexpected type conversion surprises.',
    defaultFiles: {
      html: baseHTML('Comparison Operators', '🔨 Royal Courtroom', 'Open the console to hear the verdicts!'),
      css: baseCSS('#79c0ff'),
      js: `const defendantGold = 500;
const plaintiffGold = 500;

// TODO: Declare isEqual (defendantGold === plaintiffGold)

// TODO: Declare defendantIsRicher (defendantGold > plaintiffGold)

// TODO: Declare caseIsValid (defendantGold !== 0)

// TODO: Log all three verdicts
`,
    },
    language: 'js',
  },

  'logical-operators': {
    numberTitle: '03. Logical Operators',
    mainHeading: 'Logical Operators',
    introduction:
      "🛡️ A dragon blocks the bridge and demands proof of TWO conditions before letting anyone cross. Logical operators let you combine multiple checks into one powerful decision! 🐉",
    conceptExplanation:
      "Logical operators combine boolean values: <code>&amp;&amp;</code> (AND — both must be true), <code>||</code> (OR — at least one must be true), and <code>!</code> (NOT — flips true to false and vice versa).",
    funFact:
      "Logical AND (&&) and OR (||) in JavaScript use 'short-circuit evaluation' — meaning if the first condition already determines the result, JavaScript won't even bother checking the second one!",
    relatedConcepts: [
      { title: 'AND (&&)', desc: 'Returns true only if both conditions are true.' },
      { title: 'OR (||)', desc: 'Returns true if at least one condition is true.' },
    ],
    taskTheme: '🐉 Prove yourself to the bridge dragon by combining conditions with logical operators!',
    steps: [
      'Open <code>script.js</code>. You\'ll see <code>hasShield</code>, <code>hasPotion</code>, and <code>hasArmor</code> already declared.',
      'Declare <code>canCrossBridge</code> that checks if the player has BOTH <code>hasShield</code> AND <code>hasArmor</code> using <code>&amp;&amp;</code>.',
      'Declare <code>canSurviveFireBreath</code> that checks if the player has <code>hasPotion</code> OR <code>hasArmor</code> using <code>||</code>.',
      'Declare <code>isUnprepared</code> that uses <code>!</code> to invert <code>canCrossBridge</code>.',
      'Log all three results to the console.',
    ],
    closingLine: "🐉 THE DRAGON STEPS ASIDE! Your logical prowess has earned safe passage across the bridge. 🎉",
    hint: 'The <code>!</code> operator flips a boolean — <code>!true</code> becomes <code>false</code>, and <code>!false</code> becomes <code>true</code>.',
    defaultFiles: {
      html: baseHTML('Logical Operators', '🐉 The Dragon\'s Bridge', 'Open the console to see if you may pass!'),
      css: baseCSS('#ff7b72'),
      js: `const hasShield = true;
const hasPotion = false;
const hasArmor = true;

// TODO: Declare canCrossBridge (hasShield && hasArmor)

// TODO: Declare canSurviveFireBreath (hasPotion || hasArmor)

// TODO: Declare isUnprepared (!canCrossBridge)

// TODO: Log all three results
`,
    },
    language: 'js',
  },

  // ===================== 5. FUNCTIONS =====================

  'create-function': {
    numberTitle: '01. Create Function',
    mainHeading: 'Creating Functions',
    introduction:
      "🏭 Welcome to the Adventurer's Gear Factory! Instead of crafting each item by hand every time, you'll build a machine (a function!) that does the work for you whenever you need it. 🔧",
    conceptExplanation:
      "A <strong>function</strong> is a reusable block of code that performs a task. You create one using the <code>function</code> keyword, a name, parentheses <code>()</code>, and a body wrapped in curly braces <code>{}</code>.",
    funFact:
      "Functions are one of the oldest ideas in computer science, dating back to the 1950s — they let programmers avoid repeating the same code over and over, a principle often called 'DRY': Don't Repeat Yourself!",
    relatedConcepts: [
      { title: 'Function Declaration', desc: 'The function keyword followed by a name and body.' },
      { title: 'Calling a Function', desc: 'Running a function by writing its name followed by ().' },
    ],
    taskTheme: '🔧 Build your first gear-crafting machine and put it to work!',
    steps: [
      'Open <code>script.js</code>.',
      'Create a function named <code>craftSword</code> using the <code>function</code> keyword.',
      'Inside the function body, use <code>console.log()</code> to print <code>"A shiny new sword has been forged! ⚔️"</code>.',
      'Call <code>craftSword()</code> below your function to actually run it.',
      'Run your code and check the console to see your factory in action!',
    ],
    closingLine: "🔧 FACTORY ONLINE! Your first function is up and running, crafting gear on command. 🎉",
    hint: 'Don\'t forget to actually CALL your function after defining it — writing <code>function craftSword() {}</code> alone won\'t run the code inside; you need <code>craftSword();</code> too.',
    defaultFiles: {
      html: baseHTML('Create Function', '🔧 Gear Factory', 'Open the console to see your factory\'s output!'),
      css: baseCSS('#ffa657'),
      js: `// TODO: Create a function named craftSword

// TODO: Call craftSword() to run it
`,
    },
    language: 'js',
  },

  'return-values': {
    numberTitle: '02. Return Values',
    mainHeading: 'Returning Values',
    introduction:
      "📦 Your gear factory machine now needs to hand back the finished product instead of just announcing it! The <code>return</code> keyword lets your function send a value back to you. 🎁",
    conceptExplanation:
      "The <code>return</code> keyword sends a value out of a function so you can store it in a variable or use it elsewhere. Once <code>return</code> runs, the function stops immediately.",
    funFact:
      "Functions that don't explicitly use return still technically return a value in JavaScript — it's called undefined, silently returned by default!",
    relatedConcepts: [
      { title: 'return keyword', desc: 'Sends a value back out of a function and ends its execution.' },
      { title: 'Function Result', desc: 'The returned value can be stored in a variable for later use.' },
    ],
    taskTheme: '🎁 Upgrade your factory machine to hand back real, usable gear items!',
    steps: [
      'Open <code>script.js</code>.',
      'Create a function named <code>craftShield</code> that takes no parameters.',
      'Inside the function, use <code>return</code> to send back the string <code>"Iron Shield"</code>.',
      'Declare a variable <code>myShield</code> and set it equal to the result of calling <code>craftShield()</code>.',
      'Log <code>myShield</code> to the console to confirm you received your shield.',
    ],
    closingLine: "🎁 GEAR DELIVERED! Your function successfully returned real, usable loot. 🎉",
    hint: 'Make sure you store the function\'s output like this: <code>const myShield = craftShield();</code> — calling the function without saving the result will lose the returned value.',
    defaultFiles: {
      html: baseHTML('Return Values', '🎁 Gear Delivery', 'Open the console to see the item your function returned!'),
      css: baseCSS('#7ee787'),
      js: `// TODO: Create a function named craftShield that returns "Iron Shield"

// TODO: Declare myShield and set it to craftShield()

// TODO: Log myShield
`,
    },
    language: 'js',
  },

  'function-parameters': {
    numberTitle: '03. Parameters',
    mainHeading: 'Function Parameters',
    introduction:
      "🎯 Your factory machine is smart, but it always crafts the SAME sword! Let's give it parameters so it can craft custom gear based on whatever the adventurer requests. ⚙️",
    conceptExplanation:
      "<strong>Parameters</strong> are placeholder names listed inside a function's parentheses, letting you pass in different values (called <strong>arguments</strong>) each time you call it.",
    funFact:
      "You can give a function default parameter values, like function craft(item = \"Sword\"), so it still works even if you forget to pass an argument!",
    relatedConcepts: [
      { title: 'Parameters', desc: 'Named placeholders in a function definition.' },
      { title: 'Arguments', desc: 'The actual values you pass in when calling the function.' },
    ],
    taskTheme: '⚙️ Upgrade your factory to craft ANY item and quantity the adventurer requests!',
    steps: [
      'Open <code>script.js</code>.',
      'Create a function named <code>craftItem</code> that takes two parameters: <code>itemName</code> and <code>quantity</code>.',
      'Inside the function, <code>return</code> a string using template literals, like <code>`You crafted ${quantity} ${itemName}(s)!`</code>.',
      'Call <code>craftItem()</code> twice with different arguments — once for <code>"Potion"</code> with quantity <code>3</code>, and once for <code>"Arrow"</code> with quantity <code>10</code>.',
      'Log both results to the console.',
    ],
    closingLine: "⚙️ CUSTOM ORDERS FULFILLED! Your factory can now craft anything an adventurer asks for. 🎉",
    hint: 'Template literals use backticks and <code>${}</code> to insert variables directly into a string, like <code>`${quantity} items`</code>.',
    defaultFiles: {
      html: baseHTML('Function Parameters', '⚙️ Custom Gear Factory', 'Open the console to see your custom orders!'),
      css: baseCSS('#39d353'),
      js: `// TODO: Create craftItem(itemName, quantity) that returns a template literal string

// TODO: Call craftItem("Potion", 3) and log the result

// TODO: Call craftItem("Arrow", 10) and log the result
`,
    },
    language: 'js',
  },

  // ===================== 6. ARRAYS =====================

  'create-array': {
    numberTitle: '01. Create Array',
    mainHeading: 'Creating Arrays',
    introduction:
      "🎒 One box isn't enough for a real adventurer — you need a whole INVENTORY! Arrays let you store a whole list of items in a single organized container. Let's build your inventory! 📋",
    conceptExplanation:
      "An <strong>array</strong> is an ordered list of values, written with square brackets <code>[]</code> and separated by commas, like <code>const items = [\"sword\", \"shield\", \"potion\"];</code>.",
    funFact:
      "Arrays in JavaScript can hold mixed types all in one list — numbers, strings, booleans, even other arrays — all living together in the same container!",
    relatedConcepts: [
      { title: 'Square Bracket Syntax', desc: 'Arrays are always created and written using [].' },
      { title: '.length property', desc: 'Tells you how many items are in an array.' },
    ],
    taskTheme: '📋 Build your adventurer inventory by creating your very first array!',
    steps: [
      'Open <code>script.js</code>.',
      'Declare a variable named <code>inventory</code> using <code>const</code>.',
      'Set <code>inventory</code> to an array containing three strings: <code>"Sword"</code>, <code>"Shield"</code>, and <code>"Potion"</code>.',
      'Log <code>inventory</code> to the console to see your full item list.',
      'On a new line, log <code>inventory.length</code> to see how many items you\'re carrying.',
    ],
    closingLine: "📋 INVENTORY CREATED! You're now officially equipped and ready for adventure. 🎉",
    hint: 'Array syntax looks like: <code>const inventory = ["Sword", "Shield", "Potion"];</code> — commas separate each item.',
    defaultFiles: {
      html: baseHTML('Create Array', '📋 Adventurer Inventory', 'Open the console to check your gear list!'),
      css: baseCSS('#58a6ff'),
      js: `// TODO: Declare inventory as an array with "Sword", "Shield", "Potion"

// TODO: Log inventory

// TODO: Log inventory.length
`,
    },
    language: 'js',
  },

  'array-indexing': {
    numberTitle: '02. Indexing',
    mainHeading: 'Array Indexing',
    introduction:
      "🔢 Every item in your inventory has a specific slot number! Arrays are numbered starting from ZERO, and knowing how to grab exactly the item you want is a crucial adventurer skill. 🎯",
    conceptExplanation:
      "You access a specific array item using square brackets with its <strong>index</strong> — the position number, starting at <code>0</code>. So <code>items[0]</code> gets the FIRST item, not the second!",
    funFact:
      "Zero-based indexing (starting counts at 0 instead of 1) traces back to early computer memory addressing in the 1960s and 70s — it's a convention almost every major programming language still follows today!",
    relatedConcepts: [
      { title: 'Zero-Based Indexing', desc: 'The first item in an array is at index 0, not 1.' },
      { title: 'Negative Indexing Alternative', desc: 'Use array.length - 1 to safely get the last item.' },
    ],
    taskTheme: '🎯 Practice grabbing exact items from your inventory slots using indexing!',
    steps: [
      'Open <code>script.js</code>. You\'ll see an array called <code>inventory</code> already created.',
      'Declare a variable <code>firstItem</code> and set it to <code>inventory[0]</code>.',
      'Declare a variable <code>thirdItem</code> and set it to the third item in the array using the correct index.',
      'Declare a variable <code>lastItem</code> and set it to the last item using <code>inventory[inventory.length - 1]</code>.',
      'Log <code>firstItem</code>, <code>thirdItem</code>, and <code>lastItem</code> to the console.',
    ],
    closingLine: "🎯 BULLSEYE! You've mastered grabbing exactly the item you need from any slot. 🎉",
    hint: 'Remember: the first item is at index <code>0</code>, so the third item is at index <code>2</code>, not <code>3</code>!',
    defaultFiles: {
      html: baseHTML('Array Indexing', '🎯 Inventory Slots', 'Open the console to see which items you grabbed!'),
      css: baseCSS('#f778ba'),
      js: `const inventory = ["Sword", "Shield", "Potion", "Bow", "Map"];

// TODO: Declare firstItem (inventory[0])

// TODO: Declare thirdItem (the third item, correct index)

// TODO: Declare lastItem (inventory[inventory.length - 1])

// TODO: Log all three
`,
    },
    language: 'js',
  },

  'push-pop': {
    numberTitle: '03. Push & Pop',
    mainHeading: 'Push & Pop',
    introduction:
      "🎒 Loot found! Loot used! A real inventory needs to grow and shrink as you pick up new gear and use up potions. Time to learn <code>.push()</code> and <code>.pop()</code>! 📥📤",
    conceptExplanation:
      "<code>.push()</code> adds a new item to the END of an array. <code>.pop()</code> removes and returns the LAST item from an array. Both methods change the original array directly.",
    funFact:
      "Push and pop come from a computer science concept called a 'stack' — imagine a stack of plates where you can only add or remove from the top. It's used everywhere, including how your browser remembers 'back button' history!",
    relatedConcepts: [
      { title: '.push()', desc: 'Adds one or more items to the end of an array.' },
      { title: '.pop()', desc: 'Removes and returns the last item of an array.' },
    ],
    taskTheme: '📥📤 Manage your inventory in real-time by picking up new loot and using items!',
    steps: [
      'Open <code>script.js</code>. You\'ll see an array called <code>inventory</code> already created.',
      'Use <code>inventory.push()</code> to add <code>"Golden Key"</code> to the end of the array.',
      'Log <code>inventory</code> to see your updated loot.',
      'Use <code>inventory.pop()</code> to remove the last item, storing the removed item in a variable called <code>usedItem</code>.',
      'Log both <code>usedItem</code> and <code>inventory</code> to see what you used and what remains.',
    ],
    closingLine: "📥📤 INVENTORY MANAGED! You can now handle loot like a true dungeon-crawling pro. 🎉",
    hint: '<code>.pop()</code> returns the removed item, so you can capture it like this: <code>const usedItem = inventory.pop();</code>',
    defaultFiles: {
      html: baseHTML('Push & Pop', '📥📤 Live Inventory', 'Open the console to track your gear changes!'),
      css: baseCSS('#ffab70'),
      js: `const inventory = ["Sword", "Shield", "Potion"];

// TODO: Push "Golden Key" onto inventory

// TODO: Log inventory

// TODO: Pop the last item into a variable called usedItem

// TODO: Log usedItem and inventory
`,
    },
    language: 'js',
  },

  // ===================== 7. OBJECTS =====================

  'create-object': {
    numberTitle: '01. Create Object',
    mainHeading: 'Creating Objects',
    introduction:
      "🧝 Time to create your very own character sheet! Objects let you bundle related information together — like a hero's name, health, and level — all in one neat package. 📇",
    conceptExplanation:
      "An <strong>object</strong> stores data as <strong>key-value pairs</strong>, written with curly braces <code>{}</code>. Each key is a property name, followed by a colon <code>:</code> and its value, like <code>{ name: \"Zara\", level: 5 }</code>.",
    funFact:
      "Objects are so central to JavaScript that JSON (JavaScript Object Notation) — the most common data format used across the entire internet — is based directly on JavaScript's object syntax!",
    relatedConcepts: [
      { title: 'Key-Value Pairs', desc: 'Each property in an object has a name (key) and a value.' },
      { title: 'Curly Brace Syntax', desc: 'Objects are always created using {}.' },
    ],
    taskTheme: '📇 Create your hero\'s official character sheet as a JavaScript object!',
    steps: [
      'Open <code>script.js</code>.',
      'Declare a variable named <code>hero</code> using <code>const</code>.',
      'Set <code>hero</code> to an object with three properties: <code>name</code> (a string), <code>level</code> (a number), and <code>isAlive</code> (a boolean).',
      'Log <code>hero</code> to the console to see your character sheet.',
    ],
    closingLine: "📇 CHARACTER SHEET COMPLETE! Your hero is now officially registered in the system. 🎉",
    hint: 'Object syntax looks like: <code>const hero = { name: "Zara", level: 5, isAlive: true };</code> — use colons, not equals signs, between keys and values.',
    defaultFiles: {
      html: baseHTML('Create Object', '📇 Character Sheet', 'Open the console to view your hero\'s stats!'),
      css: baseCSS('#d2a8ff'),
      js: `// TODO: Declare hero as an object with name, level, and isAlive properties

// TODO: Log hero
`,
    },
    language: 'js',
  },

  'access-properties': {
    numberTitle: '02. Access Properties',
    mainHeading: 'Accessing Properties',
    introduction:
      "🔍 A scout needs to check a hero's exact stats before a big battle! Learn how to reach into an object and pull out exactly the property you need, using dot notation. 🗂️",
    conceptExplanation:
      "You access an object's property using <strong>dot notation</strong>: <code>objectName.propertyName</code>. You can also use bracket notation <code>objectName[\"propertyName\"]</code>, which is handy for dynamic property names.",
    funFact:
      "Bracket notation is required when a property name is stored in a variable, or when the property name contains spaces or special characters — dot notation only works with simple, valid names!",
    relatedConcepts: [
      { title: 'Dot Notation', desc: 'The most common way to access a property: object.property.' },
      { title: 'Bracket Notation', desc: 'An alternative access method: object["property"], useful for dynamic keys.' },
    ],
    taskTheme: '🗂️ Scout the battlefield by reading each of the hero\'s stats before combat begins!',
    steps: [
      'Open <code>script.js</code>. You\'ll see an object called <code>hero</code> already created.',
      'Log <code>hero.name</code> to the console using dot notation.',
      'Log <code>hero.level</code> using dot notation.',
      'Log <code>hero["isAlive"]</code> using bracket notation this time.',
    ],
    closingLine: "🗂️ SCOUTING COMPLETE! You now know exactly how to read any stat off a hero's sheet. 🎉",
    hint: 'Dot notation (<code>hero.name</code>) and bracket notation (<code>hero["name"]</code>) both work the same way — bracket notation just needs the property name in quotes.',
    defaultFiles: {
      html: baseHTML('Access Properties', '🗂️ Battlefield Scout Report', 'Open the console to view the hero\'s revealed stats!'),
      css: baseCSS('#a5d6ff'),
      js: `const hero = { name: "Zara", level: 5, isAlive: true };

// TODO: Log hero.name

// TODO: Log hero.level

// TODO: Log hero["isAlive"]
`,
    },
    language: 'js',
  },

  'modify-object': {
    numberTitle: '03. Modify Object',
    mainHeading: 'Modifying Objects',
    introduction:
      "⚔️ Battle is over, and it's time to update the records! Heroes level up, take damage, and earn new titles — let's learn how to update object properties after they've already been created. 📝",
    conceptExplanation:
      "You can change a property's value using dot or bracket notation, just like reassigning a variable: <code>hero.level = 6;</code>. You can also add brand-new properties this same way, even if they didn't exist before!",
    funFact:
      "Unlike arrays created with const, objects created with const CAN still have their properties changed — const only locks the variable itself from being reassigned to a totally new object!",
    relatedConcepts: [
      { title: 'Property Reassignment', desc: 'Updating an existing property\'s value using =.' },
      { title: 'Adding New Properties', desc: 'You can add properties to an object anytime using dot or bracket notation.' },
    ],
    taskTheme: '📝 Update the hero\'s record sheet after their latest victorious battle!',
    steps: [
      'Open <code>script.js</code>. You\'ll see the <code>hero</code> object already created.',
      'Update <code>hero.level</code> to <code>6</code> since the hero just leveled up.',
      'Add a brand-new property called <code>title</code> to <code>hero</code> and set it to <code>"Dragon Slayer"</code>.',
      'Log the entire updated <code>hero</code> object to the console.',
    ],
    closingLine: "📝 RECORDS UPDATED! The hero's legend grows with every battle you log. 🎉",
    hint: 'Adding a new property works exactly like updating one: <code>hero.title = "Dragon Slayer";</code> — JavaScript creates it automatically if it doesn\'t already exist.',
    defaultFiles: {
      html: baseHTML('Modify Object', '📝 Hero Record Sheet', 'Open the console to see the hero\'s updated file!'),
      css: baseCSS('#ff9bce'),
      js: `const hero = { name: "Zara", level: 5, isAlive: true };

// TODO: Update hero.level to 6

// TODO: Add a new property "title" set to "Dragon Slayer"

// TODO: Log the updated hero object
`,
    },
    language: 'js',
  },

  // ===================== 8. CONDITIONALS =====================

  'if-condition': {
    numberTitle: '01. If Condition',
    mainHeading: 'The If Statement',
    introduction:
      "🚦 A fork in the road appears before your hero! Should they go left or right? Programs make decisions too, using the <code>if</code> statement — your first taste of code that THINKS. 🧠",
    conceptExplanation:
      "An <code>if</code> statement runs a block of code only when a condition is <code>true</code>. The syntax is <code>if (condition) { // code here }</code> — if the condition is <code>false</code>, the block is simply skipped.",
    funFact:
      "The if statement exists in nearly every programming language ever created — it's considered one of the fundamental building blocks of computer logic, alongside loops and variables!",
    relatedConcepts: [
      { title: 'Condition', desc: 'An expression that evaluates to true or false, placed inside the if\'s parentheses.' },
      { title: 'Code Block', desc: 'The curly-braced section that only runs when the condition is true.' },
    ],
    taskTheme: '🧠 Guide your hero through the forked path using your first if statement!',
    steps: [
      'Open <code>script.js</code>. You\'ll see a variable <code>hasMap</code> already declared.',
      'Write an <code>if</code> statement that checks if <code>hasMap</code> is <code>true</code>.',
      'Inside the <code>if</code> block, log the message <code>"You found the shortcut through the forest! 🌲"</code>.',
      'Run your code and check the console for your hero\'s decision.',
    ],
    closingLine: "🧠 DECISION MADE! Your hero followed the correct path thanks to your first if statement. 🎉",
    hint: 'The basic shape is: <code>if (hasMap) { console.log("..."); }</code> — no need to write <code>=== true</code>, since <code>hasMap</code> is already a boolean.',
    defaultFiles: {
      html: baseHTML('If Condition', '🚦 The Forked Path', 'Open the console to see which path your hero takes!'),
      css: baseCSS('#58a6ff'),
      js: `const hasMap = true;

// TODO: Write an if statement that checks hasMap
// and logs "You found the shortcut through the forest! 🌲"
`,
    },
    language: 'js',
  },

  'else-if': {
    numberTitle: '02. Else If',
    mainHeading: 'Else If Chains',
    introduction:
      "🏆 The tournament judges need to award medals based on score ranges — gold, silver, bronze, or nothing at all! One <code>if</code> isn't enough; you need a whole chain of choices. Let's build it! 🥇",
    conceptExplanation:
      "You can chain multiple conditions using <code>else if</code>, and catch everything else with a final <code>else</code>. JavaScript checks each condition top to bottom and runs the FIRST one that's true, skipping the rest.",
    funFact:
      "Only the first matching condition in an if/else if/else chain ever runs — even if multiple conditions would technically be true, JavaScript stops checking as soon as it finds a match!",
    relatedConcepts: [
      { title: 'else if', desc: 'Checks an additional condition if the previous one was false.' },
      { title: 'else', desc: 'A fallback block that runs if none of the previous conditions were true.' },
    ],
    taskTheme: '🥇 Judge the tournament and award the correct medal based on the hero\'s score!',
    steps: [
      'Open <code>script.js</code>. You\'ll see a variable <code>score</code> already declared.',
      'Write an <code>if</code> statement checking if <code>score >= 90</code>, logging <code>"🥇 Gold Medal!"</code> if true.',
      'Add an <code>else if</code> checking if <code>score >= 75</code>, logging <code>"🥈 Silver Medal!"</code>.',
      'Add another <code>else if</code> checking if <code>score >= 50</code>, logging <code>"🥉 Bronze Medal!"</code>.',
      'Add a final <code>else</code> that logs <code>"No medal this time — train harder! 💪"</code>.',
    ],
    closingLine: "🥇 MEDALS AWARDED! Your else-if chain correctly judged every competitor. 🎉",
    hint: 'Check conditions from HIGHEST to LOWEST (like <code>90</code>, then <code>75</code>, then <code>50</code>) — otherwise a high score might accidentally match a lower condition first.',
    defaultFiles: {
      html: baseHTML('Else If', '🏆 Tournament Judging Stand', 'Open the console to see which medal was awarded!'),
      css: baseCSS('#e3b341'),
      js: `const score = 82;

// TODO: if (score >= 90) -> log "🥇 Gold Medal!"

// TODO: else if (score >= 75) -> log "🥈 Silver Medal!"

// TODO: else if (score >= 50) -> log "🥉 Bronze Medal!"

// TODO: else -> log "No medal this time — train harder! 💪"
`,
    },
    language: 'js',
  },

  'logical-checks': {
    numberTitle: '03. Logical Checks',
    mainHeading: 'Logical Checks in Conditionals',
    introduction:
      "🏰 The castle gate guard has strict rules: you need EITHER a royal invitation OR a guard escort — but you're immediately denied if you're carrying a weapon! Time to combine conditions like a pro. 🛡️",
    conceptExplanation:
      "You can combine multiple boolean checks directly inside an <code>if</code> statement's condition using <code>&amp;&amp;</code> (AND), <code>||</code> (OR), and <code>!</code> (NOT) — letting you build rich, multi-part decision logic.",
    funFact:
      "Complex logical conditions like this are the exact same logic used in real security systems, video game AI, and even spam filters — deciding what to allow and what to block!",
    relatedConcepts: [
      { title: 'Combined Conditions', desc: 'Using && and || inside an if statement\'s parentheses to check multiple things at once.' },
      { title: 'Parentheses Grouping', desc: 'Extra () can control which conditions are evaluated together.' },
    ],
    taskTheme: '🛡️ Guard the castle gate by combining multiple rules into one smart condition!',
    steps: [
      'Open <code>script.js</code>. You\'ll see <code>hasInvitation</code>, <code>hasEscort</code>, and <code>hasWeapon</code> already declared.',
      'Write an <code>if</code> statement that checks: (<code>hasInvitation</code> OR <code>hasEscort</code>) AND NOT <code>hasWeapon</code>.',
      'If the condition is true, log <code>"Welcome to the castle! 🏰"</code>.',
      'Add an <code>else</code> block that logs <code>"Access denied by the gate guard. 🚫"</code>.',
      'Run your code and check which message appears in the console.',
    ],
    closingLine: "🛡️ GATE SECURED! Your combined logical check keeps the castle safe from intruders. 🎉",
    hint: 'Use parentheses to group the OR check first: <code>if ((hasInvitation || hasEscort) && !hasWeapon) { ... }</code>',
    defaultFiles: {
      html: baseHTML('Logical Checks', '🛡️ Castle Gate Checkpoint', 'Open the console to see if you\'re granted entry!'),
      css: baseCSS('#ff7b72'),
      js: `const hasInvitation = false;
const hasEscort = true;
const hasWeapon = false;

// TODO: if ((hasInvitation || hasEscort) && !hasWeapon) -> log "Welcome to the castle! 🏰"

// TODO: else -> log "Access denied by the gate guard. 🚫"
`,
    },
    language: 'js',
  },

  // ===================== 9. LOOPS =====================

  'for-loop': {
    numberTitle: '01. For Loop',
    mainHeading: 'The For Loop',
    introduction:
      "🏃 A training sergeant demands the recruit run 5 laps around the yard — no more, no less! Instead of writing the same command 5 times, let's use a <code>for</code> loop to automate it. 🔁",
    conceptExplanation:
      "A <code>for</code> loop repeats a block of code a set number of times. It has three parts: a starting point (<code>let i = 0</code>), a condition to keep looping (<code>i &lt; 5</code>), and an update step (<code>i++</code>).",
    funFact:
      "The classic for loop structure has existed since the earliest days of programming languages like FORTRAN in the 1950s and is still one of the most-used pieces of syntax in all of software engineering!",
    relatedConcepts: [
      { title: 'Loop Counter', desc: 'A variable (often i) that tracks the current iteration of the loop.' },
      { title: 'Increment (i++)', desc: 'Increases the counter by 1 after each loop cycle.' },
    ],
    taskTheme: '🔁 Command the training yard by making the recruit run exactly 5 laps!',
    steps: [
      'Open <code>script.js</code>.',
      'Write a <code>for</code> loop that starts <code>let i = 1</code>, continues while <code>i &lt;= 5</code>, and increments with <code>i++</code>.',
      'Inside the loop, log a template literal string like <code>`Lap ${i} complete! 🏃`</code>.',
      'Run your code and check the console — you should see exactly 5 lap messages.',
    ],
    closingLine: "🔁 TRAINING COMPLETE! Your recruit finished all 5 laps thanks to your for loop. 🎉",
    hint: 'The full loop shape is: <code>for (let i = 1; i &lt;= 5; i++) { console.log(`Lap ${i} complete! 🏃`); }</code>',
    defaultFiles: {
      html: baseHTML('For Loop', '🏃 Training Yard', 'Open the console to track the recruit\'s laps!'),
      css: baseCSS('#3fb950'),
      js: `// TODO: Write a for loop from i = 1 to i <= 5
// Log "Lap \${i} complete! 🏃" on each iteration
`,
    },
    language: 'js',
  },

  'while-loop': {
    numberTitle: '02. While Loop',
    mainHeading: 'The While Loop',
    introduction:
      "🐉 A boss battle is underway! The dragon's health drops with every hit, but you don't know exactly how many hits it will take. A <code>while</code> loop keeps swinging until the job is done. ⚔️",
    conceptExplanation:
      "A <code>while</code> loop repeats code as long as a condition stays <code>true</code>. Unlike a <code>for</code> loop, you don't know the exact number of repeats ahead of time — you just know WHEN to stop.",
    funFact:
      "While loops are essential when you don't know the exact number of repetitions in advance — like waiting for user input, downloading a file, or (in your case) fighting a boss until its health hits zero!",
    relatedConcepts: [
      { title: 'Loop Condition', desc: 'The while loop keeps running as long as this stays true.' },
      { title: 'Infinite Loop Danger', desc: 'Forgetting to update your condition variable inside the loop can freeze your program!' },
    ],
    taskTheme: '⚔️ Battle the dragon by attacking repeatedly until its health reaches zero!',
    steps: [
      'Open <code>script.js</code>. You\'ll see a variable <code>dragonHealth</code> already set to <code>30</code>.',
      'Write a <code>while</code> loop that continues as long as <code>dragonHealth &gt; 0</code>.',
      'Inside the loop, subtract <code>10</code> from <code>dragonHealth</code> on each iteration.',
      'Also inside the loop, log a template literal like <code>`You strike the dragon! Health remaining: ${dragonHealth}`</code>.',
      'Run your code and check the console to watch the battle unfold.',
    ],
    closingLine: "⚔️ VICTORY! The dragon has been defeated by your relentless while loop attacks. 🎉",
    hint: 'Make sure you update <code>dragonHealth</code> INSIDE the loop (like <code>dragonHealth -= 10;</code>) — forgetting this creates an infinite loop that never stops!',
    defaultFiles: {
      html: baseHTML('While Loop', '⚔️ Dragon Boss Battle', 'Open the console to watch the battle play out!'),
      css: baseCSS('#ff7b72'),
      js: `let dragonHealth = 30;

// TODO: Write a while loop that runs while dragonHealth > 0
// Subtract 10 from dragonHealth each time
// Log "You strike the dragon! Health remaining: \${dragonHealth}"
`,
    },
    language: 'js',
  },

  'loop-array': {
    numberTitle: '03. Looping Arrays',
    mainHeading: 'Looping Through Arrays',
    introduction:
      "📜 The quest log has piled up with 5 unfinished quests! Instead of checking each one by hand, let's use a loop to march through the entire list and announce every quest automatically. 🗺️",
    conceptExplanation:
      "You can combine a <code>for</code> loop with an array's <code>.length</code> property to visit every single item, using the loop counter as the index: <code>array[i]</code>.",
    funFact:
      "Looping through arrays is so common that JavaScript also offers a simpler for...of loop and array methods like forEach() — but understanding the classic for loop version first makes those shortcuts much easier to understand later!",
    relatedConcepts: [
      { title: 'Array.length', desc: 'Used as the loop\'s stopping condition so you visit every item exactly once.' },
      { title: 'for...of loop', desc: 'A simpler alternative loop syntax specifically designed for iterating arrays.' },
    ],
    taskTheme: '🗺️ March through your quest log and announce every pending quest to the guild!',
    steps: [
      'Open <code>script.js</code>. You\'ll see an array called <code>quests</code> already created.',
      'Write a <code>for</code> loop starting at <code>let i = 0</code>, continuing while <code>i &lt; quests.length</code>, incrementing with <code>i++</code>.',
      'Inside the loop, log a template literal like <code>`Quest ${i + 1}: ${quests[i]}`</code>.',
      'Run your code and check the console — every quest should be announced in order.',
    ],
    closingLine: "🗺️ QUEST LOG CLEARED! Every pending adventure has been announced to the guild. 🎉",
    hint: 'Always loop with <code>i &lt; quests.length</code>, not a hardcoded number — this way your loop automatically adjusts if the array\'s size ever changes.',
    defaultFiles: {
      html: baseHTML('Looping Arrays', '🗺️ Guild Quest Board', 'Open the console to see every quest announced!'),
      css: baseCSS('#d29922'),
      js: `const quests = ["Slay the goblin", "Find the lost amulet", "Deliver the royal letter", "Explore the ice cave"];

// TODO: Write a for loop through quests
// Log "Quest \${i + 1}: \${quests[i]}" for each one
`,
    },
    language: 'js',
  },
};

export default newExercises;