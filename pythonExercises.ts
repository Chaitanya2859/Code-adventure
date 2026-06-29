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

const PYODIDE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Python Sandbox</title>
    <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" crossorigin><\/script>
    <style>
      body {
        background: #0b0f19;
        color: #38bdf8;
        font-family: monospace;
        padding: 20px;
        font-size: 14px;
        line-height: 1.6;
      }
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin-top: 15px;
      }
      .loading { color: #64748b; }
      .ready { color: #10b981; font-weight: bold; }
    </style>
  </head>
  <body>
    <div id="status" class="loading">Loading Python WASM environment...</div>
    <pre id="output"></pre>
    <script type="text/python" id="code"><\/script>
    <script>
      async function main() {
        try {
          let pyodide = await loadPyodide();
          const statusEl = document.getElementById("status");
          statusEl.innerText = "Python Environment: Ready";
          statusEl.className = "ready";
          pyodide.setStdout({
            batched: (text) => {
              const outputEl = document.getElementById("output");
              outputEl.innerText += text + "\\n";
              console.log(text);
            }
          });
          pyodide.setStderr({
            batched: (text) => {
              const outputEl = document.getElementById("output");
              outputEl.innerText += "Error: " + text + "\\n";
              console.error(text);
            }
          });
          const pythonCode = document.getElementById("code").innerText;
          await pyodide.runPythonAsync(pythonCode);
        } catch (err) {
          const outputEl = document.getElementById("output");
          outputEl.innerText += "\\nExecution Error: " + err.message;
          console.error(err);
        }
      }
      main();
    <\/script>
  </body>
</html>`;

const pythonExercises: Record<string, Exercise> = {

  // ─────────────────────────────────────────────
  // CHAPTER 1 — Getting Started with Python
  // ─────────────────────────────────────────────

  'hello-python': {
    numberTitle: '01. Hello Python',
    mainHeading: 'Hello Python',
    introduction:
      'Welcome to Python — a simple, readable, and highly versatile language used in data science, web development, and AI engineering! 🐍',
    conceptExplanation:
      'To output information in Python we use the print() function, passing in whatever text we want inside quotes. Every Python program begins by saying hello to the world!',
    funFact:
      "Python was created by Guido van Rossum and named after the British comedy show Monty Python's Flying Circus!",
    relatedConcepts: [
      { title: 'print() function', desc: 'Outputs text or values directly to the stdout terminal.' },
      { title: 'Syntax simplicity', desc: 'Python uses clean indentation instead of braces or semicolons.' },
    ],
    taskTheme: 'Output a customized greeting to the screen! 🐍',
    steps: [
      'In the main.py tab, modify the print statement to say: print("Welcome to Code Adventure!")',
      'Click Run to execute the script and observe the console output.',
    ],
    closingLine: 'Your first Python script executed successfully! 🚀',
    hint: 'Ensure your text string is wrapped in single or double quotes, e.g. print("Your Message").',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'print("Hello, Python!")\n',
    },
    language: 'js',
  },

  'python-comments': {
    numberTitle: '02. Python Comments',
    mainHeading: 'Python Comments',
    introduction:
      'Great code tells a story — and comments are the annotations that make that story understandable to every reader, including future you! 📝',
    conceptExplanation:
      'A comment in Python starts with a # symbol. Python ignores everything on that line after #, so you can use comments to explain your code, leave notes, or temporarily disable a line without deleting it.',
    funFact:
      'Experienced developers say well-commented code is like a recipe with clear steps — even a stranger can follow it!',
    relatedConcepts: [
      { title: 'Single-line comment', desc: 'Start the line with # to write a comment Python will ignore.' },
      { title: 'Multi-line comments', desc: 'Use triple quotes """ ... """ to write block comments or docstrings.' },
    ],
    taskTheme: 'Add comments that describe what each line of your code does! 📝',
    steps: [
      'Add a single-line comment above the print statement using #, e.g. # This prints a greeting',
      'Add a second print statement and comment it out with # to disable it.',
      'Click Run — only the active (uncommented) print should produce output.',
    ],
    closingLine: 'Clean, well-commented code is a gift to every developer who reads it! 🎁',
    hint: 'A # character makes everything after it on the same line invisible to Python.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: '# This is a comment\nprint("Python comments are easy!")\n# print("This line is disabled")\n',
    },
    language: 'js',
  },

  'variables-intro': {
    numberTitle: '03. Variables Intro',
    mainHeading: 'Variables Intro',
    introduction:
      "Variables are containers that hold data so you can reference and reuse it throughout your program. Think of them as labelled boxes in a storage room! 📦",
    conceptExplanation:
      'In Python you create a variable simply by writing a name, an = sign, and a value. Python automatically figures out the data type — no need to declare it upfront.',
    funFact:
      'Python variable names are case-sensitive: "name" and "Name" are two completely different variables!',
    relatedConcepts: [
      { title: 'Variable assignment', desc: 'Use = to store a value: age = 25' },
      { title: 'Dynamic typing', desc: 'Python infers the type automatically based on the assigned value.' },
      { title: 'Naming rules', desc: 'Names must start with a letter or underscore and contain no spaces.' },
    ],
    taskTheme: 'Create variables that describe yourself and print them to the screen! 📦',
    steps: [
      'Create a variable called name and assign your name to it as a string.',
      'Create a variable called age and assign your age as a number.',
      'Print both variables using print(name) and print(age).',
    ],
    closingLine: 'You just stored and retrieved data — the foundation of every program! 🏆',
    hint: 'String values need quotes: name = "Alex". Numbers do not: age = 21.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'name = "Alex"\nage = 21\nprint(name)\nprint(age)\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 2 — Variables & Data Types
  // ─────────────────────────────────────────────

  'python-strings': {
    numberTitle: '04. Python Strings',
    mainHeading: 'Python Strings',
    introduction:
      'Strings are sequences of characters — text, names, sentences, emojis — wrapped in quotes. They are one of the most-used data types in Python! 🔤',
    conceptExplanation:
      'A string is created by wrapping text in single quotes (\') or double quotes ("). You can join two strings together with + (concatenation) and repeat them with * (repetition). Python also offers f-strings for clean variable interpolation.',
    funFact:
      'Python strings are immutable — once created, individual characters cannot be changed in place. You always produce a new string instead!',
    relatedConcepts: [
      { title: 'String literals', desc: 'Create strings with single or double quotes: "hello" or \'hello\'.' },
      { title: 'Concatenation', desc: 'Join strings with +: "Hello" + " World" → "Hello World".' },
      { title: 'f-strings', desc: 'Embed variables inline: f"My name is {name}".' },
      { title: 'len()', desc: 'Returns the number of characters in a string: len("hello") → 5.' },
    ],
    taskTheme: 'Build a personalized sentence using string concatenation and an f-string! 🔤',
    steps: [
      'Create a variable called greeting with the value "Hello".',
      'Create a variable called user with your name.',
      'Use an f-string to print: f"{greeting}, {user}! Welcome to Python."',
      'Also print the length of the user variable using len().',
    ],
    closingLine: 'String mastery unlocks text processing, web scraping, and so much more! 🌐',
    hint: 'f-strings start with the letter f before the opening quote: f"text {variable}".',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'greeting = "Hello"\nuser = "Alex"\nprint(f"{greeting}, {user}! Welcome to Python.")\nprint(len(user))\n',
    },
    language: 'js',
  },

  'python-numbers': {
    numberTitle: '05. Python Numbers',
    mainHeading: 'Python Numbers',
    introduction:
      "Numbers power everything from financial calculations to game physics. Python handles integers, decimals, and even complex numbers natively! 🔢",
    conceptExplanation:
      'Python has three numeric types: int (whole numbers like 42), float (decimals like 3.14), and complex (numbers with an imaginary part). You can perform all standard math operations and use the built-in round() function to control decimal places.',
    funFact:
      'Python integers have no size limit — you can compute numbers with millions of digits without any special library!',
    relatedConcepts: [
      { title: 'int', desc: 'Whole numbers without a decimal point, e.g. 7, -3, 1000.' },
      { title: 'float', desc: 'Numbers with a decimal point, e.g. 3.14, -0.5, 2.0.' },
      { title: 'type()', desc: 'Returns the data type of any value: type(3.14) → &lt;class \'float\'&gt;.' },
      { title: 'round()', desc: 'Rounds a float to a given number of decimal places.' },
    ],
    taskTheme: 'Perform a series of calculations and display their types! 🔢',
    steps: [
      'Create an integer variable called score with value 100.',
      'Create a float variable called pi with value 3.14159.',
      'Print both variables and their types using type().',
      'Print the result of score / 3 and round it to 2 decimal places.',
    ],
    closingLine: 'Number types are the engine behind every data-driven application! ⚙️',
    hint: 'Use type(variable) to inspect a value\'s type, and round(value, 2) to limit decimals.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'score = 100\npi = 3.14159\nprint(score, type(score))\nprint(pi, type(pi))\nprint(round(score / 3, 2))\n',
    },
    language: 'js',
  },

  'type-casting': {
    numberTitle: '06. Type Casting',
    mainHeading: 'Type Casting',
    introduction:
      'Sometimes data arrives in the wrong type — a number stored as text, or a decimal when you need a whole number. Type casting lets you convert between types on the fly! 🔄',
    conceptExplanation:
      'Python provides built-in functions to convert between types: int() converts to integer, float() converts to float, and str() converts to string. This is called explicit type casting and is essential when working with user input or mixed data sources.',
    funFact:
      'When you call input() in Python, it always returns a string — even if the user types a number. Forgetting to cast it is one of the most common beginner bugs!',
    relatedConcepts: [
      { title: 'int()', desc: 'Converts a value to an integer: int("42") → 42.' },
      { title: 'float()', desc: 'Converts a value to a float: float("3.14") → 3.14.' },
      { title: 'str()', desc: 'Converts a value to a string: str(100) → "100".' },
    ],
    taskTheme: 'Convert values between types and verify the transformations! 🔄',
    steps: [
      'Create a string variable called num_str with value "25".',
      'Convert it to an integer and store it in num_int.',
      'Convert num_int to a float and store it in num_float.',
      'Print all three variables and their types.',
    ],
    closingLine: 'Type casting keeps your data flexible and your program bug-free! 🛡️',
    hint: 'Use int("25") to convert a string to an integer. Use str(25) to go the other way.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'num_str = "25"\nnum_int = int(num_str)\nnum_float = float(num_int)\nprint(num_str, type(num_str))\nprint(num_int, type(num_int))\nprint(num_float, type(num_float))\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 3 — Python Operators
  // ─────────────────────────────────────────────

  'arithmetic-operators': {
    numberTitle: '07. Arithmetic Operators',
    mainHeading: 'Arithmetic Operators',
    introduction:
      'From splitting a restaurant bill to calculating rocket trajectories, arithmetic operators are the backbone of computation! ➕',
    conceptExplanation:
      'Python supports all standard arithmetic operations: addition (+), subtraction (-), multiplication (*), division (/), integer division (//), modulus (%), and exponentiation (**). Division always returns a float, while // returns only the whole-number quotient.',
    funFact:
      'The ** operator is unique to Python-style languages — in many others you need a separate function like Math.pow() to raise a number to a power!',
    relatedConcepts: [
      { title: '+ - * /', desc: 'Basic add, subtract, multiply, and divide.' },
      { title: '//', desc: 'Floor division — discards the remainder: 7 // 2 → 3.' },
      { title: '%', desc: 'Modulus — returns the remainder: 7 % 2 → 1.' },
      { title: '**', desc: 'Exponentiation: 2 ** 8 → 256.' },
    ],
    taskTheme: 'Build a mini calculator that demonstrates all arithmetic operators! ➕',
    steps: [
      'Create variables a = 15 and b = 4.',
      'Print the result of a + b, a - b, a * b, and a / b.',
      'Also print a // b, a % b, and a ** b.',
    ],
    closingLine: 'You now have the full arithmetic toolkit at your fingertips! 🧮',
    hint: 'Remember: / always gives a float. Use // if you need a whole number result.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'a = 15\nb = 4\nprint("Add:", a + b)\nprint("Sub:", a - b)\nprint("Mul:", a * b)\nprint("Div:", a / b)\nprint("Floor div:", a // b)\nprint("Mod:", a % b)\nprint("Exp:", a ** b)\n',
    },
    language: 'js',
  },

  'assignment-operators': {
    numberTitle: '08. Assignment Operators',
    mainHeading: 'Assignment Operators',
    introduction:
      'Assignment operators let you update variables in a compact, expressive way — no more writing the variable name twice! ✏️',
    conceptExplanation:
      'Beyond the basic = operator, Python provides shorthand assignment operators that combine an operation with assignment: += adds to the current value, -= subtracts, *= multiplies, /= divides, and so on. These are especially useful inside loops and accumulators.',
    funFact:
      'Python does not have ++ or -- operators like C or JavaScript. Instead, you use += 1 and -= 1 — which is just as concise and much more readable!',
    relatedConcepts: [
      { title: '=', desc: 'Basic assignment: x = 10.' },
      { title: '+=', desc: 'Add and assign: x += 5 is the same as x = x + 5.' },
      { title: '-= *= /=', desc: 'Subtract, multiply, or divide and assign in one step.' },
      { title: '**= //= %=', desc: 'Exponent, floor divide, or modulus and assign.' },
    ],
    taskTheme: 'Track a running score using assignment operators! ✏️',
    steps: [
      'Create a variable score = 0.',
      'Use += to add 10, then 25, then 5 to score, printing after each step.',
      'Use -= to subtract 8 from score and print the result.',
      'Use *= to double the score and print the final value.',
    ],
    closingLine: 'Shorthand operators keep your code tight and your logic clear! 🏅',
    hint: 'score += 10 is a shorter way to write score = score + 10.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'score = 0\nscore += 10\nprint("After +10:", score)\nscore += 25\nprint("After +25:", score)\nscore += 5\nprint("After +5:", score)\nscore -= 8\nprint("After -8:", score)\nscore *= 2\nprint("After *2:", score)\n',
    },
    language: 'js',
  },

  'comparison-operators': {
    numberTitle: '09. Comparison Operators',
    mainHeading: 'Comparison Operators',
    introduction:
      'Computers make decisions by comparing values. Comparison operators are the questions Python asks — and the answer is always True or False! ⚖️',
    conceptExplanation:
      'Comparison operators evaluate two values and return a boolean (True or False): == checks equality, != checks inequality, &gt; and &lt; compare size, and &gt;= and &lt;= include the boundary. These operators are the foundation of every conditional statement.',
    funFact:
      'In Python, True and False are capitalised. Writing true (lowercase) will raise a NameError — a very common trip-up for beginners!',
    relatedConcepts: [
      { title: '==', desc: 'Checks if two values are equal: 5 == 5 → True.' },
      { title: '!=', desc: 'Checks if values are not equal: 5 != 3 → True.' },
      { title: '&gt; and &lt;', desc: 'Greater than and less than comparisons.' },
      { title: '&gt;= and &lt;=', desc: 'Greater than or equal, less than or equal.' },
    ],
    taskTheme: 'Compare a set of values and print whether each comparison is True or False! ⚖️',
    steps: [
      'Create variables x = 10 and y = 20.',
      'Print the result of x == y, x != y, x &gt; y, and x &lt; y.',
      'Print x &gt;= 10 and y &lt;= 20.',
    ],
    closingLine: 'Comparison operators are the logic gates of every decision in your program! 🔀',
    hint: 'Use == (double equals) for comparison, not = (single equals) which is for assignment.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'x = 10\ny = 20\nprint(x == y)\nprint(x != y)\nprint(x > y)\nprint(x < y)\nprint(x >= 10)\nprint(y <= 20)\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 4 — Lists & Tuples
  // ─────────────────────────────────────────────

  'create-list': {
    numberTitle: '10. Create List',
    mainHeading: 'Create List',
    introduction:
      'Need to store a collection of items? Lists are Python\'s most flexible built-in data structure — ordered, changeable, and ready for action! 📋',
    conceptExplanation:
      'A list is created with square brackets [], and items are separated by commas. Lists can hold any mix of data types, including other lists. You can add items with .append(), remove them with .remove(), and check the count with len().',
    funFact:
      'Python lists are dynamic arrays under the hood — they automatically resize as you add or remove elements, so you never need to declare a size upfront!',
    relatedConcepts: [
      { title: 'List literal', desc: 'Create a list: fruits = ["apple", "banana", "cherry"].' },
      { title: '.append()', desc: 'Add an item to the end of a list.' },
      { title: '.remove()', desc: 'Remove the first occurrence of a specific value.' },
      { title: 'len()', desc: 'Returns the number of items in the list.' },
    ],
    taskTheme: 'Create a shopping list and practise adding and removing items! 🛒',
    steps: [
      'Create a list called shopping with at least three string items.',
      'Append a new item to the list using .append().',
      'Remove one item using .remove().',
      'Print the final list and its length using len().',
    ],
    closingLine: 'Lists are the workhorses of Python data management! 💼',
    hint: 'shopping.append("milk") adds "milk" to the end of the list.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'shopping = ["eggs", "bread", "butter"]\nshopping.append("milk")\nshopping.remove("bread")\nprint(shopping)\nprint("Items:", len(shopping))\n',
    },
    language: 'js',
  },

  'list-indexing': {
    numberTitle: '11. List Indexing',
    mainHeading: 'List Indexing',
    introduction:
      'Lists store items in order, and each item has an address called an index. Mastering indexing lets you pinpoint and slice exactly the data you need! 🎯',
    conceptExplanation:
      'Python lists use zero-based indexing — the first item is at index 0. Negative indices count from the end: -1 is the last item, -2 is second-to-last, etc. You can also slice a range of items using the colon notation: list[start:stop].',
    funFact:
      'Python\'s slice notation is so powerful it inspired similar syntax in NumPy, Pandas, and many other libraries — learn it once, use it everywhere!',
    relatedConcepts: [
      { title: 'Positive index', desc: 'Access items from the start: list[0] is the first item.' },
      { title: 'Negative index', desc: 'Access items from the end: list[-1] is the last item.' },
      { title: 'Slicing', desc: 'Extract a sub-list: list[1:3] returns items at index 1 and 2.' },
    ],
    taskTheme: 'Access specific items in a list using indexes and slices! 🎯',
    steps: [
      'Create a list called colors with five color names.',
      'Print the first item using index 0 and the last item using index -1.',
      'Print a slice of the middle three items.',
      'Update the second item by assigning a new value to index 1.',
    ],
    closingLine: 'Indexing and slicing give you surgical precision over your data! 🔬',
    hint: 'colors[1:4] returns items at positions 1, 2, and 3 (stop index is exclusive).',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'colors = ["red", "orange", "yellow", "green", "blue"]\nprint(colors[0])\nprint(colors[-1])\nprint(colors[1:4])\ncolors[1] = "purple"\nprint(colors)\n',
    },
    language: 'js',
  },

  'tuples-intro': {
    numberTitle: '12. Tuples Intro',
    mainHeading: 'Tuples Intro',
    introduction:
      "Tuples are lists' dependable cousins — ordered collections that can never be accidentally changed. Perfect for data that should stay fixed! 🔒",
    conceptExplanation:
      'A tuple is created with parentheses () and commas separating items. Once created, a tuple is immutable — you cannot add, remove, or change its items. You can still access items by index and slice them just like a list. Tuples are faster and safer for read-only data.',
    funFact:
      'Tuples are used extensively inside Python itself — for example, a function that returns multiple values actually returns a tuple behind the scenes!',
    relatedConcepts: [
      { title: 'Tuple literal', desc: 'Create a tuple: point = (10, 20).' },
      { title: 'Immutability', desc: 'Tuple items cannot be changed after creation.' },
      { title: 'Tuple unpacking', desc: 'Assign items to variables: x, y = (10, 20).' },
      { title: 'len()', desc: 'Works on tuples just like lists.' },
    ],
    taskTheme: 'Create a tuple of coordinates and unpack its values! 🔒',
    steps: [
      'Create a tuple called coordinates with three numeric values (x, y, z).',
      'Print the tuple and access each element by index.',
      'Unpack the tuple into three variables and print them individually.',
    ],
    closingLine: 'Tuples guarantee data integrity — use them whenever values should never change! 🛡️',
    hint: 'Unpack a tuple like this: x, y, z = coordinates',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'coordinates = (10, 25, 5)\nprint(coordinates)\nprint("X:", coordinates[0])\nprint("Y:", coordinates[1])\nprint("Z:", coordinates[2])\nx, y, z = coordinates\nprint(f"Unpacked: x={x}, y={y}, z={z}")\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 5 — Dictionaries & Sets
  // ─────────────────────────────────────────────

  'create-dictionary': {
    numberTitle: '13. Create Dictionary',
    mainHeading: 'Create Dictionary',
    introduction:
      'Dictionaries let you map meaningful keys to values — like a real dictionary maps words to definitions. They are the go-to structure for structured data in Python! 📖',
    conceptExplanation:
      'A dictionary is created with curly braces {} containing key: value pairs separated by commas. Keys must be unique and immutable (strings and numbers are most common). You can add new pairs, update existing ones, and delete pairs with the del keyword.',
    funFact:
      'Python dictionaries preserve insertion order since Python 3.7 — earlier versions did not guarantee any ordering at all!',
    relatedConcepts: [
      { title: 'Dict literal', desc: 'Create a dict: person = {"name": "Alex", "age": 30}.' },
      { title: 'Adding a key', desc: 'dict["new_key"] = value adds or updates a pair.' },
      { title: 'del', desc: 'Removes a key-value pair: del dict["key"].' },
      { title: 'len()', desc: 'Returns the number of key-value pairs.' },
    ],
    taskTheme: 'Build a profile dictionary and populate it with personal details! 📖',
    steps: [
      'Create a dictionary called profile with keys "name", "age", and "city".',
      'Add a new key "hobby" with a value of your choice.',
      'Delete the "age" key.',
      'Print the final dictionary and the number of remaining keys.',
    ],
    closingLine: 'Dictionaries are the backbone of JSON, APIs, and database records! 🌐',
    hint: 'profile["hobby"] = "coding" adds a new key-value pair to an existing dictionary.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'profile = {"name": "Alex", "age": 30, "city": "London"}\nprofile["hobby"] = "coding"\ndel profile["age"]\nprint(profile)\nprint("Keys:", len(profile))\n',
    },
    language: 'js',
  },

  'dictionary-access': {
    numberTitle: '14. Dictionary Access',
    mainHeading: 'Dictionary Access',
    introduction:
      'Once you have a dictionary full of data, you need smart ways to read it. Python gives you multiple tools to access, iterate, and safely query your dictionaries! 🔍',
    conceptExplanation:
      'You can access a value with dict["key"] or the safer dict.get("key", default) which returns a default instead of raising an error for missing keys. Use .keys() to list all keys, .values() for all values, and .items() to iterate over key-value pairs together.',
    funFact:
      'dict.get() is considered best practice in production code — it prevents your program from crashing when an expected key is missing from the data!',
    relatedConcepts: [
      { title: 'dict["key"]', desc: 'Direct access — raises KeyError if the key does not exist.' },
      { title: '.get(key, default)', desc: 'Safe access — returns default if the key is missing.' },
      { title: '.keys()', desc: 'Returns a view of all keys in the dictionary.' },
      { title: '.items()', desc: 'Returns key-value pairs as tuples for easy iteration.' },
    ],
    taskTheme: 'Safely access and iterate over a dictionary of student grades! 🔍',
    steps: [
      'Create a dictionary called grades with at least three subjects as keys and numeric scores as values.',
      'Access one grade directly using bracket notation.',
      'Use .get() to safely access a key that does not exist, providing a default of 0.',
      'Loop over .items() and print each subject and its grade.',
    ],
    closingLine: 'Safe dictionary access keeps your programs robust and crash-proof! 💪',
    hint: 'grades.get("PE", 0) returns 0 if "PE" is not in the dictionary.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'grades = {"Math": 95, "English": 88, "Science": 72}\nprint(grades["Math"])\nprint(grades.get("PE", 0))\nfor subject, score in grades.items():\n    print(f"{subject}: {score}")\n',
    },
    language: 'js',
  },

  'sets-intro': {
    numberTitle: '15. Sets Intro',
    mainHeading: 'Sets Intro',
    introduction:
      'Sets are unordered collections that automatically eliminate duplicates — perfect for deduplication tasks and mathematical set operations! 🔵',
    conceptExplanation:
      'A set is created with curly braces {} (without key-value pairs) or the set() constructor. Sets do not maintain order and do not allow duplicates. You can add items with .add(), remove with .discard(), and perform union, intersection, and difference operations.',
    funFact:
      "Checking membership in a set (if item in my_set) is O(1) — it's near-instant even for huge sets, unlike scanning a list which slows down as it grows!",
    relatedConcepts: [
      { title: 'Set literal', desc: 'Create a set: fruits = {"apple", "banana", "cherry"}.' },
      { title: '.add()', desc: 'Adds an item; ignored if it already exists.' },
      { title: '.discard()', desc: 'Removes an item; no error if the item is missing.' },
      { title: 'Set operations', desc: '| for union, & for intersection, - for difference.' },
    ],
    taskTheme: 'Deduplicate a list and explore set operations! 🔵',
    steps: [
      'Create a set called unique_nums from the list [1, 2, 2, 3, 4, 4, 5].',
      'Add the number 6 to the set using .add().',
      'Create a second set and find the intersection with the first.',
      'Print both sets and the intersection result.',
    ],
    closingLine: 'Sets are your secret weapon for fast lookups and data deduplication! ⚡',
    hint: 'Convert a list to a set with set([1, 2, 2, 3]) — duplicates vanish automatically.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'unique_nums = set([1, 2, 2, 3, 4, 4, 5])\nprint("Set:", unique_nums)\nunique_nums.add(6)\nprint("After add:", unique_nums)\nother = {4, 5, 6, 7, 8}\nprint("Intersection:", unique_nums & other)\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 6 — Conditional Statements
  // ─────────────────────────────────────────────

  'if-else': {
    numberTitle: '16. If Else',
    mainHeading: 'If Else',
    introduction:
      'Every program eventually needs to make a choice. The if/else statement is Python\'s fundamental decision-making tool! 🔀',
    conceptExplanation:
      'An if statement evaluates a condition and runs its indented block only when the condition is True. An else block runs when the condition is False. Python uses indentation (4 spaces or a tab) to define which code belongs inside each block.',
    funFact:
      'Python uses indentation to define code blocks instead of curly braces — this was a deliberate design choice to force readable, consistently formatted code!',
    relatedConcepts: [
      { title: 'if statement', desc: 'Runs a block of code when a condition is True.' },
      { title: 'else statement', desc: 'Runs when the if condition is False.' },
      { title: 'Indentation', desc: 'Python uses 4 spaces to define what belongs inside an if/else block.' },
    ],
    taskTheme: 'Write a program that checks if a number is positive or negative! 🔀',
    steps: [
      'Create a variable called number and assign any integer value.',
      'Write an if statement that prints "Positive!" if number > 0.',
      'Add an else block that prints "Negative or zero!" otherwise.',
      'Try changing the value of number to test both branches.',
    ],
    closingLine: 'Conditional logic is the heartbeat of interactive programs! ❤️',
    hint: 'Make sure your if and else blocks are indented by 4 spaces.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'number = 7\nif number > 0:\n    print("Positive!")\nelse:\n    print("Negative or zero!")\n',
    },
    language: 'js',
  },

  'elif-statements': {
    numberTitle: '17. Elif Statements',
    mainHeading: 'Elif Statements',
    introduction:
      'When there are more than two possible outcomes, elif (short for "else if") lets you chain multiple conditions elegantly! 🌿',
    conceptExplanation:
      'elif sits between an if and an else, adding extra conditions to check. Python evaluates each condition in order and runs the first block whose condition is True, then skips the rest. You can have as many elif branches as you need.',
    funFact:
      "Python's elif is unique in name — most languages write it as \"else if\" as two separate words. Guido van Rossum chose elif to save typing and improve readability!",
    relatedConcepts: [
      { title: 'elif', desc: 'Adds an additional condition after the initial if.' },
      { title: 'Order matters', desc: 'Python stops at the first True condition and skips all remaining branches.' },
      { title: 'else fallback', desc: 'The final else runs only when all previous conditions are False.' },
    ],
    taskTheme: 'Build a grade classifier using if / elif / else! 🌿',
    steps: [
      'Create a variable score with a numeric value between 0 and 100.',
      'Write conditions: 90+ → "A", 80+ → "B", 70+ → "C", 60+ → "D", else → "F".',
      'Print the corresponding grade.',
      'Test with different scores to verify each branch works.',
    ],
    closingLine: 'elif chains let your program navigate complex real-world decision trees! 🌲',
    hint: 'Start with the highest value condition first (score >= 90), then work downwards.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'score = 82\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\nprint(f"Score: {score} → Grade: {grade}")\n',
    },
    language: 'js',
  },

  'logical-operators': {
    numberTitle: '18. Logical Operators',
    mainHeading: 'Logical Operators',
    introduction:
      'Real decisions often depend on multiple conditions at once. Logical operators let you combine conditions into powerful compound tests! 🧠',
    conceptExplanation:
      'Python provides three logical operators: and returns True only if both conditions are True; or returns True if at least one condition is True; not inverts the result. These operators let you write complex decision logic in a single, readable line.',
    funFact:
      'Python evaluates logical expressions with "short-circuit" evaluation — if the result is already determined from the first operand, the second is never evaluated!',
    relatedConcepts: [
      { title: 'and', desc: 'True only when both conditions are True: x > 0 and x &lt; 100.' },
      { title: 'or', desc: 'True when at least one condition is True: x == 0 or x == 1.' },
      { title: 'not', desc: 'Inverts a boolean: not True → False.' },
    ],
    taskTheme: 'Write conditions that combine multiple tests using and, or, and not! 🧠',
    steps: [
      'Create variables age = 20 and has_ticket = True.',
      'Use and to check if age >= 18 and has_ticket is True, then print "Entry granted".',
      'Use or to check if age < 13 or not has_ticket, then print "Entry denied".',
    ],
    closingLine: 'Logical operators are the glue that holds complex conditions together! 🧩',
    hint: 'Combine conditions like: if age >= 18 and has_ticket: — both must be true.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'age = 20\nhas_ticket = True\nif age >= 18 and has_ticket:\n    print("Entry granted")\nif age < 13 or not has_ticket:\n    print("Entry denied")\nelse:\n    print("All checks passed!")\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 7 — Loops
  // ─────────────────────────────────────────────

  'for-loops': {
    numberTitle: '19. For Loops',
    mainHeading: 'For Loops',
    introduction:
      'Imagine having to print every item in a 1,000-item list by hand. For loops automate repetition, running a block of code once for each item in a sequence! 🔁',
    conceptExplanation:
      'A for loop iterates over any sequence — list, string, tuple, or a range() of numbers. On each iteration the loop variable holds the current item. range(start, stop, step) generates a sequence of integers, making it ideal for a fixed number of repetitions.',
    funFact:
      'The range() function is lazy — it generates numbers one at a time instead of building the whole list in memory. This makes range(1000000) just as memory-efficient as range(3)!',
    relatedConcepts: [
      { title: 'for item in sequence', desc: 'Iterates over each element in a list, string, or range.' },
      { title: 'range()', desc: 'Generates integers: range(5) → 0, 1, 2, 3, 4.' },
      { title: 'enumerate()', desc: 'Provides both index and value: for i, val in enumerate(list).' },
    ],
    taskTheme: 'Loop through a list of planets and print each one with its number! 🔁',
    steps: [
      'Create a list called planets with at least five planet names.',
      'Use a for loop with enumerate() to print each planet with its position number.',
      'Also write a separate loop using range(1, 6) to print the numbers 1 to 5.',
    ],
    closingLine: 'For loops are the engine of data processing, transformation, and automation! ⚙️',
    hint: 'enumerate(planets, 1) starts counting from 1 instead of 0.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"]\nfor i, planet in enumerate(planets, 1):\n    print(f"{i}. {planet}")\nprint("---")\nfor n in range(1, 6):\n    print(n)\n',
    },
    language: 'js',
  },

  'while-loops': {
    numberTitle: '20. While Loops',
    mainHeading: 'While Loops',
    introduction:
      'Some tasks need to repeat until a condition changes, not just for a fixed count. While loops keep running as long as their condition stays True! ⏳',
    conceptExplanation:
      'A while loop checks its condition before each iteration. If the condition is True the body runs; if False the loop ends. You must make sure something inside the loop eventually makes the condition False, otherwise you create an infinite loop.',
    funFact:
      'While loops are the foundation of event-driven programming — a game loop, a server listener, and a user-input prompt are all just while loops checking conditions!',
    relatedConcepts: [
      { title: 'while condition', desc: 'Repeats the body block as long as condition is True.' },
      { title: 'Loop variable', desc: 'Update a counter inside the loop to avoid running forever.' },
      { title: 'Infinite loop', desc: 'A while True: loop runs forever unless you use break to exit.' },
    ],
    taskTheme: 'Build a countdown timer using a while loop! ⏳',
    steps: [
      'Create a variable countdown = 5.',
      'Write a while loop that prints the countdown value, then subtracts 1.',
      'After the loop, print "Blast off! 🚀".',
    ],
    closingLine: 'While loops give your programs the power to respond to changing conditions! 🌊',
    hint: 'Ensure you update the loop variable (countdown -= 1) inside the loop body or it will run forever.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'countdown = 5\nwhile countdown > 0:\n    print(countdown)\n    countdown -= 1\nprint("Blast off! 🚀")\n',
    },
    language: 'js',
  },

  'break-continue': {
    numberTitle: '21. Break and Continue',
    mainHeading: 'Break and Continue',
    introduction:
      'Sometimes you need to skip an iteration or escape a loop entirely mid-run. break and continue give you precise control over loop flow! 🎮',
    conceptExplanation:
      'break immediately exits the loop and continues execution after it. continue skips the rest of the current iteration and jumps back to the loop\'s condition check. Both work inside for and while loops and are especially useful when searching for items or filtering data.',
    funFact:
      'Using break to exit a for loop that found what it was looking for is often faster than letting the loop finish — this is called an "early exit" pattern!',
    relatedConcepts: [
      { title: 'break', desc: 'Exits the loop immediately, skipping all remaining iterations.' },
      { title: 'continue', desc: 'Skips the rest of the current iteration and checks the condition again.' },
    ],
    taskTheme: 'Search a list and use break to stop when you find your target! 🎮',
    steps: [
      'Create a list of numbers from 1 to 10.',
      'Write a for loop that prints each number, but uses continue to skip even numbers.',
      'Add a break statement that exits the loop when the number exceeds 7.',
    ],
    closingLine: 'break and continue make your loops smarter and your programs more efficient! 💡',
    hint: 'Use if number % 2 == 0: continue to skip even numbers.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'for number in range(1, 11):\n    if number % 2 == 0:\n        continue\n    if number > 7:\n        break\n    print(number)\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 8 — Functions
  // ─────────────────────────────────────────────

  'define-function': {
    numberTitle: '22. Define Function',
    mainHeading: 'Define Function',
    introduction:
      'Functions are reusable blocks of code that you write once and call as many times as you need. They are the building blocks of clean, organised programs! 🧱',
    conceptExplanation:
      'Define a function using the def keyword, followed by the function name, parentheses, and a colon. The function body is indented below. Call the function by writing its name followed by parentheses. Until you call it, the body code does not run.',
    funFact:
      'In Python, functions are "first-class objects" — you can pass a function as an argument to another function, store it in a list, or return it from a function!',
    relatedConcepts: [
      { title: 'def keyword', desc: 'Defines a new function: def greet():' },
      { title: 'Function body', desc: 'The indented block that runs when the function is called.' },
      { title: 'Calling a function', desc: 'Run it by writing its name with parentheses: greet()' },
    ],
    taskTheme: 'Define and call a greeting function! 🧱',
    steps: [
      'Define a function called greet using the def keyword.',
      'Inside the function, write a print statement with a welcome message.',
      'Call the function three times and observe the output.',
    ],
    closingLine: 'Functions are the key to writing DRY (Don\'t Repeat Yourself) code! 🔑',
    hint: 'Remember the colon after the function name: def greet(): and indent the body.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'def greet():\n    print("Welcome to Code Adventure! 🐍")\n\ngreet()\ngreet()\ngreet()\n',
    },
    language: 'js',
  },

  'function-arguments': {
    numberTitle: '23. Function Arguments',
    mainHeading: 'Function Arguments',
    introduction:
      'Functions become truly powerful when you can pass data into them. Arguments let you customise a function\'s behaviour every time you call it! 🎛️',
    conceptExplanation:
      'Parameters are defined inside the function parentheses and act as local variables. When calling the function you pass arguments — actual values — that fill those parameters. You can also provide default parameter values so arguments become optional.',
    funFact:
      'Python supports keyword arguments, so you can pass arguments in any order by naming them: greet(name="Alex", title="Dr") — no need to remember position!',
    relatedConcepts: [
      { title: 'Parameters', desc: 'Variables declared in the function definition to receive values.' },
      { title: 'Arguments', desc: 'The actual values passed when calling the function.' },
      { title: 'Default values', desc: 'Optional parameters with fallbacks: def greet(name="friend").' },
    ],
    taskTheme: 'Build a personalised greeting function with a default name! 🎛️',
    steps: [
      'Define a function called greet(name="friend") with a default argument.',
      'Inside, print a greeting using the name parameter.',
      'Call greet() with no argument, then with a specific name like "Maya".',
    ],
    closingLine: 'Arguments transform a function from a fixed recipe into a flexible tool! 🛠️',
    hint: 'def greet(name="friend"): uses "friend" as the default when no argument is provided.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'def greet(name="friend"):\n    print(f"Hello, {name}! Welcome aboard 🎉")\n\ngreet()\ngreet("Maya")\ngreet("Carlos")\n',
    },
    language: 'js',
  },

  'return-statement': {
    numberTitle: '24. Return Statement',
    mainHeading: 'Return Statement',
    introduction:
      'Functions that only print are like calculators that show work on screen but never hand you the answer. The return statement lets a function pass a value back to the caller! 📤',
    conceptExplanation:
      'Use the return keyword inside a function to send a value back to wherever the function was called. The returned value can be stored in a variable, used in an expression, or passed directly to another function. A function without a return statement returns None.',
    funFact:
      'Python allows you to return multiple values at once! return x, y actually returns a tuple, which you can unpack immediately: a, b = my_function().',
    relatedConcepts: [
      { title: 'return', desc: 'Sends a value back to the caller and exits the function.' },
      { title: 'Return value', desc: 'Store it: result = add(3, 4) or use it directly: print(add(3, 4)).' },
      { title: 'Multiple returns', desc: 'return a, b returns both values as a tuple.' },
    ],
    taskTheme: 'Write a calculator function that returns results for further use! 📤',
    steps: [
      'Define a function called add(a, b) that returns a + b.',
      'Define a function called multiply(a, b) that returns a * b.',
      'Call add() and store its result, then pass that result to multiply().',
      'Print the final computed value.',
    ],
    closingLine: 'Return values connect functions together, enabling complex data pipelines! 🔗',
    hint: 'result = add(3, 4) stores the returned 7 in result for later use.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'def add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nsum_result = add(3, 4)\nfinal = multiply(sum_result, 2)\nprint(f"add(3, 4) = {sum_result}")\nprint(f"multiply({sum_result}, 2) = {final}")\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 9 — Basic OOP
  // ─────────────────────────────────────────────

  'classes-objects': {
    numberTitle: '25. Classes and Objects',
    mainHeading: 'Classes and Objects',
    introduction:
      'Object-Oriented Programming models the world as objects with properties and behaviours. A class is the blueprint; an object is the built thing! 🏗️',
    conceptExplanation:
      'A class is defined with the class keyword followed by the class name (by convention capitalised). You create an object (instance) by calling the class like a function: obj = MyClass(). Each object is independent — changing one does not affect another.',
    funFact:
      'Almost everything in Python is already an object — integers, strings, lists, and functions are all instances of their respective classes under the hood!',
    relatedConcepts: [
      { title: 'class keyword', desc: 'Defines a new class blueprint: class Dog:' },
      { title: 'Instantiation', desc: 'Create an object from a class: my_dog = Dog().' },
      { title: 'Attributes', desc: 'Data stored on an object: my_dog.name = "Rex".' },
    ],
    taskTheme: 'Define a Car class and create two different car objects! 🏗️',
    steps: [
      'Define a class called Car using the class keyword.',
      'Inside the class, add a class attribute wheels = 4.',
      'Create two Car objects: car1 and car2.',
      'Assign a "brand" attribute to each object and print them.',
    ],
    closingLine: 'Classes let you model real-world entities with structured, reusable code! 🌍',
    hint: 'Set attributes directly on an object after creation: car1.brand = "Toyota".',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'class Car:\n    wheels = 4\n\ncar1 = Car()\ncar1.brand = "Toyota"\n\ncar2 = Car()\ncar2.brand = "Ford"\n\nprint(f"{car1.brand} has {car1.wheels} wheels")\nprint(f"{car2.brand} has {car2.wheels} wheels")\n',
    },
    language: 'js',
  },

  'init-method': {
    numberTitle: '26. The init Method',
    mainHeading: 'The init Method',
    introduction:
      'Every object can be set up with its own unique data the moment it is created. The __init__ method is the constructor that runs automatically on instantiation! ⚙️',
    conceptExplanation:
      'The __init__ method is a special (dunder) method called automatically when a new object is created. It receives self (a reference to the new object) as its first parameter, followed by any additional parameters you define. Use it to set instance attributes that each object will carry independently.',
    funFact:
      '"Dunder" is short for "double underscore". Python has many dunder methods like __str__, __len__, and __add__ that let your custom classes integrate seamlessly with Python\'s built-in operators!',
    relatedConcepts: [
      { title: '__init__', desc: 'Runs automatically when a new instance is created.' },
      { title: 'self', desc: 'Refers to the current instance. Always the first parameter of instance methods.' },
      { title: 'Instance attributes', desc: 'Set with self.attr = value; unique to each object.' },
    ],
    taskTheme: 'Add an __init__ method to a Dog class and create personalised dog objects! ⚙️',
    steps: [
      'Define a class called Dog with an __init__ method that accepts name and breed.',
      'Inside __init__, set self.name and self.breed.',
      'Create two Dog objects with different names and breeds.',
      'Print each dog\'s name and breed.',
    ],
    closingLine: 'The __init__ method is your class\'s first handshake with every new object! 🤝',
    hint: 'def __init__(self, name, breed): — self is always first, then your custom parameters.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\ndog1 = Dog("Rex", "Labrador")\ndog2 = Dog("Bella", "Poodle")\n\nprint(f"{dog1.name} is a {dog1.breed}")\nprint(f"{dog2.name} is a {dog2.breed}")\n',
    },
    language: 'js',
  },

  'class-methods': {
    numberTitle: '27. Class Methods',
    mainHeading: 'Class Methods',
    introduction:
      'Objects do not just hold data — they can also perform actions. Methods are functions defined inside a class that give your objects behaviour! 🎬',
    conceptExplanation:
      'Instance methods are defined inside a class and always take self as their first parameter, giving them access to the object\'s own attributes. Call them with object.method(). This is what makes OOP so powerful — data and behaviour live together in one coherent object.',
    funFact:
      'The self parameter is just a convention — you could technically name it anything! But every Python developer on the planet uses self, so you should too.',
    relatedConcepts: [
      { title: 'Instance method', desc: 'A function inside a class that operates on self.' },
      { title: 'Calling methods', desc: 'Call with dot notation: my_obj.my_method().' },
      { title: 'Accessing attributes', desc: 'Inside a method, use self.attr to read or update the object\'s data.' },
    ],
    taskTheme: 'Add methods to a BankAccount class to deposit, withdraw, and check balance! 🎬',
    steps: [
      'Define a BankAccount class with __init__ that sets self.balance = 0.',
      'Add a deposit(amount) method that adds amount to self.balance.',
      'Add a withdraw(amount) method that subtracts amount from self.balance.',
      'Add a get_balance() method that prints the current balance.',
      'Create an account object, deposit 500, withdraw 150, then print the balance.',
    ],
    closingLine: 'You have built a fully functioning object with state and behaviour — welcome to OOP! 🏆',
    hint: 'Inside a method, access the object\'s balance with self.balance.',
    defaultFiles: {
      html: PYODIDE_HTML,
      js: 'class BankAccount:\n    def __init__(self):\n        self.balance = 0\n\n    def deposit(self, amount):\n        self.balance += amount\n        print(f"Deposited £{amount}")\n\n    def withdraw(self, amount):\n        self.balance -= amount\n        print(f"Withdrew £{amount}")\n\n    def get_balance(self):\n        print(f"Balance: £{self.balance}")\n\naccount = BankAccount()\naccount.deposit(500)\naccount.withdraw(150)\naccount.get_balance()\n',
    },
    language: 'js',
  },

};

export default pythonExercises;
