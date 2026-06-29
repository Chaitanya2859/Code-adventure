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

const REACT_HTML = (title: string) =>
  `<!DOCTYPE html>\n<html>\n  <head>\n    <title>${title}</title>\n    <!-- Load React & ReactDOM -->\n    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>\n    <!-- Load Babel Standalone to compile JSX on the fly -->\n    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n  </head>\n  <body style="padding: 20px; font-family: sans-serif; background: #0b0f19; color: white;">\n    <div id="root"></div>\n\n    <!-- Link the JS script as text/babel so Babel compiles it -->\n    <script type="text/babel" src="script.js"></script>\n  </body>\n</html>\n`;

const reactExercises: Record<string, Exercise> = {

  'first-react-app': {
    numberTitle: '01. Create Your First React App',
    mainHeading: 'Create Your First React App',
    introduction: 'React is the most popular JavaScript library for building user interfaces — used by Facebook, Instagram, Netflix, and thousands of companies worldwide. Today you write your very first React app from scratch! 🚀',
    conceptExplanation: 'A React app is built from components — small, reusable pieces of UI. The entry point is always `ReactDOM.createRoot()`, which tells React which DOM element to take over. Inside, you render a component written in JSX, a syntax that looks like HTML but lives inside JavaScript.',
    funFact: 'React was created by Jordan Walke at Facebook in 2011 and open-sourced in 2013. It fundamentally changed how developers think about building UIs — shifting from imperative DOM manipulation to declarative component trees.',
    relatedConcepts: [
      { title: 'ReactDOM.createRoot()', desc: 'Mounts a React application into a real DOM node, making React take control of that element.' },
      { title: 'root.render()', desc: 'Tells React what component to display inside the root DOM node.' },
      { title: 'JSX', desc: 'A syntax extension that lets you write HTML-like markup directly inside JavaScript.' }
    ],
    taskTheme: 'Bootstrap a React app and render your first message to the screen! 🎉',
    steps: [
      'In the JS tab, define a simple component: <code>function App() { return &lt;h1&gt;Hello, React!&lt;/h1&gt;; }</code>',
      'Create the React root: <code>const root = ReactDOM.createRoot(document.getElementById("root"));</code>',
      'Render your component: <code>root.render(&lt;App /&gt;);</code>',
      'Click Run — you should see "Hello, React!" on the dark background.',
      'Change the message text and run again to confirm it updates!'
    ],
    closingLine: 'Your first React app is live — welcome to the React ecosystem! 🌍✨',
    hint: 'Make sure your component name starts with a capital letter (App, not app). React treats lowercase names as plain HTML tags.',
    defaultFiles: {
      html: REACT_HTML('Create Your First React App'),
      js: `function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>My first React app is running 🎉</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'jsx-basics': {
    numberTitle: '02. JSX Basics',
    mainHeading: 'JSX Basics',
    introduction: 'JSX looks like HTML, but it\'s a supercharged version that lives inside JavaScript. It\'s the secret sauce that makes React components so readable and intuitive to write! 🌶️',
    conceptExplanation: 'JSX (JavaScript XML) is a syntax extension that Babel compiles into regular `React.createElement()` calls. Rules to remember: every element must be closed (including `&lt;br /&gt;`), multiple elements need a single parent wrapper, use `className` instead of `class`, and embed JavaScript expressions using `{}` curly braces.',
    funFact: 'JSX is entirely optional in React — you could write `React.createElement("h1", null, "Hello")` instead. But almost no one does, because JSX is dramatically more readable!',
    relatedConcepts: [
      { title: 'JSX Expression {}', desc: 'Curly braces let you embed any JavaScript expression inside JSX — variables, calculations, function calls.' },
      { title: 'className', desc: 'The JSX equivalent of the HTML class attribute, since "class" is a reserved word in JavaScript.' },
      { title: 'Single Root Element', desc: 'JSX must return one root element. Use a wrapper &lt;div&gt; or a React Fragment &lt;&gt;...&lt;/&gt; to group siblings.' }
    ],
    taskTheme: 'Write JSX that mixes HTML structure with live JavaScript expressions! 🧩',
    steps: [
      'Declare a variable above the return: <code>const name = "React Learner";</code>',
      'Use it inside JSX with curly braces: <code>&lt;h2&gt;Welcome, {name}!&lt;/h2&gt;</code>',
      'Add a math expression: <code>&lt;p&gt;2 + 2 = {2 + 2}&lt;/p&gt;</code>',
      'Add a className to a &lt;div&gt;: <code>&lt;div className="card"&gt;...&lt;/div&gt;</code>',
      'Run and confirm all expressions render correctly!'
    ],
    closingLine: 'JSX mastered — HTML and JavaScript living together in harmony! 🤝✨',
    hint: 'Use {} to inject any JavaScript value into JSX. If you need to return multiple elements, wrap them in a single parent &lt;div&gt; or an empty fragment &lt;&gt;&lt;/&gt;.',
    defaultFiles: {
      html: REACT_HTML('JSX Basics'),
      js: `function App() {
  const name = "React Learner";
  const year = 2025;

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Current year: {year}</p>
      <p>2 + 2 = {2 + 2}</p>
      <p className="note">JSX lets you mix HTML and JavaScript seamlessly.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'render-first-component': {
    numberTitle: '03. Render Your First Component',
    mainHeading: 'Render Your First Component',
    introduction: 'In React, the UI is made of components — like LEGO bricks, each one self-contained and reusable. Let\'s build your first proper component and render it onto the page! 🧱',
    conceptExplanation: 'A React component is a JavaScript function that returns JSX. Component names must start with a capital letter so React can distinguish them from plain HTML tags. You render a component by writing it like an HTML tag: `&lt;MyComponent /&gt;`. The same component can be rendered many times across your app.',
    funFact: 'Every React application — no matter how large — is just a tree of components. Facebook\'s UI is made of thousands of individual React components all nested together!',
    relatedConcepts: [
      { title: 'Component', desc: 'A reusable, self-contained piece of UI defined as a JavaScript function that returns JSX.' },
      { title: 'Rendering', desc: 'The process of React calling your component function and converting the returned JSX into real DOM elements.' },
      { title: 'Component Tree', desc: 'The hierarchy of components nested inside each other that makes up a React application.' }
    ],
    taskTheme: 'Build a self-contained card component and render it to the screen! 🃏',
    steps: [
      'Define a component: <code>function ProfileCard() { return &lt;div&gt;&lt;h2&gt;Ada Lovelace&lt;/h2&gt;&lt;p&gt;First programmer&lt;/p&gt;&lt;/div&gt;; }</code>',
      'Render it inside App: <code>&lt;ProfileCard /&gt;</code>',
      'Render it twice: <code>&lt;ProfileCard /&gt;&lt;ProfileCard /&gt;</code>',
      'Click Run — both cards appear!',
      'Notice how you reused the component without copying code.'
    ],
    closingLine: 'First component rendered — you\'re officially building with React! 🏗️✨',
    hint: 'Remember: component names must start with a capital letter. &lt;profileCard /&gt; would be treated as an unknown HTML tag, not your component!',
    defaultFiles: {
      html: REACT_HTML('Render Your First Component'),
      js: `function ProfileCard() {
  return (
    <div style={{ border: "1px solid #444", borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
      <h2 style={{ margin: 0 }}>Ada Lovelace</h2>
      <p style={{ color: "#aaa" }}>World's first programmer ✨</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>My Team</h1>
      <ProfileCard />
      <ProfileCard />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'function-component': {
    numberTitle: '04. Function Component',
    mainHeading: 'Function Component',
    introduction: 'Modern React is all about function components. Clean, readable, and powerful — they replaced the older class-based approach and are now the standard way to build everything in React. 🎯',
    conceptExplanation: 'A function component is simply a JavaScript function that accepts an optional `props` argument and returns JSX. They can use React hooks (like `useState` and `useEffect`) to add interactivity and side effects. Arrow function syntax is also popular: `const MyComponent = () => &lt;p&gt;Hello&lt;/p&gt;;`.',
    funFact: 'Before React 16.8 (released in 2019), function components could not use state or lifecycle methods — you had to use class components for that. React Hooks changed everything!',
    relatedConcepts: [
      { title: 'Function Component', desc: 'A plain JavaScript function that returns JSX and optionally accepts props as its argument.' },
      { title: 'Arrow Function Component', desc: 'A component written with arrow function syntax: const MyComp = () => &lt;div&gt;...&lt;/div&gt;;' },
      { title: 'React Hooks', desc: 'Special functions (like useState, useEffect) that let function components use state and other React features.' }
    ],
    taskTheme: 'Create several function components using both syntaxes! ✍️',
    steps: [
      'Write a named function component: <code>function Header() { return &lt;h1&gt;My App&lt;/h1&gt;; }</code>',
      'Write an arrow function component: <code>const Footer = () => &lt;footer&gt;© 2025&lt;/footer&gt;;</code>',
      'Compose them inside App: <code>&lt;Header /&gt; ... &lt;Footer /&gt;</code>',
      'Click Run and see the full page structure.',
      'Try adding more components and nesting them!'
    ],
    closingLine: 'Function components locked in — the modern way to build React UIs! 🔒✨',
    hint: 'Both `function MyComp() {}` and `const MyComp = () => {}` create valid React components. The key rule is: the name must start with a capital letter.',
    defaultFiles: {
      html: REACT_HTML('Function Component'),
      js: `function Header() {
  return <h1 style={{ borderBottom: "1px solid #444", paddingBottom: "8px" }}>🚀 My React App</h1>;
}

const MainContent = () => (
  <main>
    <p>This is written as an arrow function component.</p>
    <p>Both styles produce the same result!</p>
  </main>
);

function Footer() {
  return <footer style={{ marginTop: "20px", color: "#666" }}>© 2025 My App</footer>;
}

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'component-props': {
    numberTitle: '05. Component Props',
    mainHeading: 'Component Props',
    introduction: 'A component that always shows the same thing isn\'t very useful. Props are how you pass custom data into a component — making it flexible enough to render anything you throw at it! 📬',
    conceptExplanation: 'Props (short for "properties") are read-only inputs passed to a component via JSX attributes, just like HTML attributes. Inside the component, they\'re accessed via the `props` argument (or destructured directly). For example: `&lt;Card title="Hello" /&gt;` passes `"Hello"` as the `title` prop.',
    funFact: 'Props flow in one direction in React — from parent to child. This "one-way data flow" makes it much easier to trace where data comes from and debug issues in large apps.',
    relatedConcepts: [
      { title: 'Props', desc: 'Read-only data passed from a parent component to a child component via JSX attributes.' },
      { title: 'Props Destructuring', desc: 'Extracting specific props directly in the function signature: function Card({ title, desc }) { ... }' },
      { title: 'One-Way Data Flow', desc: 'Data in React flows from parent to child, never upward, keeping the app predictable.' }
    ],
    taskTheme: 'Build a reusable card component that renders different content via props! 🃏',
    steps: [
      'Define: <code>function Card({ title, description }) { return &lt;div&gt;&lt;h2&gt;{title}&lt;/h2&gt;&lt;p&gt;{description}&lt;/p&gt;&lt;/div&gt;; }</code>',
      'Render it with props: <code>&lt;Card title="React" description="A UI library" /&gt;</code>',
      'Render it again with different props: <code>&lt;Card title="JavaScript" description="The language of the web" /&gt;</code>',
      'Click Run — same component, different content!',
      'Try adding more props like a color or emoji.'
    ],
    closingLine: 'Props mastered — one component, infinite possibilities! 🌈✨',
    hint: 'Destructure props in the function signature for cleaner code: function Card({ title, description }) instead of function Card(props) and then props.title.',
    defaultFiles: {
      html: REACT_HTML('Component Props'),
      js: `function Card({ title, description, emoji }) {
  return (
    <div style={{
      border: "1px solid #333",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px",
      background: "#1a1f2e"
    }}>
      <h2>{emoji} {title}</h2>
      <p style={{ color: "#bbb" }}>{description}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Tech Cards</h1>
      <Card title="React" description="A library for building UIs" emoji="⚛️" />
      <Card title="JavaScript" description="The language of the web" emoji="🟨" />
      <Card title="Node.js" description="JavaScript on the server" emoji="🟢" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'multiple-components': {
    numberTitle: '06. Multiple Components',
    mainHeading: 'Multiple Components',
    introduction: 'Real apps aren\'t one giant component — they\'re a team effort. Breaking your UI into multiple small components makes it easier to build, test, update, and reuse each piece independently! 🧩',
    conceptExplanation: 'Components can be nested inside each other to form a tree. A parent component renders child components in its JSX. This composition pattern is fundamental to React — you build complex UIs by combining simple, focused components rather than writing one monolithic block.',
    funFact: 'The React DevTools browser extension lets you inspect your component tree visually — you can see every component, its props, and its state. It\'s an essential tool for any React developer!',
    relatedConcepts: [
      { title: 'Component Composition', desc: 'Building complex UIs by nesting smaller, focused components inside each other.' },
      { title: 'Parent Component', desc: 'A component that renders other components inside its JSX.' },
      { title: 'Child Component', desc: 'A component that is rendered by a parent and receives data via props.' }
    ],
    taskTheme: 'Build a mini landing page by composing multiple components! 🏠',
    steps: [
      'Create a <code>Navbar</code> component with a title.',
      'Create a <code>Hero</code> component with a headline and subtitle.',
      'Create a <code>Footer</code> component with a copyright line.',
      'Compose all three inside <code>App</code>: <code>&lt;Navbar /&gt;&lt;Hero /&gt;&lt;Footer /&gt;</code>',
      'Run and see your composed page — then try reordering the components!'
    ],
    closingLine: 'Multi-component architecture unlocked — this is how real React apps are built! 🏛️✨',
    hint: 'Each component should do one thing well. If a component is getting too long, it\'s a sign it should be split into smaller child components.',
    defaultFiles: {
      html: REACT_HTML('Multiple Components'),
      js: `function Navbar() {
  return (
    <nav style={{ background: "#1a1f2e", padding: "12px 20px", borderRadius: "8px", marginBottom: "20px" }}>
      <strong>⚛️ MyReactSite</strong>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ textAlign: "center", padding: "40px 0" }}>
      <h1>Build Amazing UIs</h1>
      <p style={{ color: "#aaa" }}>Compose components. Ship fast. Scale easily.</p>
      <button style={{ padding: "10px 24px", background: "#61dafb", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Get Started
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ textAlign: "center", color: "#555", marginTop: "40px", borderTop: "1px solid #333", paddingTop: "16px" }}>
      © 2025 MyReactSite. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'create-state': {
    numberTitle: '07. Create State',
    mainHeading: 'Create State',
    introduction: 'In programming, components often need to remember things: the active tab, a user name, or items in a cart. In React, we use "state" to store this temporary memory. 🧠',
    conceptExplanation: 'React provides a special function called `useState` to add local memory to components. It returns two things: the current value of the state, and a function to update it. When state changes, React automatically re-renders the component with the new value.',
    funFact: 'Whenever state changes, React automatically re-runs your component function and updates the page with the new value. No manual DOM selectors needed!',
    relatedConcepts: [
      { title: 'useState Hook', desc: 'A built-in React function that lets components maintain local state memory.' },
      { title: 'State Variable', desc: 'The container that holds the current value of state.' },
      { title: 'State Updater', desc: 'The second value returned by useState — a function that triggers a re-render when called.' }
    ],
    taskTheme: 'Build a component that tracks a toggle status! 💡',
    steps: [
      'Destructure useState from React: <code>const { useState } = React;</code>',
      'Declare toggle state inside the component: <code>const [isOn, setIsOn] = useState(false);</code>',
      'Display the current value: <code>&lt;p&gt;Status: {isOn ? "ON" : "OFF"}&lt;/p&gt;</code>',
      'Add a button that calls setIsOn to flip the value.',
      'Click Run and toggle the state!'
    ],
    closingLine: 'Component memory activated successfully! 🚀✨',
    hint: 'Use React destructuring: const [state, setState] = React.useState(initialValue); The first item is the value, the second is the updater function.',
    defaultFiles: {
      html: REACT_HTML('Create State'),
      js: `const { useState } = React;

function App() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h1>Light Bulb 💡</h1>
      <p style={{ fontSize: "20px" }}>Status: <strong>{isOn ? "ON 🟡" : "OFF ⚫"}</strong></p>
      <button
        onClick={() => setIsOn(!isOn)}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "6px", border: "none", background: isOn ? "#f0c040" : "#555", color: isOn ? "#000" : "#fff" }}
      >
        Toggle Light
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'update-state': {
    numberTitle: '08. Update State',
    mainHeading: 'Update State',
    introduction: 'Creating state is just the beginning — the real power is updating it. When state changes, React automatically re-renders the component so your UI always reflects the latest data. No manual DOM needed! 🔄',
    conceptExplanation: 'You update state by calling the setter function returned by `useState`. Always set state to a new value — never mutate the existing one directly. For updates that depend on the previous value (like incrementing a counter), pass a function to the setter: `setCount(prev => prev + 1)`. This ensures you always work with the latest state.',
    funFact: 'React batches multiple state updates that happen in the same event handler into a single re-render — this is a performance optimisation introduced in React 18!',
    relatedConcepts: [
      { title: 'Setter Function', desc: 'The function returned by useState that updates state and triggers a re-render.' },
      { title: 'Functional Update', desc: 'Passing a callback to the setter: setState(prev => prev + 1) — safe when new state depends on old state.' },
      { title: 'Re-render', desc: 'React calling your component function again after state changes to produce updated JSX.' }
    ],
    taskTheme: 'Build a score tracker that updates state on button clicks! 🎮',
    steps: [
      'Create state: <code>const [score, setScore] = useState(0);</code>',
      'Add an increment button: <code>&lt;button onClick={() =&gt; setScore(score + 1)}&gt;+1&lt;/button&gt;</code>',
      'Add a decrement button: <code>&lt;button onClick={() =&gt; setScore(score - 1)}&gt;-1&lt;/button&gt;</code>',
      'Add a reset button: <code>&lt;button onClick={() =&gt; setScore(0)}&gt;Reset&lt;/button&gt;</code>',
      'Click Run and interact with all three buttons!'
    ],
    closingLine: 'State updating like a pro — your UI reacts to every user action! ⚡✨',
    hint: 'When the new state depends on the previous value, use the functional form: setScore(prev => prev + 1). It\'s safer than setScore(score + 1) in async scenarios.',
    defaultFiles: {
      html: REACT_HTML('Update State'),
      js: `const { useState } = React;

function App() {
  const [score, setScore] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Score Tracker 🎮</h1>
      <p style={{ fontSize: "48px", margin: "20px 0" }}>{score}</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => setScore(prev => prev - 1)} style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#e74c3c", color: "white" }}>-1</button>
        <button onClick={() => setScore(0)} style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#555", color: "white" }}>Reset</button>
        <button onClick={() => setScore(prev => prev + 1)} style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#2ecc71", color: "white" }}>+1</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'counter-app': {
    numberTitle: '09. Counter App',
    mainHeading: 'Counter App',
    introduction: 'The counter is the "Hello World" of React state — a classic mini-app that ties together components, state, and events in one tight package. Let\'s build a polished version! 🔢',
    conceptExplanation: 'A counter app demonstrates the full React state loop: a user clicks a button (event) → the event handler calls the state setter → state updates → React re-renders the component → the new count appears. This cycle is the heartbeat of every interactive React application.',
    funFact: 'Many interview questions about React start with "build a counter" because it tests whether you understand state, event handlers, and re-rendering all at once!',
    relatedConcepts: [
      { title: 'State Update Cycle', desc: 'The loop: event → setState → re-render → updated UI. The foundation of all React interactivity.' },
      { title: 'Event Handler', desc: 'A function passed to JSX event props like onClick that runs when the user interacts.' },
      { title: 'Controlled Re-render', desc: 'React only re-renders components whose state or props have changed, keeping updates efficient.' }
    ],
    taskTheme: 'Build a fully featured counter with increment, decrement, and reset! 🔢',
    steps: [
      'Set up state: <code>const [count, setCount] = useState(0);</code>',
      'Display the count in a large heading.',
      'Add three buttons: Increment (+), Decrement (-), Reset.',
      'Wire each button\'s onClick to the appropriate state update.',
      'Style it nicely and click Run to enjoy your counter!'
    ],
    closingLine: 'Counter complete — you\'ve built the quintessential React app! 🏆✨',
    hint: 'For increment use setCount(prev => prev + 1), for decrement setCount(prev => prev - 1), and for reset just setCount(0).',
    defaultFiles: {
      html: REACT_HTML('Counter App'),
      js: `const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", maxWidth: "300px", margin: "0 auto" }}>
      <h1>Counter App</h1>
      <div style={{ fontSize: "72px", fontWeight: "bold", margin: "20px 0", color: count > 0 ? "#2ecc71" : count < 0 ? "#e74c3c" : "#fff" }}>
        {count}
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={() => setCount(prev => prev - 1)} style={{ padding: "12px 24px", fontSize: "20px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#e74c3c", color: "white", fontWeight: "bold" }}>−</button>
        <button onClick={() => setCount(0)} style={{ padding: "12px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#555", color: "white" }}>Reset</button>
        <button onClick={() => setCount(prev => prev + 1)} style={{ padding: "12px 24px", fontSize: "20px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#2ecc71", color: "white", fontWeight: "bold" }}>+</button>
      </div>
    </div>
  );
}

function App() {
  return <Counter />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'click-event': {
    numberTitle: '10. Click Event',
    mainHeading: 'Click Event',
    introduction: 'User interaction is what separates a webpage from a web app. React makes it trivially easy to respond to clicks — no `addEventListener` needed, just a prop on your JSX element! 🖱️',
    conceptExplanation: 'In React, you handle events by passing a function to the element\'s event prop. For clicks, that\'s `onClick`. The function receives a synthetic event object `e` as its argument. You can define the handler inline as an arrow function or as a separate named function — both are common patterns.',
    funFact: 'React uses "Synthetic Events" — cross-browser wrapper objects around the native browser events. This means your event handling code works identically across Chrome, Firefox, Safari, and Edge!',
    relatedConcepts: [
      { title: 'onClick', desc: 'A JSX prop that accepts a function to run when the element is clicked.' },
      { title: 'Event Handler', desc: 'A function that responds to a user action. Receives a synthetic event object as its argument.' },
      { title: 'Synthetic Event', desc: 'React\'s cross-browser wrapper around native DOM events, ensuring consistent behaviour.' }
    ],
    taskTheme: 'Create buttons that trigger different actions when clicked! 🖱️',
    steps: [
      'Write a named handler: <code>function handleClick() { alert("Clicked!"); }</code>',
      'Attach it to a button: <code>&lt;button onClick={handleClick}&gt;Click Me&lt;/button&gt;</code>',
      'Try an inline handler: <code>&lt;button onClick={() =&gt; alert("Inline!")}&gt;Inline&lt;/button&gt;</code>',
      'Log the event object: <code>function handleClick(e) { console.log(e.target); }</code>',
      'Run and click both buttons — observe the different approaches!'
    ],
    closingLine: 'Click events handled — your components now respond to users! 🎯✨',
    hint: 'Pass the function reference to onClick — not a call. Use onClick={handleClick} not onClick={handleClick()}. The second version calls the function immediately on render!',
    defaultFiles: {
      html: REACT_HTML('Click Event'),
      js: `const { useState } = React;

function App() {
  const [message, setMessage] = useState("Click a button below!");

  function handleGreen() {
    setMessage("You clicked the Green button! 🟢");
  }

  return (
    <div>
      <h1>Click Events</h1>
      <p style={{ fontSize: "18px", minHeight: "30px", color: "#aaa" }}>{message}</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button onClick={handleGreen} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#2ecc71", color: "#000", fontWeight: "bold" }}>
          Green
        </button>
        <button onClick={() => setMessage("You clicked the Blue button! 🔵")} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white", fontWeight: "bold" }}>
          Blue
        </button>
        <button onClick={() => setMessage("You clicked the Red button! 🔴")} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#e74c3c", color: "white", fontWeight: "bold" }}>
          Red
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'input-change-event': {
    numberTitle: '11. Input Change Event',
    mainHeading: 'Input Change Event',
    introduction: 'Buttons are one type of interaction, but text inputs are where users really communicate with your app. React\'s `onChange` event fires on every keystroke — giving you live access to what the user is typing! ⌨️',
    conceptExplanation: 'The `onChange` event on an `&lt;input&gt;` fires every time the input\'s value changes. Inside the handler, `e.target.value` gives you the current text. Combined with state, this lets you capture, display, and react to user input in real time.',
    funFact: 'React\'s `onChange` behaves like the browser\'s `oninput` event (not the native `onchange` which only fires on blur). This is intentional — it gives you live keystroke-by-keystroke updates!',
    relatedConcepts: [
      { title: 'onChange', desc: 'A JSX event prop on input elements that fires whenever the value changes.' },
      { title: 'e.target.value', desc: 'The current string value of the input element, accessed from the event object.' },
      { title: 'Live Update', desc: 'Updating state on every keystroke so the UI reflects what the user is typing in real time.' }
    ],
    taskTheme: 'Capture user input and display it live as they type! 📝',
    steps: [
      'Create state for the input: <code>const [text, setText] = useState("");</code>',
      'Write a handler: <code>function handleChange(e) { setText(e.target.value); }</code>',
      'Bind to an input: <code>&lt;input onChange={handleChange} value={text} /&gt;</code>',
      'Display the value: <code>&lt;p&gt;You typed: {text}&lt;/p&gt;</code>',
      'Run and type — watch the text appear in real time!'
    ],
    closingLine: 'Input captured — your app is now listening to every keystroke! 📡✨',
    hint: 'Always read the value from e.target.value inside the onChange handler. Then call your setState function with that value to keep state in sync with the input.',
    defaultFiles: {
      html: REACT_HTML('Input Change Event'),
      js: `const { useState } = React;

function App() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <h1>Live Input ⌨️</h1>
      <input
        type="text"
        placeholder="Start typing..."
        value={text}
        onChange={handleChange}
        style={{ padding: "10px", fontSize: "16px", width: "100%", maxWidth: "400px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f2e", color: "white", boxSizing: "border-box" }}
      />
      <p style={{ marginTop: "16px", color: "#aaa" }}>
        You typed: <strong style={{ color: "white" }}>{text || "..."}</strong>
      </p>
      <p style={{ color: "#666" }}>Character count: {text.length}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'button-interaction': {
    numberTitle: '12. Button Interaction',
    mainHeading: 'Button Interaction',
    introduction: 'Buttons aren\'t just for incrementing counters. They control modals, toggle themes, submit forms, and drive almost every user action in a web app. Let\'s explore richer button interactions! 🎛️',
    conceptExplanation: 'A button\'s `onClick` handler can do anything: update state, conditionally show/hide elements, call functions, or trigger chains of effects. Buttons can also be disabled using the `disabled` prop, and styled dynamically based on state using inline styles or conditional `className` values.',
    funFact: 'The `disabled` attribute prevents click events from firing entirely — you don\'t need to add an `if` check inside your handler. React respects native HTML behaviour for disabled elements.',
    relatedConcepts: [
      { title: 'disabled Prop', desc: 'Set disabled={true} on a button to prevent it from being clicked.' },
      { title: 'Dynamic Styling', desc: 'Use state to conditionally change a button\'s appearance: style={{ background: isActive ? "blue" : "gray" }}' },
      { title: 'Toggle Pattern', desc: 'A common pattern where clicking a button flips a boolean state value on and off.' }
    ],
    taskTheme: 'Build an interactive button panel with visual feedback! 🎛️',
    steps: [
      'Create: <code>const [liked, setLiked] = useState(false);</code>',
      'Build a Like button that toggles: <code>&lt;button onClick={() =&gt; setLiked(!liked)}&gt;{liked ? "❤️ Liked" : "🤍 Like"}&lt;/button&gt;</code>',
      'Add a disabled state: <code>const [disabled, setDisabled] = useState(false);</code>',
      'Create a button that disables itself after one click.',
      'Run and interact with both buttons!'
    ],
    closingLine: 'Button interactions complete — your UI responds with personality! 💅✨',
    hint: 'To disable a button after clicking: onClick={() => setDisabled(true)} and add disabled={disabled} to the button element.',
    defaultFiles: {
      html: REACT_HTML('Button Interaction'),
      js: `const { useState } = React;

function App() {
  const [liked, setLiked] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <h1>Button Interactions 🎛️</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>Like button:</p>
        <button
          onClick={() => setLiked(!liked)}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "6px", border: "none", background: liked ? "#e74c3c" : "#333", color: "white" }}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>Claim reward (once only):</p>
        <button
          onClick={() => setClaimed(true)}
          disabled={claimed}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: claimed ? "not-allowed" : "pointer", borderRadius: "6px", border: "none", background: claimed ? "#555" : "#f39c12", color: "white", opacity: claimed ? 0.5 : 1 }}
        >
          {claimed ? "✅ Claimed!" : "🎁 Claim Reward"}
        </button>
      </div>

      <div>
        <p>Toggle theme:</p>
        <button
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "6px", border: "none", background: theme === "dark" ? "#333" : "#f0f0f0", color: theme === "dark" ? "white" : "black" }}
        >
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'if-rendering': {
    numberTitle: '13. If Rendering',
    mainHeading: 'If Rendering',
    introduction: 'Not everything should be visible all the time. A loading spinner, an error message, a user menu — these appear only when needed. React makes conditional rendering clean and powerful! 🎭',
    conceptExplanation: 'In React, you can conditionally render JSX using a regular JavaScript `if` statement before the return. If a condition is true, return one JSX tree; otherwise return another (or `null` to render nothing at all). Returning `null` from a component is perfectly valid and renders nothing.',
    funFact: 'Returning `null` from a React component is a common pattern for "guard components" — components that decide whether to render their children or nothing, based on permissions or state.',
    relatedConcepts: [
      { title: 'Conditional Rendering', desc: 'Rendering different JSX (or nothing) based on a condition, using if/else or other logic.' },
      { title: 'Returning null', desc: 'A component can return null to render nothing — useful for hiding content conditionally.' },
      { title: 'Guard Pattern', desc: 'Using an early return to skip rendering when a condition isn\'t met: if (!isLoggedIn) return null;' }
    ],
    taskTheme: 'Show different UI based on a login state toggle! 🔐',
    steps: [
      'Create: <code>const [isLoggedIn, setIsLoggedIn] = useState(false);</code>',
      'Before the return, write: <code>if (isLoggedIn) { return &lt;p&gt;Welcome back!&lt;/p&gt;; }</code>',
      'In the main return, show a login prompt.',
      'Add a toggle button that flips isLoggedIn.',
      'Run and toggle between the two views!'
    ],
    closingLine: 'Conditional rendering mastered — your UI adapts to any state! 🔀✨',
    hint: 'You can use a regular if statement before the JSX return to return completely different markup. Returning null renders nothing at all.',
    defaultFiles: {
      html: REACT_HTML('If Rendering'),
      js: `const { useState } = React;

function Dashboard() {
  return (
    <div style={{ background: "#1a1f2e", padding: "20px", borderRadius: "10px" }}>
      <h2>👋 Welcome back!</h2>
      <p style={{ color: "#aaa" }}>You are logged in. Here is your dashboard.</p>
    </div>
  );
}

function LoginPrompt() {
  return (
    <div style={{ background: "#1a1f2e", padding: "20px", borderRadius: "10px" }}>
      <h2>🔒 Please log in</h2>
      <p style={{ color: "#aaa" }}>You need to log in to see your dashboard.</p>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>If Rendering</h1>
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{ padding: "10px 20px", marginBottom: "20px", cursor: "pointer", borderRadius: "6px", border: "none", background: isLoggedIn ? "#e74c3c" : "#2ecc71", color: "white", fontWeight: "bold" }}
      >
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
      {isLoggedIn ? <Dashboard /> : <LoginPrompt />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'ternary-rendering': {
    numberTitle: '14. Ternary Rendering',
    mainHeading: 'Ternary Rendering',
    introduction: 'The ternary operator is the inline shortcut for conditional rendering in JSX. It lets you choose between two outputs in a single expression — keeping your JSX clean and concise! ❓',
    conceptExplanation: 'Inside JSX, you can\'t use `if` statements directly (only expressions are allowed). The ternary operator `condition ? valueIfTrue : valueIfFalse` is the go-to solution. For "show this or nothing", the short-circuit `&&` operator is even more concise: `condition && &lt;Component /&gt;`.',
    funFact: 'The `&&` short-circuit trick is great for "show or hide" patterns, but be careful with falsy numbers! `{0 && <Comp />}` renders the number 0 on screen, not nothing. Always use `{count > 0 && <Comp />}` to be safe.',
    relatedConcepts: [
      { title: 'Ternary Operator', desc: 'condition ? trueOutput : falseOutput — the standard way to conditionally render inside JSX.' },
      { title: '&& Short Circuit', desc: 'condition && &lt;Component /&gt; — renders the component only when the condition is true.' },
      { title: 'Inline Conditional', desc: 'Embedding conditional logic directly inside JSX expressions using ternary or &&.' }
    ],
    taskTheme: 'Use ternary and && rendering to build a dynamic status display! 🚦',
    steps: [
      'Create: <code>const [isOnline, setIsOnline] = useState(true);</code>',
      'Use ternary in JSX: <code>{isOnline ? &lt;span&gt;🟢 Online&lt;/span&gt; : &lt;span&gt;🔴 Offline&lt;/span&gt;}</code>',
      'Use &&: <code>{isOnline &amp;&amp; &lt;p&gt;Connected to server&lt;/p&gt;}</code>',
      'Add a toggle button to flip isOnline.',
      'Run and toggle — watch both expressions update!'
    ],
    closingLine: 'Ternary rendering unlocked — your JSX can now branch in place! 🌿✨',
    hint: 'Use condition ? <A /> : <B /> when you need either/or. Use condition && <A /> when you only want to show something (or nothing) — no else needed.',
    defaultFiles: {
      html: REACT_HTML('Ternary Rendering'),
      js: `const { useState } = React;

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h1>Status Dashboard</h1>

      <p style={{ fontSize: "20px" }}>
        Server: {isOnline ? <span style={{ color: "#2ecc71" }}>🟢 Online</span> : <span style={{ color: "#e74c3c" }}>🔴 Offline</span>}
      </p>

      {isOnline && <p style={{ color: "#aaa" }}>✅ All systems operational. Latency: 12ms</p>}
      {!isOnline && <p style={{ color: "#e74c3c" }}>⚠️ Connection lost. Retrying...</p>}

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button onClick={() => setIsOnline(!isOnline)} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white" }}>
          Toggle Status
        </button>
        <button onClick={() => setShowDetails(!showDetails)} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#9b59b6", color: "white" }}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showDetails && (
        <div style={{ marginTop: "16px", background: "#1a1f2e", padding: "16px", borderRadius: "8px" }}>
          <p>Region: EU-West</p>
          <p>Uptime: 99.9%</p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'loading-component': {
    numberTitle: '15. Loading Component',
    mainHeading: 'Loading Component',
    introduction: 'Every app that fetches data needs a loading state. Without one, users stare at a blank screen and wonder if something broke. A loading component bridges the gap between "fetching" and "done"! ⏳',
    conceptExplanation: 'The loading pattern in React uses a boolean state variable (`isLoading`) that starts as `true` while data is being fetched and flips to `false` when it arrives. Using conditional rendering, you show a spinner or skeleton while loading, then swap in the real content when ready.',
    funFact: 'Research shows that users are more patient with loading screens that show visual progress — even fake spinners! That\'s why skeleton loaders (grey placeholder shapes) are now preferred over plain spinners in professional apps.',
    relatedConcepts: [
      { title: 'Loading State', desc: 'A boolean state variable that tracks whether an async operation is still in progress.' },
      { title: 'Spinner / Skeleton', desc: 'Visual placeholder UI shown while data is loading to indicate progress to the user.' },
      { title: 'Async UX Pattern', desc: 'Show loading → fetch data → hide loading and show content. The standard async UI flow.' }
    ],
    taskTheme: 'Build a component that simulates a data fetch with a loading state! ⏳',
    steps: [
      'Create: <code>const [isLoading, setIsLoading] = useState(true);</code>',
      'Simulate a fetch with setTimeout: <code>setTimeout(() =&gt; setIsLoading(false), 2000);</code> (use useEffect for this).',
      'Conditionally render a spinner or the real content.',
      'Add a Reload button that resets isLoading to true.',
      'Run and watch the loading state play out!'
    ],
    closingLine: 'Loading component built — no more blank screens for your users! 🎉✨',
    hint: 'Use useEffect with an empty dependency array [] to run the setTimeout once on mount. Clear the timeout on cleanup to avoid memory leaks.',
    defaultFiles: {
      html: REACT_HTML('Loading Component'),
      js: `const { useState, useEffect } = React;

function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ fontSize: "40px", animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
      <p style={{ color: "#aaa", marginTop: "12px" }}>Loading data...</p>
      <style>{"@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}

function DataCard({ name, role }) {
  return (
    <div style={{ background: "#1a1f2e", padding: "20px", borderRadius: "10px" }}>
      <h2>👤 {name}</h2>
      <p style={{ color: "#aaa" }}>Role: {role}</p>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function handleReload() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div>
      <h1>Loading Component ⏳</h1>
      {isLoading ? <Spinner /> : <DataCard name="Ada Lovelace" role="Senior Engineer" />}
      <button
        onClick={handleReload}
        disabled={isLoading}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: isLoading ? "not-allowed" : "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white", opacity: isLoading ? 0.5 : 1 }}
      >
        🔄 Reload
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'render-list': {
    numberTitle: '16. Render a List',
    mainHeading: 'Render a List',
    introduction: 'Almost every app displays lists: products, users, notifications, messages. React makes this elegant with `.map()` — transform an array of data into an array of JSX elements in one clean expression! 📋',
    conceptExplanation: 'The `.map()` array method is the standard way to render lists in React. It iterates over an array and returns a new array of JSX elements. Each element must have a unique `key` prop so React can efficiently update the list when items change.',
    funFact: '`.map()` doesn\'t mutate the original array — it always returns a brand new one. This aligns perfectly with React\'s preference for immutability and predictable data flow!',
    relatedConcepts: [
      { title: '.map()', desc: 'An array method that transforms each item into a new value — used in React to convert data into JSX elements.' },
      { title: 'key Prop', desc: 'A unique identifier on each list element that helps React track which items changed, were added, or removed.' },
      { title: 'List Rendering', desc: 'The pattern of mapping an array of data objects to an array of JSX components.' }
    ],
    taskTheme: 'Render a list of items from an array using .map()! 📋',
    steps: [
      'Define an array: <code>const fruits = ["Apple", "Banana", "Mango", "Grape"];</code>',
      'Inside JSX, use map: <code>{fruits.map(fruit =&gt; &lt;li&gt;{fruit}&lt;/li&gt;)}</code>',
      'Wrap in a &lt;ul&gt; tag.',
      'Add a key prop: <code>&lt;li key={fruit}&gt;{fruit}&lt;/li&gt;</code>',
      'Run and see your dynamic list!'
    ],
    closingLine: 'List rendered — an array of data transformed into beautiful UI! 🗂️✨',
    hint: 'Put the .map() call inside JSX curly braces: {myArray.map(item => <li key={item}>{item}</li>)}. Always add a key prop to avoid React warnings.',
    defaultFiles: {
      html: REACT_HTML('Render a List'),
      js: `function App() {
  const technologies = [
    { id: 1, name: "React", emoji: "⚛️" },
    { id: 2, name: "JavaScript", emoji: "🟨" },
    { id: 3, name: "TypeScript", emoji: "🔷" },
    { id: 4, name: "Node.js", emoji: "🟢" },
    { id: 5, name: "CSS", emoji: "🎨" },
  ];

  return (
    <div>
      <h1>Tech Stack 🛠️</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {technologies.map(tech => (
          <li key={tech.id} style={{ background: "#1a1f2e", margin: "8px 0", padding: "12px 16px", borderRadius: "8px", fontSize: "16px" }}>
            {tech.emoji} {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'add-keys': {
    numberTitle: '17. Add Keys',
    mainHeading: 'Add Keys',
    introduction: 'When React renders a list, it needs a way to track each item individually. Without keys, adding, removing, or reordering items can cause subtle bugs and poor performance. Keys are React\'s ID system! 🔑',
    conceptExplanation: 'The `key` prop is a special string or number that uniquely identifies each element in a list. React uses keys to determine what changed between renders. Keys should be stable (not array index if the list can reorder), unique among siblings, and not passed as a prop to the component (React uses it internally only).',
    funFact: 'Using array index as a key (key={i}) works for static lists but causes bugs when items are reordered or deleted. React may reuse the wrong component state because it tracks by position, not identity!',
    relatedConcepts: [
      { title: 'key Prop', desc: 'A unique identifier React uses internally to track list items across re-renders.' },
      { title: 'Stable Keys', desc: 'Keys that don\'t change between renders — ideally database IDs, not array indexes.' },
      { title: 'Reconciliation', desc: 'React\'s diffing algorithm that uses keys to efficiently update only changed list items.' }
    ],
    taskTheme: 'Practice adding correct, stable keys to a mapped list! 🔑',
    steps: [
      'Define an array of objects with unique IDs: <code>[{ id: 1, name: "Alice" }, ...]</code>',
      'Map over them: <code>{users.map(user =&gt; &lt;UserCard key={user.id} name={user.name} /&gt;)}</code>',
      'Notice: key goes on the outermost element returned from map.',
      'Try using index as key temporarily: <code>key={index}</code> — and note the difference.',
      'Switch back to ID-based keys — that\'s the right approach!'
    ],
    closingLine: 'Keys added correctly — React can now track your list items with precision! 🎯✨',
    hint: 'Always prefer IDs from your data as keys. If you must use index (static list that never reorders), that\'s the only acceptable case for index as key.',
    defaultFiles: {
      html: REACT_HTML('Add Keys'),
      js: `function UserCard({ name, role }) {
  return (
    <div style={{ background: "#1a1f2e", padding: "12px 16px", borderRadius: "8px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontSize: "24px" }}>👤</span>
      <div>
        <strong>{name}</strong>
        <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>{role}</p>
      </div>
    </div>
  );
}

function App() {
  const users = [
    { id: 101, name: "Alice Chen", role: "Frontend Developer" },
    { id: 102, name: "Bob Martin", role: "Backend Engineer" },
    { id: 103, name: "Cleo Park", role: "UX Designer" },
    { id: 104, name: "Dan Rivera", role: "DevOps Engineer" },
  ];

  return (
    <div>
      <h1>Team Members 🔑</h1>
      <p style={{ color: "#aaa" }}>Each card uses <code>key=&#123;user.id&#125;</code> — stable, unique keys.</p>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} role={user.role} />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'dynamic-list': {
    numberTitle: '18. Dynamic List Rendering',
    mainHeading: 'Dynamic List Rendering',
    introduction: 'Static lists are a start, but real apps let users add and remove items on the fly. A todo list, a shopping cart, a playlist — all powered by dynamic list state! 🧺',
    conceptExplanation: 'To add items, use the spread operator to create a new array with the new item appended: `setItems([...items, newItem])`. To remove items, use `.filter()` to return a new array without the item to remove. Never mutate the array directly — always create a new one.',
    funFact: 'The spread operator `...` makes a shallow copy of an array. This is important in React because state updates must produce a new reference for React to detect the change and trigger a re-render!',
    relatedConcepts: [
      { title: 'Spread Operator (…)', desc: 'Copies all elements from an existing array into a new one: [...oldArray, newItem].' },
      { title: '.filter()', desc: 'Returns a new array containing only elements that pass a test — used to remove items from list state.' },
      { title: 'Immutable Updates', desc: 'Always return a new array when updating list state — never push() or splice() the existing array.' }
    ],
    taskTheme: 'Build a dynamic todo list where you can add and delete items! ✅',
    steps: [
      'Create state: <code>const [todos, setTodos] = useState([]);</code> and <code>const [input, setInput] = useState("");</code>',
      'Add item: <code>setTodos([...todos, { id: Date.now(), text: input }]);</code>',
      'Remove item: <code>setTodos(todos.filter(t =&gt; t.id !== id));</code>',
      'Render the list with map and a delete button on each item.',
      'Run and build your todo list!'
    ],
    closingLine: 'Dynamic list complete — add, delete, repeat! Your app is alive! 🎉✨',
    hint: 'Use [...existing, newItem] to add (spread + append). Use .filter(item => item.id !== targetId) to remove. Both return new arrays — never mutate state directly.',
    defaultFiles: {
      html: REACT_HTML('Dynamic List Rendering'),
      js: `const { useState } = React;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
  ]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim() }]);
    setInput("");
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div style={{ maxWidth: "400px" }}>
      <h1>Dynamic Todo List ✅</h1>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="New todo..."
          style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f2e", color: "white", fontSize: "14px" }}
        />
        <button onClick={addTodo} style={{ padding: "10px 16px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#2ecc71", color: "white", fontWeight: "bold" }}>Add</button>
      </div>
      {todos.length === 0 && <p style={{ color: "#666" }}>No todos yet. Add one above!</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1f2e", padding: "12px 16px", borderRadius: "8px", marginBottom: "8px" }}>
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)} style={{ padding: "4px 10px", cursor: "pointer", borderRadius: "4px", border: "none", background: "#e74c3c", color: "white", fontSize: "12px" }}>✕</button>
          </li>
        ))}
      </ul>
      <p style={{ color: "#666", fontSize: "14px" }}>{todos.length} item{todos.length !== 1 ? "s" : ""}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'basic-useeffect': {
    numberTitle: '19. Basic useEffect',
    mainHeading: 'Basic useEffect',
    introduction: 'Some things need to happen automatically when a component loads — setting a page title, starting a timer, or logging an analytics event. `useEffect` is React\'s tool for these side effects! ⚙️',
    conceptExplanation: '`useEffect` is a React Hook that runs a function after every render (by default). It\'s the right place for side effects — things that reach outside the component like DOM manipulation, timers, subscriptions, or API calls. Pass an empty dependency array `[]` to run it only once, on mount.',
    funFact: 'The term "side effect" in programming means any operation that reaches beyond the function\'s own scope — like reading from a database, writing to the DOM, or calling an API. Pure functions have no side effects!',
    relatedConcepts: [
      { title: 'useEffect', desc: 'A React Hook for running side effects after a component renders.' },
      { title: 'Mount', desc: 'The moment a component is first inserted into the DOM. useEffect with [] runs once on mount.' },
      { title: 'Side Effect', desc: 'Any operation that interacts with something outside the component — timers, APIs, the document, etc.' }
    ],
    taskTheme: 'Use useEffect to update the page title and run a one-time action on load! ⚙️',
    steps: [
      'Import useEffect: <code>const { useState, useEffect } = React;</code>',
      'Inside your component, write: <code>useEffect(() =&gt; { document.title = "My React App"; }, []);</code>',
      'Add a console.log inside the effect to see when it runs.',
      'Check your browser tab — the title should change!',
      'Run and inspect the browser tab title and console output.'
    ],
    closingLine: 'useEffect activated — your components now have a lifecycle! 🌱✨',
    hint: 'The empty array [] as the second argument to useEffect means "run this only once, when the component first mounts." Without [], it runs after every render.',
    defaultFiles: {
      html: REACT_HTML('Basic useEffect'),
      js: `const { useState, useEffect } = React;

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [mountCount, setMountCount] = useState(0);

  // Runs once on mount
  useEffect(() => {
    setMountCount(1);
    document.title = "useEffect Demo ⚙️";
  }, []);

  // Runs on every render (no dependency array)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <h1>Basic useEffect ⚙️</h1>
      <div style={{ background: "#1a1f2e", padding: "20px", borderRadius: "10px", marginBottom: "16px" }}>
        <p>🕐 Live time: <strong>{time}</strong></p>
        <p style={{ color: "#aaa", fontSize: "14px" }}>Updated every second via useEffect + setInterval</p>
      </div>
      <div style={{ background: "#1a1f2e", padding: "20px", borderRadius: "10px" }}>
        <p>📌 Mount effect ran: <strong>{mountCount} time</strong></p>
        <p style={{ color: "#aaa", fontSize: "14px" }}>Ran once with empty [] dependency array</p>
      </div>
      <p style={{ color: "#666", fontSize: "13px", marginTop: "12px" }}>Check your browser tab title — it changed!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'dependency-array': {
    numberTitle: '20. Dependency Array',
    mainHeading: 'Dependency Array',
    introduction: 'The dependency array is useEffect\'s control panel. It tells React exactly when to re-run the effect — making it one of the most powerful (and most misunderstood) features in React! 🎛️',
    conceptExplanation: 'The dependency array is the second argument to `useEffect`. With `[]`, the effect runs once on mount. With `[value]`, it re-runs whenever `value` changes. With no array at all, it runs after every render. Getting this right is key to avoiding stale data and infinite loops.',
    funFact: 'A common React bug is forgetting to add a variable to the dependency array. The ESLint plugin `eslint-plugin-react-hooks` can automatically warn you about missing dependencies — it\'s enabled by default in Create React App!',
    relatedConcepts: [
      { title: 'Dependency Array []', desc: 'Controls when useEffect re-runs. Empty = once on mount. [val] = when val changes. None = every render.' },
      { title: 'Stale Closure', desc: 'A bug where useEffect captures an old value of a variable because it wasn\'t listed as a dependency.' },
      { title: 'Effect Cleanup', desc: 'The function optionally returned from useEffect that runs before the next effect or on unmount.' }
    ],
    taskTheme: 'Observe how the dependency array controls when effects re-run! 🎛️',
    steps: [
      'Create: <code>const [count, setCount] = useState(0);</code>',
      'Write an effect: <code>useEffect(() =&gt; { console.log("count changed to", count); }, [count]);</code>',
      'Click Run, then increment the counter — watch the console!',
      'Change the dependency array to [] — what happens now?',
      'Remove the array entirely — what changes?'
    ],
    closingLine: 'Dependency array mastered — you now control exactly when your effects fire! 🎯✨',
    hint: 'Include every variable from outside the effect that the effect uses. If you use count inside the effect, [count] should be in the dependency array.',
    defaultFiles: {
      html: REACT_HTML('Dependency Array'),
      js: `const { useState, useEffect } = React;

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Alice");
  const [log, setLog] = useState([]);

  // Re-runs when count changes
  useEffect(() => {
    setLog(prev => [...prev, \`count changed → \${count}\`]);
  }, [count]);

  // Re-runs when name changes
  useEffect(() => {
    setLog(prev => [...prev, \`name changed → \${name}\`]);
  }, [name]);

  return (
    <div>
      <h1>Dependency Array 🎛️</h1>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white" }}>
          Count: {count}
        </button>
        <button onClick={() => setName(n => n === "Alice" ? "Bob" : "Alice")} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#9b59b6", color: "white" }}>
          Name: {name}
        </button>
      </div>
      <div style={{ background: "#1a1f2e", padding: "16px", borderRadius: "10px", maxHeight: "200px", overflowY: "auto" }}>
        <p style={{ margin: "0 0 8px", color: "#aaa", fontSize: "13px" }}>Effect log:</p>
        {log.length === 0 && <p style={{ color: "#555", fontSize: "13px" }}>No effects yet...</p>}
        {log.map((entry, i) => (
          <p key={i} style={{ margin: "4px 0", fontSize: "13px", color: "#61dafb" }}>→ {entry}</p>
        ))}
      </div>
      <button onClick={() => setLog([])} style={{ marginTop: "12px", padding: "8px 16px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#555", color: "white", fontSize: "13px" }}>Clear Log</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'fetch-data-example': {
    numberTitle: '21. Fetch Data Example',
    mainHeading: 'Fetch Data Example',
    introduction: 'Almost every real app fetches data from an API — user profiles, weather, products. This is where React state, useEffect, and the Fetch API come together in the most common pattern in modern web development! 🌐',
    conceptExplanation: 'The pattern is: declare state for `data`, `isLoading`, and `error`. In a `useEffect` with `[]`, call `fetch()`, `await` the response, parse it as JSON, and update state. Handle the loading and error states in your JSX to give users clear feedback at every step.',
    funFact: 'JSONPlaceholder (jsonplaceholder.typicode.com) is a free fake REST API used by millions of developers for testing and demos — perfect for practising fetch without needing a backend!',
    relatedConcepts: [
      { title: 'fetch()', desc: 'The built-in browser API for making HTTP requests and retrieving data from URLs.' },
      { title: 'async/await', desc: 'Syntax for writing asynchronous code that reads like synchronous code. Used inside useEffect via an inner async function.' },
      { title: 'Data-Loading Pattern', desc: 'The standard React pattern: isLoading state → fetch in useEffect → render data or error.' }
    ],
    taskTheme: 'Fetch a list of users from a public API and display them! 🌐',
    steps: [
      'Set up three state variables: <code>data</code>, <code>isLoading</code>, <code>error</code>.',
      'Inside useEffect with [], write an async function that calls fetch and sets data.',
      'Set isLoading to true before fetching and false after.',
      'Conditionally render a spinner, error message, or the data.',
      'Run and watch data load from the real API!'
    ],
    closingLine: 'Data fetched and rendered — you just built a real-world React pattern! 🌍✨',
    hint: 'You can\'t make useEffect\'s callback async directly. Instead, define an async function inside useEffect and call it: async function load() { ... } load();',
    defaultFiles: {
      html: REACT_HTML('Fetch Data Example'),
      js: `const { useState, useEffect } = React;

function UserCard({ user }) {
  return (
    <div style={{ background: "#1a1f2e", padding: "12px 16px", borderRadius: "8px", marginBottom: "8px" }}>
      <strong>{user.name}</strong>
      <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: "13px" }}>📧 {user.email}</p>
      <p style={{ margin: "2px 0 0", color: "#666", fontSize: "12px" }}>🏢 {user.company.name}</p>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (isLoading) return <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading users...</div>;
  if (error) return <div style={{ color: "#e74c3c", padding: "20px" }}>❌ Error: {error}</div>;

  return (
    <div>
      <h1>Users from API 🌐</h1>
      <p style={{ color: "#aaa", fontSize: "14px" }}>Fetched from jsonplaceholder.typicode.com</p>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'controlled-input': {
    numberTitle: '22. Controlled Input',
    mainHeading: 'Controlled Input',
    introduction: 'In React, there are two ways to handle form inputs. The "controlled" approach keeps the value in React state — making React the single source of truth. This gives you full power over the input at all times! 🎮',
    conceptExplanation: 'A controlled input has its `value` prop bound to a state variable and an `onChange` handler that updates that state. This means React is always in charge of what the input displays. You can validate, transform, or react to every keystroke because the value flows through state.',
    funFact: 'Uncontrolled inputs store their value in the DOM and are accessed via `ref`. They\'re simpler but give up React\'s power. Controlled inputs are the recommended approach for most forms in React!',
    relatedConcepts: [
      { title: 'Controlled Component', desc: 'An input whose value is driven by React state — React is the single source of truth.' },
      { title: 'value + onChange', desc: 'The two props that make an input controlled: value binds it to state, onChange updates state.' },
      { title: 'Single Source of Truth', desc: 'One place (React state) stores the value — the input and any display elements always agree.' }
    ],
    taskTheme: 'Build a controlled input with live character count and validation! ✍️',
    steps: [
      'Create: <code>const [value, setValue] = useState("");</code>',
      'Bind to input: <code>&lt;input value={value} onChange={e =&gt; setValue(e.target.value)} /&gt;</code>',
      'Show a live character count: <code>&lt;p&gt;{value.length} / 50&lt;/p&gt;</code>',
      'Add validation: warn if the value is too short.',
      'Run and type — notice React controls every character!'
    ],
    closingLine: 'Controlled input mastered — React is always in the driver\'s seat! 🚗✨',
    hint: 'The key combo is value={stateVar} and onChange={e => setStateVar(e.target.value)} on the same input. This makes it fully controlled.',
    defaultFiles: {
      html: REACT_HTML('Controlled Input'),
      js: `const { useState } = React;

const MAX_LENGTH = 50;

function App() {
  const [username, setUsername] = useState("");

  const isValid = username.length >= 3;
  const isTooLong = username.length > MAX_LENGTH;
  const remaining = MAX_LENGTH - username.length;

  return (
    <div style={{ maxWidth: "400px" }}>
      <h1>Controlled Input 🎮</h1>
      <label style={{ display: "block", marginBottom: "8px", color: "#aaa" }}>Choose a username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter username..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: \`2px solid \${isTooLong ? "#e74c3c" : isValid ? "#2ecc71" : "#555"}\`,
          background: "#1a1f2e",
          color: "white",
          fontSize: "16px",
          boxSizing: "border-box"
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "13px" }}>
        <span style={{ color: isTooLong ? "#e74c3c" : isValid ? "#2ecc71" : "#aaa" }}>
          {isTooLong ? "Too long!" : isValid ? "✅ Looks good!" : "Min 3 characters"}
        </span>
        <span style={{ color: remaining < 10 ? "#e74c3c" : "#666" }}>{remaining} left</span>
      </div>
      {username && (
        <p style={{ marginTop: "16px", color: "#aaa" }}>
          Preview: <strong style={{ color: "white" }}>@{username.toLowerCase().replace(/\s/g, "_")}</strong>
        </p>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'handle-submit': {
    numberTitle: '23. Handle Submit',
    mainHeading: 'Handle Submit',
    introduction: 'Capturing input is only half the story — you also need to handle what happens when the user hits submit. Whether it\'s login, search, or checkout, form submission is where React forms come to life! 🚀',
    conceptExplanation: 'Form submission in React is handled by the `onSubmit` event on the `&lt;form&gt;` element. The first thing to do inside the handler is `e.preventDefault()` — this stops the browser\'s default full-page reload behaviour. Then you can process the form data however you like.',
    funFact: 'In traditional HTML, submitting a form makes the browser navigate to a new page or reload. `e.preventDefault()` is what lets React handle everything client-side without any page reloads!',
    relatedConcepts: [
      { title: 'onSubmit', desc: 'The event prop on a &lt;form&gt; element that fires when the form is submitted.' },
      { title: 'e.preventDefault()', desc: 'Stops the browser\'s default form submission behaviour (page reload or navigation).' },
      { title: 'Form Processing', desc: 'Reading state values after submit to validate, send to an API, or update the UI.' }
    ],
    taskTheme: 'Build a login form that handles submission and shows feedback! 🔐',
    steps: [
      'Create state for email and password.',
      'Add a &lt;form&gt; with <code>onSubmit={handleSubmit}</code>.',
      'Inside handleSubmit: <code>e.preventDefault();</code> then read the state values.',
      'Show a success or validation message based on the input.',
      'Run and try submitting with different inputs!'
    ],
    closingLine: 'Form submission handled — React is in full control of the process! 🏁✨',
    hint: 'Always call e.preventDefault() as the very first line of your onSubmit handler to prevent the browser from reloading the page.',
    defaultFiles: {
      html: REACT_HTML('Handle Submit'),
      js: `const { useState } = React;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage({ type: "error", text: "❌ Please enter a valid email." });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "❌ Password must be at least 6 characters." });
      return;
    }
    setMessage({ type: "success", text: \`✅ Logged in as \${email}!\` });
  }

  const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f2e", color: "white", fontSize: "14px", boxSizing: "border-box", marginBottom: "12px" };

  return (
    <div style={{ maxWidth: "360px" }}>
      <h1>Login Form 🔐</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ color: "#aaa", fontSize: "13px" }}>Email</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
        <label style={{ color: "#aaa", fontSize: "13px" }}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        <button type="submit" style={{ width: "100%", padding: "12px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white", fontWeight: "bold", fontSize: "15px" }}>
          Log In
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "16px", color: message.type === "error" ? "#e74c3c" : "#2ecc71" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'simple-form-app': {
    numberTitle: '24. Simple Form App',
    mainHeading: 'Simple Form App',
    introduction: 'Let\'s bring it all together — controlled inputs, form submission, validation, and dynamic rendering — into a complete mini form app. This is the real-world pattern you\'ll use in every React project! 🏗️',
    conceptExplanation: 'A complete React form combines: state for each field, `onChange` handlers for controlled inputs, an `onSubmit` handler with `e.preventDefault()`, client-side validation, and a confirmation or results display. Together, these form the foundation of any data-entry feature in a React app.',
    funFact: 'Libraries like React Hook Form and Formik exist specifically to simplify complex form logic in React — but understanding how to build forms from scratch (as you\'re doing now!) is essential before reaching for a library!',
    relatedConcepts: [
      { title: 'Form State', desc: 'Keeping each input\'s value in a separate state variable for full control.' },
      { title: 'Validation', desc: 'Checking input values before submission and displaying user-friendly error messages.' },
      { title: 'Post-Submit State', desc: 'Switching the UI to a success or confirmation view after a successful form submission.' }
    ],
    taskTheme: 'Build a complete registration form with validation and a success screen! 📋',
    steps: [
      'Create state for name, email, and password fields.',
      'Build the form with controlled inputs and labels.',
      'Add validation inside the submit handler.',
      'On success, switch the view to a confirmation message.',
      'Run and test with valid and invalid data!'
    ],
    closingLine: 'Full form app complete — you\'ve mastered the React form pattern! 🏆✨',
    hint: 'Use a submitted boolean state to toggle between the form view and the success view: {submitted ? <SuccessScreen /> : <Form />}',
    defaultFiles: {
      html: REACT_HTML('Simple Form App'),
      js: `const { useState } = React;

function SuccessScreen({ name }) {
  return (
    <div style={{ textAlign: "center", padding: "40px", background: "#1a1f2e", borderRadius: "12px" }}>
      <div style={{ fontSize: "48px" }}>🎉</div>
      <h2>Welcome, {name}!</h2>
      <p style={{ color: "#aaa" }}>Your account has been created successfully.</p>
    </div>
  );
}

function App() {
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.includes("@")) errs.email = "Enter a valid email.";
    if (fields.password.length < 6) errs.password = "Password must be 6+ characters.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen name={fields.name} />;

  const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f2e", color: "white", fontSize: "14px", boxSizing: "border-box" };

  return (
    <div style={{ maxWidth: "380px" }}>
      <h1>Register 📋</h1>
      <form onSubmit={handleSubmit}>
        {[["name","Name","text"],["email","Email","text"],["password","Password","password"]].map(([id, label, type]) => (
          <div key={id} style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", color: "#aaa", fontSize: "13px", marginBottom: "6px" }}>{label}</label>
            <input type={type} name={id} value={fields[id]} onChange={handleChange} style={{ ...inputStyle, borderColor: errors[id] ? "#e74c3c" : "#555" }} />
            {errors[id] && <p style={{ margin: "4px 0 0", color: "#e74c3c", fontSize: "12px" }}>{errors[id]}</p>}
          </div>
        ))}
        <button type="submit" style={{ width: "100%", padding: "12px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#2ecc71", color: "white", fontWeight: "bold", fontSize: "15px" }}>
          Create Account
        </button>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'setup-react-router': {
    numberTitle: '25. Setup React Router',
    mainHeading: 'Setup React Router',
    introduction: 'Most apps have more than one page — a home, an about, a dashboard. React Router lets you build multi-page experiences entirely in the browser without any server page loads. Let\'s set it up! 🗺️',
    conceptExplanation: 'React Router is the standard routing library for React. In a CDN setup, you use `ReactRouter.HashRouter` (or `BrowserRouter`), `Routes`, and `Route` components. The router watches the URL and renders the matching component — all without reloading the page. `HashRouter` uses `#` in the URL and works without server config, making it perfect for our sandboxed environment.',
    funFact: 'React Router\'s HashRouter uses the URL hash (`#/about`) to simulate navigation. This means the server always serves the same HTML file, and React handles all the routing client-side — perfect for static hosting!',
    relatedConcepts: [
      { title: 'HashRouter', desc: 'A router that uses the URL hash (#) for navigation — works in any hosting environment without server config.' },
      { title: 'Routes + Route', desc: 'Routes is a container that finds the best matching Route and renders its element.' },
      { title: 'Client-Side Routing', desc: 'Navigation handled entirely by JavaScript in the browser — no server request for each page change.' }
    ],
    taskTheme: 'Set up React Router and define your first two routes! 🗺️',
    steps: [
      'The HTML tab already loads React Router via CDN.',
      'Destructure the pieces: <code>const { HashRouter, Routes, Route } = ReactRouter;</code>',
      'Define two page components: <code>function Home() {...}</code> and <code>function About() {...}</code>',
      'Wrap App in &lt;HashRouter&gt; and add &lt;Routes&gt; with two &lt;Route&gt; elements.',
      'Run and manually change the URL hash to navigate!'
    ],
    closingLine: 'React Router configured — your app now has multiple pages! 🗺️✨',
    hint: 'The path prop on Route matches the URL. path="/" matches the home route. path="/about" matches /about. The element prop is the component to render.',
    defaultFiles: {
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Setup React Router</title>\n    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>\n    <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>\n    <script src="https://unpkg.com/@remix-run/router@1/dist/router.umd.min.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router@6/dist/umd/react-router.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.development.js" crossorigin></script>\n  </head>\n  <body style="padding: 20px; font-family: sans-serif; background: #0b0f19; color: white;">\n    <div id="root"></div>\n    <script type="text/babel" src="script.js"></script>\n  </body>\n</html>\n`,
      js: `const { HashRouter, Routes, Route } = ReactRouterDOM;

function Home() {
  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>Welcome to the home route! Path: /</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>ℹ️ About Page</h1>
      <p>This is the about route! Path: /about</p>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'create-routes': {
    numberTitle: '26. Create Routes',
    mainHeading: 'Create Routes',
    introduction: 'With a router in place, it\'s time to define a proper route structure — multiple pages, a layout shell, and a 404 catch-all. This is how real React applications are organised! 📐',
    conceptExplanation: 'In React Router v6, `Routes` is the container that holds all your `Route` elements. Each `Route` has a `path` and an `element` prop. A `path="*"` catch-all route renders when no other route matches — perfect for a 404 page. You can also nest routes for shared layouts.',
    funFact: 'React Router v6 introduced a major change from v5: `Switch` was replaced by `Routes`, and routes now automatically pick the best match rather than the first match. This eliminated a common source of bugs!',
    relatedConcepts: [
      { title: 'Route path="*"', desc: 'A wildcard route that matches any URL not matched by other routes — used for 404 pages.' },
      { title: 'Nested Routes', desc: 'Routes defined inside other routes to share a layout or URL segment hierarchy.' },
      { title: 'Route Element', desc: 'The element prop on Route accepts a JSX element to render when the route matches.' }
    ],
    taskTheme: 'Create a full route map with Home, About, Dashboard, and a 404 page! 📐',
    steps: [
      'Define four page components: Home, About, Dashboard, NotFound.',
      'Set up Routes with four Route elements.',
      'Add a catch-all: <code>&lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;</code>',
      'Add navigation links (use &lt;a href="#/about"&gt; in HashRouter).',
      'Run and navigate between all four routes!'
    ],
    closingLine: 'Full route map created — your app has a proper navigation structure! 🗺️✨',
    hint: 'In HashRouter, use href="#/about" for regular &lt;a&gt; tags. Or use the &lt;Link&gt; component from ReactRouterDOM for proper client-side navigation.',
    defaultFiles: {
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Create Routes</title>\n    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>\n    <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>\n    <script src="https://unpkg.com/@remix-run/router@1/dist/router.umd.min.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router@6/dist/umd/react-router.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.development.js" crossorigin></script>\n  </head>\n  <body style="padding: 20px; font-family: sans-serif; background: #0b0f19; color: white;">\n    <div id="root"></div>\n    <script type="text/babel" src="script.js"></script>\n  </body>\n</html>\n`,
      js: `const { HashRouter, Routes, Route, Link, useLocation } = ReactRouterDOM;

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", marginBottom: "24px", padding: "12px 0", borderBottom: "1px solid #333" }}>
      <Link to="/" style={{ color: "#61dafb", textDecoration: "none" }}>🏠 Home</Link>
      <Link to="/about" style={{ color: "#61dafb", textDecoration: "none" }}>ℹ️ About</Link>
      <Link to="/dashboard" style={{ color: "#61dafb", textDecoration: "none" }}>📊 Dashboard</Link>
      <Link to="/missing" style={{ color: "#e74c3c", textDecoration: "none" }}>❓ Bad Link</Link>
    </nav>
  );
}

function Home() { return <div><h1>🏠 Home</h1><p>The main landing page.</p></div>; }
function About() { return <div><h1>ℹ️ About</h1><p>Learn about our team.</p></div>; }
function Dashboard() { return <div><h1>📊 Dashboard</h1><p>Your personal dashboard.</p></div>; }

function NotFound() {
  const { pathname } = useLocation();
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <p style={{ color: "#aaa" }}>No route matches: <code>{pathname}</code></p>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  },

  'link-between-pages': {
    numberTitle: '27. Link Between Pages',
    mainHeading: 'Link Between Pages',
    introduction: 'Navigation is what makes a multi-page app feel real. React Router\'s `&lt;Link&gt;` component gives you seamless, instant page transitions with no reloads — and it\'s as simple as an `&lt;a&gt;` tag! 🔗',
    conceptExplanation: 'The `&lt;Link&gt;` component from React Router renders an `&lt;a&gt;` tag under the hood, but intercepts the click to update the URL via JavaScript instead of triggering a browser navigation. `&lt;NavLink&gt;` is a special version that automatically adds an `active` class or style when its route is the current one — perfect for styled navigation bars.',
    funFact: '`&lt;NavLink&gt;` accepts a `style` or `className` prop as a function: `style={({ isActive }) => ({ color: isActive ? "red" : "white" })}`. This gives you effortless active-link highlighting without any manual state tracking!',
    relatedConcepts: [
      { title: '&lt;Link to="/"&gt;', desc: 'React Router\'s navigation component. Renders an &lt;a&gt; tag but navigates client-side without a page reload.' },
      { title: '&lt;NavLink&gt;', desc: 'A special Link that knows whether its route is active and can apply active styles automatically.' },
      { title: 'useNavigate()', desc: 'A React Router hook for programmatic navigation: navigate("/dashboard") in a function.' }
    ],
    taskTheme: 'Build a full navigation bar using Link and NavLink with active highlighting! 🔗',
    steps: [
      'Import Link and NavLink from ReactRouterDOM.',
      'Replace plain &lt;a&gt; tags with &lt;NavLink to="/path"&gt;.',
      'Add an active style: <code>style={({ isActive }) =&gt; ({ color: isActive ? "#61dafb" : "white" })}</code>',
      'Add a programmatic nav button using useNavigate.',
      'Run and click around — notice the active link highlight!'
    ],
    closingLine: 'Navigation complete — your React app feels like a real multi-page experience! 🚀✨',
    hint: 'Use NavLink instead of Link for navigation menus. Pass a function to its style prop: style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })} to highlight the current route.',
    defaultFiles: {
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Link Between Pages</title>\n    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>\n    <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>\n    <script src="https://unpkg.com/@remix-run/router@1/dist/router.umd.min.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router@6/dist/umd/react-router.development.js" crossorigin></script>\n    <script src="https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.development.js" crossorigin></script>\n  </head>\n  <body style="padding: 20px; font-family: sans-serif; background: #0b0f19; color: white;">\n    <div id="root"></div>\n    <script type="text/babel" src="script.js"></script>\n  </body>\n</html>\n`,
      js: `const { HashRouter, Routes, Route, NavLink, useNavigate } = ReactRouterDOM;

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? "#61dafb" : "#aaa",
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal",
  padding: "8px 14px",
  borderRadius: "6px",
  background: isActive ? "#1a2a3a" : "transparent",
  transition: "all 0.2s"
});

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "8px", marginBottom: "24px", padding: "12px", background: "#0f1520", borderRadius: "10px" }}>
      <NavLink to="/" end style={navLinkStyle}>🏠 Home</NavLink>
      <NavLink to="/about" style={navLinkStyle}>ℹ️ About</NavLink>
      <NavLink to="/contact" style={navLinkStyle}>📬 Contact</NavLink>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p style={{ color: "#aaa" }}>This is the home route.</p>
      <button onClick={() => navigate("/about")} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#3498db", color: "white", marginTop: "12px" }}>
        Go to About →
      </button>
    </div>
  );
}

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ℹ️ About Page</h1>
      <p style={{ color: "#aaa" }}>Learn more about us here.</p>
      <button onClick={() => navigate(-1)} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#555", color: "white", marginTop: "12px" }}>
        ← Go Back
      </button>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>📬 Contact Page</h1>
      <p style={{ color: "#aaa" }}>Reach out to us anytime.</p>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },
    language: 'js'
  }

};

export default reactExercises;
