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

const NODE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Node.js Sandbox</title>
    <style>
      body {
        background: #0b0f19;
        color: #10b981;
        font-family: monospace;
        padding: 20px;
        font-size: 14px;
        line-height: 1.6;
      }
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    </style>
  </head>
  <body>
    <h3>Node.js Sandbox Console Output</h3>
    <pre id="output">Running node app.js...</pre>
    <script>
      (function() {
        const files = {
          "data.txt": "Hello from virtual storage!",
          "index.html": "<h1>Welcome</h1>"
        };
        const mockFs = {
          readFileSync: (path) => {
            if (files[path]) return files[path];
            throw new Error("ENOENT: no such file or directory, open '" + path + "'");
          },
          writeFileSync: (path, data) => {
            files[path] = String(data);
            logOutput("FS: Wrote to file '" + path + "' with content: " + data);
          },
          readFile: (path, encoding, cb) => {
            if (typeof encoding === 'function') cb = encoding;
            setTimeout(() => {
              if (files[path]) cb(null, files[path]);
              else cb(new Error("ENOENT"));
            }, 10);
          }
        };
        const mockHttp = {
          createServer: (handler) => {
            return {
              listen: (port, cb) => {
                logOutput("Server listening on port " + port + " 🌐");
                const mockReq = { url: '/', method: 'GET' };
                const mockRes = {
                  writeHead: (status, headers) => {
                    logOutput("Response Headers: [" + status + "] " + JSON.stringify(headers));
                  },
                  end: (content) => {
                    logOutput("Response Body: " + content);
                    if (cb) cb();
                  }
                };
                setTimeout(() => {
                  try {
                    handler(mockReq, mockRes);
                  } catch(e) {
                    console.error(e);
                  }
                }, 500);
              }
            };
          }
        };
        window.require = function(moduleName) {
          if (moduleName === 'fs') return mockFs;
          if (moduleName === 'http') return mockHttp;
          if (moduleName === 'path') {
            return {
              join: (...args) => args.join('/'),
              extname: (p) => p.includes('.') ? p.substring(p.lastIndexOf('.')) : ''
            };
          }
          if (moduleName === 'os') {
            return {
              platform: () => "browser-sandbox",
              totalmem: () => 16 * 1024 * 1024 * 1024
            };
          }
          throw new Error("Cannot find module '" + moduleName + "'");
        };
        window.process = {
          argv: ['node', 'app.js', 'arg1', 'arg2'],
          env: { NODE_ENV: 'development' }
        };
        window.__dirname = "/workspace/project";
        window.__filename = "/workspace/project/app.js";
        function logOutput(text) {
          const out = document.getElementById("output");
          if (out.innerText === "Running node app.js...") out.innerText = "";
          out.innerText += text + "\\n";
        }
        window.logOutput = logOutput;
        const _origLog = console.log;
        console.log = (...args) => { logOutput(args.join(' ')); _origLog(...args); };
        const _origErr = console.error;
        console.error = (...args) => { logOutput("Error: " + args.join(' ')); _origErr(...args); };
      })();
    <\/script>
    <script type="text/javascript" id="code"><\/script>
    <script>
      (function() {
        try {
          const scriptText = document.getElementById("code").innerText;
          eval(scriptText);
        } catch (err) {
          console.error(err);
        }
      })();
    </script>
  </body>
</html>`;

const nodeExercises: Record<string, Exercise> = {

  // ─────────────────────────────────────────────
  // CHAPTER 1 — Intro to Node.js
  // ─────────────────────────────────────────────

  'hello-node': {
    numberTitle: '01. Hello Node',
    mainHeading: 'Hello Node',
    introduction:
      "Welcome to Node.js — a JavaScript runtime built on Chrome's V8 engine that lets you write backend code outside the browser! 💻⚡",
    conceptExplanation:
      "Just like inside the browser, the standard way to output logs in Node.js is using console.log(). When running a server-side file, this output is printed directly to the system terminal stdout.",
    funFact:
      "Node.js was created by Ryan Dahl in 2009. He was frustrated by the progress bar of file uploads on Flickr, which led him to design a non-blocking, event-driven runtime!",
    relatedConcepts: [
      { title: 'JavaScript Runtime', desc: "An environment that compiles and executes JS outside of the standard browser DOM." },
      { title: 'V8 Engine', desc: "Google's open-source high-performance JavaScript engine used by Node.js." },
    ],
    taskTheme: 'Output a startup confirmation log message! 💻',
    steps: [
      'In the app.js tab, write: console.log("Node.js server starting up...");',
      'Click Run to run the script and inspect the output.',
    ],
    closingLine: 'Node.js runtime activated successfully! 🚀',
    hint: 'Use the standard console.log("Your message") syntax in JavaScript.',
    defaultFiles: {
      html: NODE_HTML,
      js: 'console.log("Hello, Node!");\n',
    },
    language: 'js',
  },

  'global-object': {
    numberTitle: '02. The Global Object',
    mainHeading: 'The Global Object',
    introduction:
      "In the browser, the global object is window. In Node.js it's global — a powerful built-in namespace that holds runtime utilities, timers, and environment info! 🌍",
    conceptExplanation:
      "The global object in Node.js provides built-in properties and functions available everywhere without importing anything: console, setTimeout, setInterval, __dirname, and __filename are all on the global scope. Unlike the browser's window, global does not contain DOM APIs.",
    funFact:
      "Starting from Node.js 16, globalThis is the standardised cross-environment global object, working identically in both Node.js and modern browsers!",
    relatedConcepts: [
      { title: 'global', desc: "The top-level object in Node.js, equivalent to window in browsers." },
      { title: '__dirname', desc: "A global string containing the absolute path to the current file's directory." },
      { title: '__filename', desc: "A global string containing the absolute path to the current file itself." },
    ],
    taskTheme: 'Explore the Node.js global object and print key runtime properties! 🌍',
    steps: [
      'Log __dirname to see the current directory path.',
      'Log __filename to see the current file path.',
      'Log process.env.NODE_ENV to inspect the environment variable.',
    ],
    closingLine: "You've peeked inside Node's global runtime environment! 🔭",
    hint: 'These globals are available without any require() — just reference them directly.',
    defaultFiles: {
      html: NODE_HTML,
      js: 'console.log("__dirname:", __dirname);\nconsole.log("__filename:", __filename);\nconsole.log("NODE_ENV:", process.env.NODE_ENV);\n',
    },
    language: 'js',
  },

  'process-argv': {
    numberTitle: '03. Command Line Arguments',
    mainHeading: 'Command Line Arguments',
    introduction:
      "Command line arguments let users customise a Node.js program's behaviour without changing the source code — just like flags you pass to shell commands! ⌨️",
    conceptExplanation:
      "process.argv is an array of strings representing all arguments passed when running a Node.js script. process.argv[0] is always 'node', process.argv[1] is the script path, and process.argv[2] onwards are the custom arguments you provide.",
    funFact:
      "Popular CLI tools like npm, webpack, and ESLint are all Node.js programs that rely entirely on process.argv to parse what the user wants them to do!",
    relatedConcepts: [
      { title: 'process.argv', desc: "Array of all command-line arguments: ['node', 'app.js', ...args]." },
      { title: 'process.env', desc: "Object containing all environment variables set in the current shell." },
      { title: 'Argument parsing', desc: "Slice from index 2 to get only user-supplied args: process.argv.slice(2)." },
    ],
    taskTheme: 'Read and display command-line arguments passed to your Node script! ⌨️',
    steps: [
      'Log the full process.argv array to see all entries.',
      'Use process.argv.slice(2) to extract only the user-supplied arguments.',
      'Print a friendly message that lists each custom argument.',
    ],
    closingLine: "Your script can now respond to what users type in the terminal! 🖥️",
    hint: 'process.argv.slice(2) removes the first two entries (node and script path) to give you just the custom args.',
    defaultFiles: {
      html: NODE_HTML,
      js: 'console.log("Full argv:", process.argv);\nconst args = process.argv.slice(2);\nconsole.log("Custom args:", args);\nargs.forEach((arg, i) => console.log("Arg " + (i + 1) + ":", arg));\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 2 — Modules System
  // ─────────────────────────────────────────────

  'commonjs-export': {
    numberTitle: '04. CommonJS Export',
    mainHeading: 'CommonJS Export',
    introduction:
      "Modules are the building blocks of scalable Node.js apps. CommonJS is Node's original module system — and module.exports is how you package code to share with others! 📦",
    conceptExplanation:
      "In Node.js CommonJS modules, you export values by assigning them to module.exports. You can export a single function, an object full of utilities, or any value. Whatever you assign to module.exports is exactly what another file receives when it requires() this module.",
    funFact:
      "CommonJS modules are synchronous and cached — the first time a file is required, Node.js executes it and caches the result. Every subsequent require() of the same file returns the cached exports instantly!",
    relatedConcepts: [
      { title: 'module.exports', desc: "The object that gets returned when another file requires() this module." },
      { title: 'exports shorthand', desc: "exports is a reference to module.exports — use for named exports." },
      { title: 'Module cache', desc: "Node.js caches modules after the first require(), so they only execute once." },
    ],
    taskTheme: 'Create and export a math utilities object from a Node.js module! 📦',
    steps: [
      'Define an object called mathUtils containing add, subtract, and multiply functions.',
      'Assign it to module.exports.',
      'Log module.exports to confirm the exported shape.',
    ],
    closingLine: "You've packaged reusable code into an exportable Node.js module! 📫",
    hint: 'module.exports = { add, subtract } exports both functions at once as named properties.',
    defaultFiles: {
      html: NODE_HTML,
      js: 'const mathUtils = {\n  add: (a, b) => a + b,\n  subtract: (a, b) => a - b,\n  multiply: (a, b) => a * b\n};\n\nmodule.exports = mathUtils;\n\nconsole.log("Exported module:", module.exports);\nconsole.log("add(3, 4):", module.exports.add(3, 4));\n',
    },
    language: 'js',
  },

  'commonjs-import': {
    numberTitle: '05. CommonJS Import',
    mainHeading: 'CommonJS Import',
    introduction:
      "Exporting is only half the story — require() is how you pull another module's functionality into your file and put it to work! 🔌",
    conceptExplanation:
      "The require() function loads a module and returns its module.exports value. For built-in Node modules (like fs or path) you pass the module name as a string. For your own files you pass a relative path. The result is typically stored in a const for immediate use.",
    funFact:
      "require() was so influential that ES Modules (import/export), now supported natively in modern browsers and Node.js, were designed to replace it — but millions of npm packages still use CommonJS today!",
    relatedConcepts: [
      { title: 'require()', desc: "Loads a module and returns its exports: const fs = require('fs')." },
      { title: 'Destructuring require', desc: "Pull named exports directly: const { join } = require('path')." },
      { title: 'Built-in modules', desc: "Core Node modules (fs, path, os, http) need no installation." },
    ],
    taskTheme: 'Import built-in Node.js modules and use their utilities! 🔌',
    steps: [
      "Require the 'path' module and store it in a const called path.",
      "Use path.join() to build a file path from two segments.",
      "Use path.extname() to extract the extension from a filename string.",
      'Log both results.',
    ],
    closingLine: "require() connects your code to the vast Node.js module ecosystem! 🌐",
    hint: "const path = require('path') loads the built-in path module — no installation needed.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const path = require('path');\n\nconst fullPath = path.join('/workspace', 'project', 'app.js');\nconsole.log('Joined path:', fullPath);\n\nconst ext = path.extname('server.js');\nconsole.log('Extension:', ext);\n",
    },
    language: 'js',
  },

  'npm-init': {
    numberTitle: '06. Initialize npm',
    mainHeading: 'Initialize npm',
    introduction:
      "npm (Node Package Manager) is the world's largest software registry. Every professional Node.js project starts with npm init — and a package.json file! 📋",
    conceptExplanation:
      "package.json is the manifest of a Node.js project. It records the project name, version, description, entry point, scripts, and all dependencies. In a real terminal you'd run npm init to generate it interactively. Here we simulate that by constructing and logging the package.json structure directly in code.",
    funFact:
      "npm hosts over 2.5 million packages. The leftpad controversy of 2016 — when a tiny 11-line package was unpublished and broke thousands of projects — led npm to add safeguards against removing widely-used packages!",
    relatedConcepts: [
      { title: 'package.json', desc: "The project manifest defining name, version, scripts, and dependencies." },
      { title: 'scripts', desc: "Custom terminal shortcuts: npm run start executes the 'start' script." },
      { title: 'dependencies', desc: "Libraries your project needs at runtime, installed via npm install." },
    ],
    taskTheme: 'Simulate constructing a package.json project manifest in Node.js! 📋',
    steps: [
      'Create a JavaScript object representing a package.json structure.',
      'Include name, version, description, main, and a scripts object.',
      'Log the full object with JSON.stringify() for pretty formatting.',
    ],
    closingLine: "Every great Node.js project starts with a well-crafted package.json! 🏗️",
    hint: 'Use JSON.stringify(obj, null, 2) to pretty-print a JavaScript object as JSON.',
    defaultFiles: {
      html: NODE_HTML,
      js: 'const packageJson = {\n  name: "my-node-app",\n  version: "1.0.0",\n  description: "A Node.js project",\n  main: "app.js",\n  scripts: {\n    start: "node app.js",\n    dev: "nodemon app.js"\n  },\n  dependencies: {}\n};\n\nconsole.log("package.json preview:");\nconsole.log(JSON.stringify(packageJson, null, 2));\n',
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 3 — File System Module
  // ─────────────────────────────────────────────

  'read-file': {
    numberTitle: '07. Read File Synchronously',
    mainHeading: 'Read File Synchronously',
    introduction:
      "The File System (fs) module is your gateway to reading and writing files on disk. Synchronous file reading is the simplest approach — perfect for configuration files loaded at startup! 📄",
    conceptExplanation:
      "fs.readFileSync(path) reads the entire contents of a file and returns them as a Buffer or, if you pass an encoding like 'utf8', as a string. The synchronous version blocks execution until the file is fully read — simpler to write but not suitable for high-traffic servers.",
    funFact:
      "Node.js uses libuv, a C library, to handle all file system operations. This means even your JavaScript file-reading code is ultimately calling battle-tested, cross-platform C code under the hood!",
    relatedConcepts: [
      { title: 'fs.readFileSync()', desc: "Reads a file synchronously and returns its contents as a string or Buffer." },
      { title: "Encoding 'utf8'", desc: "Pass 'utf8' as the second argument to get a string instead of a Buffer." },
      { title: 'Error handling', desc: "Wrap in try/catch — readFileSync throws if the file does not exist." },
    ],
    taskTheme: "Read a virtual file and print its contents to the console! 📄",
    steps: [
      "Require the 'fs' module.",
      "Use fs.readFileSync('data.txt', 'utf8') to read the virtual file.",
      "Log the file contents to the console.",
      "Wrap the call in a try/catch to handle missing files gracefully.",
    ],
    closingLine: "You've read your first file with Node.js — the foundation of every file-based tool! 📚",
    hint: "fs.readFileSync('data.txt', 'utf8') returns the file content as a plain string.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const fs = require('fs');\n\ntry {\n  const content = fs.readFileSync('data.txt', 'utf8');\n  console.log('File contents:', content);\n} catch (err) {\n  console.error('Error reading file:', err.message);\n}\n",
    },
    language: 'js',
  },

  'write-file': {
    numberTitle: '08. Write File Synchronously',
    mainHeading: 'Write File Synchronously',
    introduction:
      "Writing files is how Node.js programs persist data, generate reports, and create logs. fs.writeFileSync is the quickest way to save data to disk! ✍️",
    conceptExplanation:
      "fs.writeFileSync(path, data) writes a string or Buffer to a file, creating it if it doesn't exist or overwriting it if it does. Like readFileSync, it blocks execution until writing is complete. For appending without overwriting, pass { flag: 'a' } as the third argument.",
    funFact:
      "Overwriting a file is atomic on most operating systems — the OS swaps the old file for the new one in a single operation, so readers never see a half-written file!",
    relatedConcepts: [
      { title: 'fs.writeFileSync()', desc: "Writes data to a file synchronously, creating or overwriting it." },
      { title: "Flag 'a'", desc: "Pass { flag: 'a' } to append to a file instead of overwriting." },
      { title: 'Read after write', desc: "Call readFileSync immediately after to confirm the file was written." },
    ],
    taskTheme: "Write data to a virtual file and then read it back to verify! ✍️",
    steps: [
      "Require the 'fs' module.",
      "Use fs.writeFileSync('output.txt', 'Node.js file writing works!') to create a file.",
      "Read the file back using fs.readFileSync() and log its contents.",
    ],
    closingLine: "Writing and reading files forms the backbone of data persistence in Node.js! 💾",
    hint: "After writing, pass the same path to fs.readFileSync() to verify the content was saved.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const fs = require('fs');\n\nfs.writeFileSync('output.txt', 'Node.js file writing works!');\nconsole.log('File written successfully.');\n\nconst content = fs.readFileSync('output.txt', 'utf8');\nconsole.log('Read back:', content);\n",
    },
    language: 'js',
  },

  'async-fs': {
    numberTitle: '09. Asynchronous File System',
    mainHeading: 'Asynchronous File System',
    introduction:
      "Real Node.js servers never block while reading files — they use async callbacks so other tasks can run while waiting for the disk. This is the Node.js way! ⚡",
    conceptExplanation:
      "fs.readFile(path, encoding, callback) reads a file asynchronously. Instead of returning the data, it calls your callback function when done, passing (error, data) as arguments. This non-blocking pattern keeps Node.js responsive, allowing it to handle thousands of simultaneous requests.",
    funFact:
      "Node.js's non-blocking I/O model allows a single thread to handle 10,000+ concurrent connections — something traditional thread-per-request servers like Apache struggle to achieve efficiently!",
    relatedConcepts: [
      { title: 'fs.readFile()', desc: "Reads a file asynchronously and invokes a callback with (err, data)." },
      { title: 'Error-first callbacks', desc: "Node.js convention: the first callback argument is always an error (or null)." },
      { title: 'Non-blocking I/O', desc: "File operations run in the background; the event loop stays free for other work." },
    ],
    taskTheme: "Read a file asynchronously using a callback and handle potential errors! ⚡",
    steps: [
      "Require the 'fs' module.",
      "Call fs.readFile('data.txt', 'utf8', callback) with an arrow function callback.",
      "In the callback, check if err exists and log it; otherwise log the file data.",
      "Add a console.log() after the readFile call to prove execution continues without waiting.",
    ],
    closingLine: "Async file I/O keeps your Node.js server fast and always responsive! 🚀",
    hint: "The callback receives (err, data) — always check if (err) before using data.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const fs = require('fs');\n\nconsole.log('Starting async read...');\n\nfs.readFile('data.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error('Error:', err.message);\n    return;\n  }\n  console.log('File contents:', data);\n});\n\nconsole.log('This runs BEFORE the file is read! (non-blocking)');\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 4 — Path Module
  // ─────────────────────────────────────────────

  'path-join': {
    numberTitle: '10. Path Join',
    mainHeading: 'Path Join',
    introduction:
      "File paths differ between Windows and Unix. The path module abstracts those differences away, so your code works on every operating system! 🗂️",
    conceptExplanation:
      "path.join() takes any number of path segments and joins them with the correct separator for the current OS (/ on Unix, \\ on Windows). It also normalises redundant separators and resolves . and .. segments. Always use path.join() instead of manually concatenating strings.",
    funFact:
      "A famous bug in 2021 affected many Node.js deployments on Windows because developers used '/' as a hardcoded separator instead of path.join() — the module exists precisely to prevent such cross-platform issues!",
    relatedConcepts: [
      { title: 'path.join()', desc: "Joins path segments with the OS-correct separator." },
      { title: 'path.resolve()', desc: "Resolves a sequence of paths into an absolute path." },
      { title: 'Cross-platform', desc: "path.join() ensures your code works on Windows, macOS, and Linux." },
    ],
    taskTheme: "Build file paths using path.join() and observe the normalised result! 🗂️",
    steps: [
      "Require the 'path' module.",
      "Use path.join() to build a path from '/workspace', 'project', 'src', and 'index.js'.",
      "Build a second path using __dirname and a relative filename.",
      "Log both paths.",
    ],
    closingLine: "path.join() makes your file paths bulletproof across every platform! 🛡️",
    hint: "path.join('/a', 'b', 'c') produces '/a/b/c' — it handles all the slashes for you.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const path = require('path');\n\nconst projectPath = path.join('/workspace', 'project', 'src', 'index.js');\nconsole.log('Project path:', projectPath);\n\nconst filePath = path.join(__dirname, 'config.json');\nconsole.log('Config path:', filePath);\n",
    },
    language: 'js',
  },

  'path-extname': {
    numberTitle: '11. Get File Extension',
    mainHeading: 'Get File Extension',
    introduction:
      "File extensions tell your program what kind of data it's dealing with. path.extname() extracts them instantly so you can make smart decisions based on file type! 🔍",
    conceptExplanation:
      "path.extname(filename) returns the extension of a file path as a string, including the leading dot (e.g. '.js', '.txt', '.png'). It returns an empty string if there is no extension. Combined with path.basename() you can extract just the filename without its directory.",
    funFact:
      "MIME types (like 'text/html' or 'image/png') used in HTTP responses are almost always determined by mapping file extensions — making path.extname() a key utility in every web server!",
    relatedConcepts: [
      { title: 'path.extname()', desc: "Returns the file extension including the dot: '.js', '.png'." },
      { title: 'path.basename()', desc: "Returns the final segment of a path — the filename with extension." },
      { title: 'path.dirname()', desc: "Returns the directory portion of a path, excluding the filename." },
    ],
    taskTheme: "Extract extensions and basenames from a set of file path strings! 🔍",
    steps: [
      "Require the 'path' module.",
      "Create an array of file paths with different extensions.",
      "Loop through the array and log each file's basename and extension.",
    ],
    closingLine: "Extracting file extensions is the first step in building any file-aware server! 🗂️",
    hint: "path.extname('server.js') returns '.js'. path.basename('/src/app.js') returns 'app.js'.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const path = require('path');\n\nconst files = ['index.html', 'style.css', 'app.js', 'logo.png', 'data.json'];\n\nfiles.forEach(file => {\n  const ext = path.extname(file);\n  const base = file;\n  console.log(`${base} → extension: ${ext}`);\n});\n",
    },
    language: 'js',
  },

  'dirname-filename': {
    numberTitle: '12. Dirname & Filename',
    mainHeading: 'Dirname & Filename',
    introduction:
      "Knowing where your script lives is essential for loading sibling files and resolving relative paths. __dirname and __filename give you that certainty at runtime! 📍",
    conceptExplanation:
      "__dirname is a Node.js global that holds the absolute path to the directory of the currently running file. __filename holds the absolute path to the file itself. Together with path.join(), they let you reference files relative to your script with absolute certainty, regardless of where Node was launched from.",
    funFact:
      "__dirname and __filename are not available in ES Module files (.mjs or type:\"module\"). In ES Modules you recreate them using import.meta.url — a subtle gotcha when migrating from CommonJS!",
    relatedConcepts: [
      { title: '__dirname', desc: "Absolute path to the directory containing the current script." },
      { title: '__filename', desc: "Absolute path to the current script file itself." },
      { title: 'path.join + __dirname', desc: "The safest way to reference files relative to your script." },
    ],
    taskTheme: "Use __dirname and __filename to build robust absolute file paths! 📍",
    steps: [
      "Log __dirname and __filename to see their values.",
      "Use path.join(__dirname, 'data', 'config.json') to build an absolute path to a nested file.",
      "Use path.join(__dirname, '..', 'shared') to build a path one level up.",
    ],
    closingLine: "__dirname makes your file references immune to where Node.js is invoked from! 🧭",
    hint: "path.join(__dirname, 'config.json') always finds config.json in the same folder as app.js.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const path = require('path');\n\nconsole.log('__dirname:', __dirname);\nconsole.log('__filename:', __filename);\n\nconst configPath = path.join(__dirname, 'data', 'config.json');\nconsole.log('Config path:', configPath);\n\nconst sharedPath = path.join(__dirname, '..', 'shared');\nconsole.log('Shared path:', sharedPath);\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 5 — OS & Events
  // ─────────────────────────────────────────────

  'os-module': {
    numberTitle: '13. OS Information',
    mainHeading: 'OS Information',
    introduction:
      "The os module gives your Node.js program a window into the operating system it's running on — perfect for writing cross-platform scripts and health-check endpoints! 🖥️",
    conceptExplanation:
      "The built-in os module exposes system-level information: os.platform() returns the OS name, os.totalmem() returns total RAM in bytes, os.freemem() returns available RAM, and os.cpus() returns an array of CPU core objects. Dividing memory by 1024³ converts bytes to gigabytes.",
    funFact:
      "Many cloud deployment tools (like PM2 and Docker health checks) use Node's os module to monitor server resources automatically and trigger alerts or restarts when memory runs low!",
    relatedConcepts: [
      { title: 'os.platform()', desc: "Returns the OS name: 'linux', 'darwin' (macOS), or 'win32'." },
      { title: 'os.totalmem()', desc: "Returns total system memory in bytes." },
      { title: 'os.freemem()', desc: "Returns currently available memory in bytes." },
    ],
    taskTheme: "Inspect the operating system and display a system information report! 🖥️",
    steps: [
      "Require the 'os' module.",
      "Log the platform using os.platform().",
      "Log the total memory in GB by dividing os.totalmem() by 1024 ** 3.",
    ],
    closingLine: "The os module turns your Node.js script into a powerful system monitoring tool! 📊",
    hint: "Convert bytes to GB: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB'.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const os = require('os');\n\nconsole.log('Platform:', os.platform());\nconst totalGB = (os.totalmem() / (1024 ** 3)).toFixed(2);\nconsole.log('Total RAM:', totalGB + ' GB');\nconsole.log('--- System Info Report ---');\nconsole.log('OS:', os.platform());\nconsole.log('Total Memory:', totalGB + ' GB');\n",
    },
    language: 'js',
  },

  'event-emitter': {
    numberTitle: '14. Event Emitter',
    mainHeading: 'Event Emitter',
    introduction:
      "Events are the heartbeat of Node.js. The EventEmitter class lets any object emit named events and register listeners that react when those events fire! 🎯",
    conceptExplanation:
      "Node.js's events module provides the EventEmitter class. You create an emitter, register a listener with .on('eventName', callback), and trigger it with .emit('eventName', ...data). This publish-subscribe pattern decouples your code and is the foundation of Node's core modules like streams and HTTP.",
    funFact:
      "Node.js itself is built almost entirely on EventEmitter. When you write server.on('request', handler), you're listening to an event emitted by Node's http server internally — it's EventEmitter all the way down!",
    relatedConcepts: [
      { title: 'EventEmitter', desc: "The base class for all event-driven objects in Node.js." },
      { title: '.on(event, listener)', desc: "Registers a persistent listener for a named event." },
      { title: '.emit(event, ...args)', desc: "Fires a named event, calling all registered listeners with the args." },
    ],
    taskTheme: "Create an EventEmitter, register listeners, and fire custom events! 🎯",
    steps: [
      "Require EventEmitter from the 'events' module.",
      "Create a new EventEmitter instance.",
      "Register a listener for a 'greet' event that logs the received name.",
      "Emit the 'greet' event with a name argument.",
    ],
    closingLine: "EventEmitter is the engine powering Node's asynchronous event-driven architecture! ⚙️",
    hint: "emitter.on('greet', (name) => { ... }) sets up the listener before emitter.emit('greet', 'Alex') fires it.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\nemitter.on('greet', (name) => {\n  console.log(`Hello, ${name}! 👋`);\n});\n\nemitter.on('greet', () => {\n  console.log('(A greeting was sent!)');\n});\n\nemitter.emit('greet', 'Alex');\nemitter.emit('greet', 'Maya');\n",
    },
    language: 'js',
  },

  'custom-events': {
    numberTitle: '15. Custom Events',
    mainHeading: 'Custom Events',
    introduction:
      "Building on EventEmitter, you can create rich custom event systems — like a mini message bus that coordinates different parts of your application! 📡",
    conceptExplanation:
      "You can extend EventEmitter with a class to give your own objects event-emitting superpowers. Use .once() to register a listener that fires only one time, .removeListener() to unregister, and .listenerCount() to inspect how many listeners are attached to an event.",
    funFact:
      "Node.js warns you in the console when a single EventEmitter has more than 10 listeners for the same event — this is a memory-leak guard, since forgotten listeners accumulate and consume memory!",
    relatedConcepts: [
      { title: '.once()', desc: "Registers a listener that fires exactly once, then auto-removes itself." },
      { title: 'Class extends EventEmitter', desc: "Gives your custom class built-in event-emitting capabilities." },
      { title: '.listenerCount()', desc: "Returns the number of listeners registered for a given event name." },
    ],
    taskTheme: "Build a custom Logger class that extends EventEmitter and emits typed log events! 📡",
    steps: [
      "Create a Logger class that extends EventEmitter.",
      "Add a log(level, message) method that emits a 'log' event with the level and message.",
      "Register an .on('log') listener that prints formatted output.",
      "Register a .once('log') listener that only fires once.",
      "Call logger.log() three times and observe the output.",
    ],
    closingLine: "Custom event classes make your Node.js architecture modular and maintainable! 🏛️",
    hint: "class Logger extends EventEmitter {} gives Logger all of EventEmitter's methods automatically.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const EventEmitter = require('events');\n\nclass Logger extends EventEmitter {\n  log(level, message) {\n    this.emit('log', { level, message, time: new Date().toISOString() });\n  }\n}\n\nconst logger = new Logger();\n\nlogger.on('log', ({ level, message }) => {\n  console.log(`[${level.toUpperCase()}] ${message}`);\n});\n\nlogger.once('log', () => {\n  console.log('(First log event received!)');\n});\n\nlogger.log('info', 'Server started');\nlogger.log('warn', 'Memory usage high');\nlogger.log('error', 'Connection refused');\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 6 — HTTP Module
  // ─────────────────────────────────────────────

  'create-server': {
    numberTitle: '16. Create HTTP Server',
    mainHeading: 'Create HTTP Server',
    introduction:
      "Every web application needs a server. Node.js can spin one up with just a few lines of code using the built-in http module — no frameworks required! 🌐",
    conceptExplanation:
      "http.createServer(requestHandler) creates an HTTP server. The requestHandler is a callback fired for every incoming request with (req, res) arguments — req holds request info, res is used to send back the response. Call server.listen(port) to start accepting connections.",
    funFact:
      "Node.js's HTTP server can handle over 30,000 requests per second on modest hardware — its event-loop architecture processes each request asynchronously without spawning a new thread!",
    relatedConcepts: [
      { title: 'http.createServer()', desc: "Creates an HTTP server that calls your handler for every request." },
      { title: 'req', desc: "The IncomingMessage object containing URL, method, and headers." },
      { title: 'res', desc: "The ServerResponse object used to write headers and send the body." },
    ],
    taskTheme: "Create an HTTP server and observe it handling a simulated request! 🌐",
    steps: [
      "Require the 'http' module.",
      "Create a server using http.createServer() with a (req, res) handler.",
      "Inside the handler, log the request method and URL.",
      "Call server.listen(3000) to start the server.",
    ],
    closingLine: "You've spun up your first Node.js HTTP server from scratch! 🚀",
    hint: "req.method and req.url give you the HTTP method and requested path.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  console.log(`Incoming: ${req.method} ${req.url}`);\n  res.end('Server is running!');\n});\n\nserver.listen(3000, () => {\n  console.log('Server started on port 3000');\n});\n",
    },
    language: 'js',
  },

  'server-response': {
    numberTitle: '17. Send Server Response',
    mainHeading: 'Send Server Response',
    introduction:
      "A server that only receives is useless — it needs to reply! Crafting the right HTTP response with correct status codes and headers is the mark of a professional backend! 📬",
    conceptExplanation:
      "res.writeHead(statusCode, headers) sets the response status and HTTP headers before sending the body. res.end(body) finalises and sends the response. Common status codes: 200 (OK), 404 (Not Found), 500 (Server Error). The Content-Type header tells the client what kind of data to expect.",
    funFact:
      "HTTP status codes were standardised in 1996. The legendary 418 'I'm a Teapot' status code was defined in an April Fools' RFC for the Hyper Text Coffee Pot Control Protocol — and it's still recognised by browsers today!",
    relatedConcepts: [
      { title: 'res.writeHead()', desc: "Sets status code and response headers before sending the body." },
      { title: 'Content-Type', desc: "Tells the browser how to interpret the response: 'text/plain', 'application/json', etc." },
      { title: 'res.end()', desc: "Sends the response body and signals the response is complete." },
    ],
    taskTheme: "Send a structured HTTP response with correct status codes and headers! 📬",
    steps: [
      "Create an HTTP server.",
      "Use res.writeHead(200, { 'Content-Type': 'text/plain' }) to set the status and headers.",
      "Send a response body using res.end().",
      "Start the server on port 3000 and observe the logged headers and body.",
    ],
    closingLine: "Crafting precise HTTP responses is core to building reliable APIs! 📡",
    hint: "Call res.writeHead() before res.end() — headers must be set before the body is sent.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {\n    'Content-Type': 'text/plain',\n    'X-Powered-By': 'Node.js'\n  });\n  res.end('Hello from your Node.js server! 🚀');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on http://localhost:3000');\n});\n",
    },
    language: 'js',
  },

  'routing-basics': {
    numberTitle: '18. Routing Requests',
    mainHeading: 'Routing Requests',
    introduction:
      "A real server handles different URLs differently. Routing is the logic that decides which response to send based on the incoming URL and HTTP method! 🔀",
    conceptExplanation:
      "Inside the request handler, req.url gives the requested path and req.method gives the HTTP verb (GET, POST, etc.). Using if/else or a switch statement to branch on these values is the simplest form of routing — the same pattern used by every web framework under the hood.",
    funFact:
      "Express.js, the most popular Node.js framework with over 30 million weekly downloads, is essentially an elegant layer on top of this exact manual routing pattern — understanding raw routing makes Express click instantly!",
    relatedConcepts: [
      { title: 'req.url', desc: "The requested path, e.g. '/', '/about', '/api/users'." },
      { title: 'req.method', desc: "The HTTP verb: 'GET', 'POST', 'PUT', 'DELETE'." },
      { title: '404 handler', desc: "A fallback route for unmatched URLs — always set res.statusCode = 404." },
    ],
    taskTheme: "Build a server that routes to different responses based on the request URL! 🔀",
    steps: [
      "Create an HTTP server.",
      "Use if/else on req.url to serve different responses for '/', '/about', and '/api'.",
      "Add a 404 fallback for unrecognised routes.",
      "Start the server and observe the routed response in the output.",
    ],
    closingLine: "Manual routing reveals exactly what every web framework is abstracting for you! 🧩",
    hint: "if (req.url === '/about') { ... } else if (req.url === '/api') { ... } else { res.end('404'); }",
    defaultFiles: {
      html: NODE_HTML,
      js: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Welcome to the Home page!');\n  } else if (req.url === '/about') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('About this Node.js server.');\n  } else if (req.url === '/api') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ status: 'ok', version: '1.0' }));\n  } else {\n    res.writeHead(404, { 'Content-Type': 'text/plain' });\n    res.end('404 - Page Not Found');\n  }\n});\n\nserver.listen(3000, () => console.log('Routing server live on port 3000'));\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 7 — Express.js Basics
  // ─────────────────────────────────────────────

  'express-setup': {
    numberTitle: '19. Setup Express App',
    mainHeading: 'Setup Express App',
    introduction:
      "Express.js is the most popular Node.js web framework. It wraps the raw http module with a clean, powerful API — making server setup a joy instead of a chore! ⚡",
    conceptExplanation:
      "After installing Express (npm install express), you import it, call express() to create an app, define routes with app.get(), app.post() etc., and call app.listen() to start. Express handles the boilerplate of request parsing and response helpers so you focus on your application logic.",
    funFact:
      "Express was created by TJ Holowaychuk in 2010 and has been downloaded over 3 billion times. Despite its age, it remains the most widely used Node.js framework in production systems worldwide!",
    relatedConcepts: [
      { title: 'express()', desc: "Creates and returns an Express application instance." },
      { title: 'app.get(path, handler)', desc: "Registers a handler for HTTP GET requests to the given path." },
      { title: 'app.listen(port)', desc: "Starts the Express server on the specified port." },
    ],
    taskTheme: "Simulate setting up a minimal Express application with a home route! ⚡",
    steps: [
      "Simulate importing Express by creating a minimal express-like function.",
      "Create an app with a GET route for '/'.",
      "Have the route handler send a welcome message.",
      "Start the app on port 3000.",
    ],
    closingLine: "You've got an Express server skeleton ready to build on! 🏗️",
    hint: "In a real project: const express = require('express'); const app = express();",
    defaultFiles: {
      html: NODE_HTML,
      js: "// In production: const express = require('express');\n// Simulating Express for the sandbox:\nconst routes = {};\nconst app = {\n  get: (path, handler) => { routes[path] = handler; console.log(`GET route registered: ${path}`); },\n  listen: (port, cb) => {\n    console.log(`Express app listening on port ${port}`);\n    if (cb) cb();\n    // Simulate a request to '/'\n    const req = { method: 'GET', url: '/' };\n    const res = { send: (msg) => console.log('Response:', msg) };\n    if (routes['/']) routes['/'](req, res);\n  }\n};\n\napp.get('/', (req, res) => {\n  res.send('Welcome to Express! 🚀');\n});\n\napp.listen(3000, () => {\n  console.log('Server started!');\n});\n",
    },
    language: 'js',
  },

  'express-routing': {
    numberTitle: '20. Express Get Routes',
    mainHeading: 'Express Get Routes',
    introduction:
      "Express makes defining multiple routes elegant and readable. Each route is a simple function call — a far cry from the tangled if/else of raw Node.js routing! 🛣️",
    conceptExplanation:
      "app.get(path, (req, res) => {}) registers a handler for HTTP GET requests at the given path. You can define as many routes as you need. Route parameters (:id) capture dynamic segments of the URL, accessible via req.params. Query strings are parsed automatically in req.query.",
    funFact:
      "Express route matching uses the path-to-regexp library under the hood, supporting wildcards, optional segments, and named capture groups — the same library used in React Router and other frontend routing tools!",
    relatedConcepts: [
      { title: 'Route parameters', desc: "Dynamic URL segments: app.get('/user/:id') makes req.params.id available." },
      { title: 'req.params', desc: "Object containing all named route parameters." },
      { title: 'res.send()', desc: "Sends a response and auto-sets Content-Type based on the value type." },
    ],
    taskTheme: "Define multiple GET routes including one with a dynamic route parameter! 🛣️",
    steps: [
      "Define a GET route for '/' that sends a welcome message.",
      "Define a GET route for '/users' that sends a list of user names.",
      "Define a GET route for '/users/:id' that sends a message using the id param.",
      "Simulate requests to all three routes.",
    ],
    closingLine: "Express routing keeps your backend organised and your URLs meaningful! 📋",
    hint: "Access dynamic segments with req.params.id when the route is defined as '/users/:id'.",
    defaultFiles: {
      html: NODE_HTML,
      js: "// Minimal Express simulator for sandbox\nconst routes = {};\nconst app = {\n  get: (path, handler) => { routes[path] = handler; },\n  simulate: (url) => {\n    const paramRoute = Object.keys(routes).find(r => r.includes(':') && url.startsWith(r.split('/:')[0]));\n    const routeKey = routes[url] ? url : paramRoute;\n    if (!routeKey) return console.log('404: No route for', url);\n    const id = url.split('/').pop();\n    const req = { url, params: { id } };\n    const res = { send: (msg) => console.log(`[GET ${url}]:`, msg) };\n    routes[routeKey](req, res);\n  }\n};\n\napp.get('/', (req, res) => res.send('Home page'));\napp.get('/users', (req, res) => res.send('Users: Alice, Bob, Carlos'));\napp.get('/users/:id', (req, res) => res.send(`User profile for ID: ${req.params.id}`));\n\napp.simulate('/');\napp.simulate('/users');\napp.simulate('/users/42');\n",
    },
    language: 'js',
  },

  'json-responses': {
    numberTitle: '21. Send JSON Response',
    mainHeading: 'Send JSON Response',
    introduction:
      "Modern APIs communicate in JSON. Express makes sending properly formatted JSON responses effortless — just one method call! 📊",
    conceptExplanation:
      "res.json(object) in Express automatically serialises a JavaScript object to a JSON string, sets the Content-Type header to 'application/json', and sends the response. This is the standard way to build REST API endpoints. You can also set the status code with res.status(code).json(data) chaining.",
    funFact:
      "JSON was proposed by Douglas Crockford in 2001 as a lightweight alternative to XML. Today it's the universal language of web APIs — REST, GraphQL responses, and even WebSocket messages all commonly use JSON!",
    relatedConcepts: [
      { title: 'res.json()', desc: "Sends a JSON response with automatic Content-Type: application/json." },
      { title: 'res.status().json()', desc: "Chain to set status code: res.status(404).json({ error: 'Not found' })." },
      { title: 'JSON structure', desc: "Return objects with consistent shapes: { data, status, message }." },
    ],
    taskTheme: "Build routes that return structured JSON responses with status codes! 📊",
    steps: [
      "Create a route for '/api/users' that returns a JSON array of user objects.",
      "Create a route for '/api/status' that returns a JSON status object.",
      "Use res.status(200).json() to explicitly set the status code.",
    ],
    closingLine: "JSON responses are the universal language your frontend and mobile apps speak! 🌐",
    hint: "res.json({ users: [] }) handles serialisation and headers automatically.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const routes = {};\nconst app = {\n  get: (path, handler) => { routes[path] = handler; },\n  simulate: (url) => {\n    if (!routes[url]) return console.log('404:', url);\n    const req = { url };\n    const res = {\n      _status: 200,\n      status(code) { this._status = code; return this; },\n      json(data) { console.log(`[${this._status}] ${url}:`, JSON.stringify(data, null, 2)); }\n    };\n    routes[url](req, res);\n  }\n};\n\napp.get('/api/users', (req, res) => {\n  res.status(200).json({\n    users: [\n      { id: 1, name: 'Alice', role: 'admin' },\n      { id: 2, name: 'Bob', role: 'user' }\n    ]\n  });\n});\n\napp.get('/api/status', (req, res) => {\n  res.status(200).json({ status: 'ok', uptime: '5h 32m', version: '1.0.0' });\n});\n\napp.simulate('/api/users');\napp.simulate('/api/status');\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 8 — Middlewares
  // ─────────────────────────────────────────────

  'custom-middleware': {
    numberTitle: '22. Custom Middleware',
    mainHeading: 'Custom Middleware',
    introduction:
      "Middleware is the backbone of Express architecture. Every request flows through a pipeline of functions before reaching your route handler — letting you add logging, auth, and transforms in a clean, reusable way! 🔧",
    conceptExplanation:
      "An Express middleware is a function with the signature (req, res, next). It receives the request, can modify it or respond early, then calls next() to pass control to the next middleware or route. app.use() registers middleware that runs for every request. Order matters — middleware executes in the order it's registered.",
    funFact:
      "Popular packages like morgan (HTTP logger), cors (cross-origin headers), and helmet (security headers) are all just Express middleware — you can inspect their entire source code and it's just a function(req, res, next) call!",
    relatedConcepts: [
      { title: 'Middleware signature', desc: "(req, res, next) — call next() to pass to the next handler." },
      { title: 'app.use()', desc: "Registers middleware that runs for every incoming request." },
      { title: 'Request pipeline', desc: "Middleware executes in registration order, forming a processing chain." },
    ],
    taskTheme: "Write a custom request logger middleware that timestamps every request! 🔧",
    steps: [
      "Define a middleware function called requestLogger that logs the method, URL, and timestamp.",
      "Call next() at the end so the request continues to the route handler.",
      "Register the middleware with app.use() before defining routes.",
      "Simulate a request and observe the middleware firing before the route.",
    ],
    closingLine: "Middleware pipelines keep cross-cutting concerns separate from your business logic! 🏛️",
    hint: "Always call next() at the end of your middleware, otherwise the request will hang.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const middlewares = [];\nconst routes = {};\nconst app = {\n  use: (fn) => middlewares.push(fn),\n  get: (path, handler) => { routes[path] = handler; },\n  simulate: (method, url) => {\n    const req = { method, url };\n    const res = { send: (msg) => console.log('Response:', msg) };\n    let i = 0;\n    const next = () => {\n      if (i < middlewares.length) { middlewares[i++](req, res, next); }\n      else if (routes[url]) routes[url](req, res);\n    };\n    next();\n  }\n};\n\nconst requestLogger = (req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next();\n};\n\napp.use(requestLogger);\n\napp.get('/', (req, res) => res.send('Home page'));\napp.get('/api', (req, res) => res.send('API endpoint'));\n\napp.simulate('GET', '/');\napp.simulate('GET', '/api');\n",
    },
    language: 'js',
  },

  'express-json': {
    numberTitle: '23. Parse Request Body',
    mainHeading: 'Parse Request Body',
    introduction:
      "POST and PUT requests carry data in their body. Express's built-in JSON middleware automatically parses incoming JSON payloads and makes them available on req.body! 📥",
    conceptExplanation:
      "express.json() is a built-in middleware (since Express 4.16) that parses incoming requests with a JSON body. Add it with app.use(express.json()) before your route handlers. After parsing, req.body contains the decoded JavaScript object. Without this middleware, req.body is undefined.",
    funFact:
      "Before express.json() was built-in, developers had to install the separate 'body-parser' package. Express 4.16 absorbed body-parser's functionality directly — so npm install body-parser is no longer needed in modern Express apps!",
    relatedConcepts: [
      { title: 'express.json()', desc: "Parses incoming JSON request bodies into req.body." },
      { title: 'req.body', desc: "The parsed request body object, available after json() middleware runs." },
      { title: 'express.urlencoded()', desc: "Parses form-encoded request bodies (HTML form submissions)." },
    ],
    taskTheme: "Simulate parsing a JSON request body in an Express POST route! 📥",
    steps: [
      "Set up a middleware pipeline that includes a JSON body parser.",
      "Define a POST route for '/api/users' that reads req.body.",
      "Simulate a POST request with a JSON body.",
      "Log the parsed body data from req.body.",
    ],
    closingLine: "Parsing request bodies unlocks the full power of REST API development! 💪",
    hint: "After json() middleware runs, access the data directly with req.body.fieldName.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const middlewares = [];\nconst routes = {};\nconst app = {\n  use: (fn) => middlewares.push(fn),\n  post: (path, handler) => { routes['POST:' + path] = handler; },\n  simulate: (method, url, body) => {\n    const req = { method, url, body: null, _rawBody: body };\n    const res = { json: (data) => console.log('Response:', JSON.stringify(data, null, 2)) };\n    let i = 0;\n    const next = () => {\n      if (i < middlewares.length) middlewares[i++](req, res, next);\n      else if (routes[method + ':' + url]) routes[method + ':' + url](req, res);\n    };\n    next();\n  }\n};\n\n// JSON body parser middleware\napp.use((req, res, next) => {\n  if (req._rawBody) req.body = req._rawBody;\n  next();\n});\n\napp.post('/api/users', (req, res) => {\n  const { name, email } = req.body;\n  console.log('Received body:', req.body);\n  res.json({ message: 'User created', user: { id: 101, name, email } });\n});\n\napp.simulate('POST', '/api/users', { name: 'Alice', email: 'alice@example.com' });\n",
    },
    language: 'js',
  },

  'static-files': {
    numberTitle: '24. Serve Static Files',
    mainHeading: 'Serve Static Files',
    introduction:
      "Every web app needs to serve HTML, CSS, images, and JavaScript files. Express's static middleware makes this a one-liner! 📁",
    conceptExplanation:
      "express.static(folderPath) is middleware that automatically serves files from a directory. When a request URL matches a file in that directory, Express reads and returns the file with the correct Content-Type header. Combine it with path.join(__dirname, 'public') for a robust, path-safe setup.",
    funFact:
      "express.static() uses the serve-static npm package under the hood, which supports ETag caching headers, byte-range requests for large files, and automatic directory index serving — all out of the box!",
    relatedConcepts: [
      { title: 'express.static()', desc: "Serves all files in a directory as static assets." },
      { title: 'Public folder', desc: "By convention, static files live in a 'public' directory." },
      { title: 'ETag', desc: "express.static() sets ETag headers so browsers cache files efficiently." },
    ],
    taskTheme: "Simulate serving static files from a public directory in Express! 📁",
    steps: [
      "Define a virtual 'public' folder containing a few simulated files.",
      "Create middleware that checks if the requested URL matches a static file.",
      "Serve the file content with the correct Content-Type if it matches.",
      "Fall through to a 404 handler if no static file matches.",
    ],
    closingLine: "Static file serving is what turns a Node.js API into a complete web server! 🌐",
    hint: "In a real Express app: app.use(express.static(path.join(__dirname, 'public')));",
    defaultFiles: {
      html: NODE_HTML,
      js: "// Simulating express.static() behaviour\nconst publicFiles = {\n  '/index.html': { content: '&lt;h1&gt;Welcome&lt;/h1&gt;', type: 'text/html' },\n  '/style.css': { content: 'body { color: green; }', type: 'text/css' },\n  '/app.js': { content: 'console.log(\"client js\");', type: 'application/javascript' }\n};\n\nconst staticMiddleware = (req, res, next) => {\n  const file = publicFiles[req.url];\n  if (file) {\n    console.log(`[Static] Serving ${req.url} (${file.type})`);\n    console.log('Content:', file.content);\n  } else {\n    next();\n  }\n};\n\nconst simulate = (url) => {\n  const req = { url };\n  const res = {};\n  const next = () => console.log(`[404] No static file found for ${url}`);\n  staticMiddleware(req, res, next);\n};\n\nsimulate('/index.html');\nsimulate('/style.css');\nsimulate('/logo.png');\n",
    },
    language: 'js',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 9 — REST API Basics
  // ─────────────────────────────────────────────

  'rest-get': {
    numberTitle: '25. REST GET Route',
    mainHeading: 'REST GET Route',
    introduction:
      "REST APIs are the backbone of the modern web. The GET method is how clients request data — it's the most common HTTP verb in any API! 📋",
    conceptExplanation:
      "A RESTful GET route retrieves data without modifying it. By convention: GET /users returns all users, GET /users/:id returns a single user. The response is a JSON object with a consistent structure. Always return appropriate HTTP status codes: 200 for success, 404 if the resource doesn't exist.",
    funFact:
      "REST (Representational State Transfer) was defined in Roy Fielding's PhD dissertation in 2000. He was one of the principal authors of the HTTP specification, which explains why REST maps so naturally to HTTP verbs!",
    relatedConcepts: [
      { title: 'GET /resource', desc: "Returns a collection of all resources." },
      { title: 'GET /resource/:id', desc: "Returns a single resource by its unique identifier." },
      { title: 'HTTP 200 / 404', desc: "200 for successful retrieval, 404 when the resource is not found." },
    ],
    taskTheme: "Build a complete REST GET endpoint with collection and single-resource routes! 📋",
    steps: [
      "Create an in-memory array of user objects as your data source.",
      "Define GET /api/users to return all users.",
      "Define GET /api/users/:id to return a single user or a 404 JSON error.",
      "Simulate requests to both routes.",
    ],
    closingLine: "GET routes are the read layer of every production REST API! 📖",
    hint: "Use Array.find() to locate a user by id: users.find(u => u.id === Number(req.params.id)).",
    defaultFiles: {
      html: NODE_HTML,
      js: "const users = [\n  { id: 1, name: 'Alice', email: 'alice@example.com' },\n  { id: 2, name: 'Bob', email: 'bob@example.com' },\n  { id: 3, name: 'Carlos', email: 'carlos@example.com' }\n];\n\nconst routes = {};\nconst app = {\n  get: (path, handler) => { routes[path] = handler; },\n  simulate: (url) => {\n    const exactMatch = routes[url];\n    const paramMatch = routes['/api/users/:id'];\n    const id = url.match(/\\/api\\/users\\/(\\d+)/)?.[1];\n    const req = { url, params: { id } };\n    const res = {\n      _status: 200,\n      status(c) { this._status = c; return this; },\n      json(d) { console.log(`[${this._status}] ${url}:`, JSON.stringify(d, null, 2)); }\n    };\n    if (exactMatch) exactMatch(req, res);\n    else if (id && paramMatch) paramMatch(req, res);\n    else console.log('404: Route not found');\n  }\n};\n\napp.get('/api/users', (req, res) => {\n  res.status(200).json({ count: users.length, users });\n});\n\napp.get('/api/users/:id', (req, res) => {\n  const user = users.find(u => u.id === Number(req.params.id));\n  if (!user) return res.status(404).json({ error: 'User not found' });\n  res.status(200).json({ user });\n});\n\napp.simulate('/api/users');\napp.simulate('/api/users/2');\napp.simulate('/api/users/99');\n",
    },
    language: 'js',
  },

  'rest-post': {
    numberTitle: '26. REST POST Route',
    mainHeading: 'REST POST Route',
    introduction:
      "GET retrieves — POST creates! The POST method is how clients send new data to your API to add to your data store! ✏️",
    conceptExplanation:
      "A RESTful POST route accepts data in req.body, validates it, creates a new resource, and returns it with a 201 Created status code. The response typically includes the newly created resource with its server-generated ID. POST requests are not idempotent — calling them twice creates two resources.",
    funFact:
      "HTTP 201 Created is specifically designed for successful resource creation and differs from 200 OK. Many APIs incorrectly return 200 for POST responses — a subtle deviation from the REST standard that can confuse client-side caching logic!",
    relatedConcepts: [
      { title: 'POST /resource', desc: "Creates a new resource using data from req.body." },
      { title: 'HTTP 201 Created', desc: "The correct status code for a successfully created resource." },
      { title: 'Validation', desc: "Always check that required fields exist in req.body before creating." },
    ],
    taskTheme: "Build a REST POST endpoint that validates input and adds a new user! ✏️",
    steps: [
      "Set up an in-memory users array.",
      "Define a POST /api/users route that reads name and email from req.body.",
      "Validate that both fields are present; return 400 if not.",
      "Create the new user with an auto-incremented ID and return it with status 201.",
    ],
    closingLine: "POST routes are the create layer of your REST API — every new user, post, and order starts here! 🆕",
    hint: "Return res.status(201).json({ user: newUser }) after successfully adding the user to the array.",
    defaultFiles: {
      html: NODE_HTML,
      js: "const users = [\n  { id: 1, name: 'Alice', email: 'alice@example.com' }\n];\n\nconst postRoutes = {};\nconst app = {\n  post: (path, handler) => { postRoutes[path] = handler; },\n  simulate: (url, body) => {\n    const handler = postRoutes[url];\n    if (!handler) return console.log('404: No POST route for', url);\n    const req = { url, body };\n    const res = {\n      _status: 200,\n      status(c) { this._status = c; return this; },\n      json(d) { console.log(`[${this._status}] POST ${url}:`, JSON.stringify(d, null, 2)); }\n    };\n    handler(req, res);\n  }\n};\n\napp.post('/api/users', (req, res) => {\n  const { name, email } = req.body || {};\n  if (!name || !email) {\n    return res.status(400).json({ error: 'name and email are required' });\n  }\n  const newUser = { id: users.length + 1, name, email };\n  users.push(newUser);\n  res.status(201).json({ message: 'User created', user: newUser });\n});\n\napp.simulate('/api/users', { name: 'Diana', email: 'diana@example.com' });\napp.simulate('/api/users', { name: 'Eve' }); // Missing email\nconsole.log('Current users:', users.map(u => u.name).join(', '));\n",
    },
    language: 'js',
  },

  'rest-delete': {
    numberTitle: '27. REST DELETE Route',
    mainHeading: 'REST DELETE Route',
    introduction:
      "Every API needs the ability to remove data. The DELETE method is the final CRUD operation — and with it, your REST API is complete! 🗑️",
    conceptExplanation:
      "A RESTful DELETE route removes a resource identified by its ID in the URL parameter. It returns 200 or 204 on success, and 404 if the resource doesn't exist. 204 No Content is often preferred for DELETE since there's nothing meaningful to return after deletion.",
    funFact:
      "HTTP 204 No Content is the only successful response that intentionally has no body. Some clients struggle with it, which is why many APIs return 200 with a { message: 'Deleted' } JSON body instead — technically less correct but more client-friendly!",
    relatedConcepts: [
      { title: 'DELETE /resource/:id', desc: "Removes the resource with the given ID." },
      { title: 'HTTP 204 No Content', desc: "Success response for deletions with no response body." },
      { title: 'Array.findIndex()', desc: "Locate the index of the item to remove before splicing." },
    ],
    taskTheme: "Build a REST DELETE endpoint that removes a user by ID from the data store! 🗑️",
    steps: [
      "Set up a users array with a few initial users.",
      "Define a DELETE /api/users/:id route.",
      "Find the user by ID; return 404 if not found.",
      "Remove the user with splice() and return 200 with a confirmation message.",
      "Simulate two delete requests — one valid, one for a non-existent ID.",
    ],
    closingLine: "You've completed the full CRUD cycle — your REST API can Create, Read, Update, and Delete! 🏆",
    hint: "const idx = users.findIndex(u => u.id === Number(id)); if (idx !== -1) users.splice(idx, 1);",
    defaultFiles: {
      html: NODE_HTML,
      js: "const users = [\n  { id: 1, name: 'Alice' },\n  { id: 2, name: 'Bob' },\n  { id: 3, name: 'Carlos' }\n];\n\nconst deleteRoutes = {};\nconst app = {\n  delete: (path, handler) => { deleteRoutes[path] = handler; },\n  simulate: (url) => {\n    const handler = deleteRoutes['/api/users/:id'];\n    if (!handler) return console.log('404: No DELETE route');\n    const id = url.split('/').pop();\n    const req = { url, params: { id } };\n    const res = {\n      _status: 200,\n      status(c) { this._status = c; return this; },\n      json(d) { console.log(`[${this._status}] DELETE ${url}:`, JSON.stringify(d)); }\n    };\n    handler(req, res);\n  }\n};\n\napp.delete('/api/users/:id', (req, res) => {\n  const id = Number(req.params.id);\n  const idx = users.findIndex(u => u.id === id);\n  if (idx === -1) return res.status(404).json({ error: 'User not found' });\n  const deleted = users.splice(idx, 1)[0];\n  res.status(200).json({ message: `Deleted user: ${deleted.name}` });\n});\n\nconsole.log('Before:', users.map(u => u.name));\napp.simulate('/api/users/2');\napp.simulate('/api/users/99');\nconsole.log('After:', users.map(u => u.name));\n",
    },
    language: 'js',
  },

};

export default nodeExercises;
