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

const cssExercises: Record<string, Exercise> = {
  'add-css-inline': {
    numberTitle: '01. Add CSS Inline',
    mainHeading: 'Add CSS Inline',
    introduction: 'Before stylesheets existed, developers had to style every single element by hand — right inside the HTML tag. It\'s a bit old-fashioned, but understanding it reveals how CSS works at its most fundamental level. 🔬',
    conceptExplanation: 'Inline CSS is written directly on an HTML element using the <code>style</code> attribute. Any CSS property-value pair can go inside the quotes, separated by semicolons. Inline styles have the highest specificity of all — they override everything else. However, they mix structure with presentation, making code harder to maintain, so they\'re rarely the right tool for large projects.',
    funFact: 'Inline styles have a specificity score of 1-0-0-0 in CSS specificity notation — higher than any class or element selector. The only thing that beats them is the dreaded <code>!important</code> keyword!',
    relatedConcepts: [
      { title: 'style attribute', desc: 'An HTML attribute that accepts raw CSS declarations directly on the element.' },
      { title: 'Specificity', desc: 'The algorithm browsers use to decide which CSS rule wins when multiple rules target the same element.' },
      { title: 'Separation of concerns', desc: 'The principle that HTML (structure), CSS (style), and JS (behaviour) should be kept apart.' },
    ],
    taskTheme: 'Use inline styles to give each element its own personal makeover — right in the HTML! 💅',
    steps: [
      'Find the <code>&lt;h1&gt;</code> tag in the HTML tab.',
      'Add a <code>style</code> attribute to it: <code>&lt;h1 style="color: coral;"&gt;</code>.',
      'Find the <code>&lt;p&gt;</code> tag and add <code>style="font-size: 18px;"</code>.',
      'Add a <code>style="background-color: lightyellow;"</code> to the <code>&lt;div&gt;</code> wrapping both.',
    ],
    closingLine: 'You\'ve styled at the source! Now you know exactly where inline styles live. 🎯',
    hint: 'Add style="property: value;" directly inside the opening HTML tag. Separate multiple properties with semicolons.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Inline CSS</title>\n  </head>\n  <body>\n    <div>\n      <h1>Hello, Inline Styles!</h1>\n      <p>Style me directly in the HTML tag above.</p>\n    </div>\n  </body>\n</html>\n',
      css: '/* Inline styles live on the HTML elements themselves — try the HTML tab! */\n',
    },
    language: 'css',
  },

  'add-css-internal': {
    numberTitle: '02. Add CSS Internal',
    mainHeading: 'Add CSS Internal',
    introduction: 'What if you could write all your styles in one place — inside the same HTML file, but separate from the content? Internal CSS is exactly that. One file, two powers. ⚡',
    conceptExplanation: 'Internal CSS is written inside a <code>&lt;style&gt;</code> tag placed in the <code>&lt;head&gt;</code> of your HTML document. It applies to the entire page and is great for small, single-page projects. You write full CSS rules (selectors, properties, values) just as you would in a separate stylesheet.',
    funFact: 'Internal CSS is sometimes called "embedded CSS." It was the first way developers could write reusable styles — before external stylesheets became standard in the late 1990s. Many email newsletter developers still use internal CSS today because email clients often block external stylesheets!',
    relatedConcepts: [
      { title: '<style> tag', desc: 'A tag placed inside <head> that contains raw CSS rules for the current page.' },
      { title: 'Cascade', desc: 'CSS rules are read top to bottom. A later rule on the same selector overrides an earlier one.' },
      { title: 'Scope', desc: 'Internal styles apply to the whole page, unlike inline styles which apply to a single element.' },
    ],
    taskTheme: 'Write a full set of styles inside a <code>&lt;style&gt;</code> block in the HTML head! 🏗️',
    steps: [
      'In the HTML tab, locate the <code>&lt;head&gt;</code> section.',
      'Add a <code>&lt;style&gt;</code> tag inside the <code>&lt;head&gt;</code>.',
      'Inside the <code>&lt;style&gt;</code> tag, write a rule to set the <code>body</code> background to <code>#f0f4f8</code>.',
      'Add a rule to make <code>h1</code> text <code>color: steelblue</code>.',
      'Add a rule to give <code>p</code> a <code>font-size</code> of <code>16px</code>.',
    ],
    closingLine: 'One file, full control! Internal CSS is a tidy step up from inline. 📋',
    hint: 'Add <style> inside <head> and write regular CSS rules inside it. Example:\n<style>\n  h1 { color: steelblue; }\n</style>',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Internal CSS</title>\n    <!-- Add your <style> tag here -->\n  </head>\n  <body>\n    <h1>Internal Styles Rock</h1>\n    <p>All my styles live up in the head section.</p>\n  </body>\n</html>\n',
      css: '/* This exercise uses internal CSS — write your styles inside a <style> tag in the HTML tab! */\n',
    },
    language: 'css',
  },

  'add-css-external': {
    numberTitle: '03. Add CSS External',
    mainHeading: 'Add CSS External',
    introduction: 'Professional websites separate their style from their structure entirely — in a dedicated <code>.css</code> file. This is the gold standard of web development, and it\'s how most real projects are built. 🏆',
    conceptExplanation: 'External CSS lives in a separate <code>.css</code> file that is linked to your HTML page using a <code>&lt;link&gt;</code> tag in the <code>&lt;head&gt;</code>. One stylesheet can power hundreds of HTML pages — change the CSS once, and every page updates instantly. This is the most maintainable, scalable, and professional approach.',
    funFact: 'Håkon Wium Lie proposed CSS to the W3C in 1994 and external stylesheets became part of the CSS1 specification in 1996. Before this, every visual change required editing HTML on every single page — across thousands of files!',
    relatedConcepts: [
      { title: '<link> tag', desc: 'A self-closing tag in <head> that connects an external CSS file to the HTML page.' },
      { title: 'href attribute', desc: 'The path to the external CSS file. Can be relative (style.css) or absolute (https://...).' },
      { title: 'rel="stylesheet"', desc: 'Tells the browser that the linked file is a CSS stylesheet, not just any file.' },
    ],
    taskTheme: 'Link the CSS tab to the HTML page and style it from a separate stylesheet — like a pro! 🔗',
    steps: [
      'In the HTML tab, find the <code>&lt;head&gt;</code> section.',
      'Add: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>.',
      'Switch to the CSS tab and write a rule to set <code>body</code> background to <code>lavender</code>.',
      'Add a rule to make <code>h1</code> color <code>indigo</code>.',
      'See both pages come alive — the link is working!',
    ],
    closingLine: 'Linked and loaded! You\'re now working like a professional web developer. 🌐',
    hint: 'Add <link rel="stylesheet" href="style.css"> inside <head>, then write CSS rules in the CSS tab.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>External CSS</title>\n    <!-- Link your external stylesheet here -->\n  </head>\n  <body>\n    <h1>External Styles Are the Best</h1>\n    <p>My styles live in a completely separate file.</p>\n  </body>\n</html>\n',
      css: '/* Write your external CSS rules here */\n',
    },
    language: 'css',
  },

  'element-selector': {
    numberTitle: '04. Element Selector',
    mainHeading: 'Element Selector',
    introduction: 'You\'ve written CSS properties — now let\'s talk about *targeting*. Before CSS can style anything, it needs to know *what* to style. The element selector is the most direct answer. 🎯',
    conceptExplanation: 'An element selector (also called a type selector) targets every instance of a specific HTML tag on the page. Write the tag name without angle brackets, followed by curly braces containing your declarations. For example, <code>p { color: gray; }</code> turns every paragraph on the page gray.',
    funFact: 'Element selectors are the oldest and most basic type of CSS selector — they\'ve existed since CSS1 in 1996. Despite being simple, they\'re extremely powerful because of the "cascade": styles on parent elements like <body> automatically inherit down to all children.',
    relatedConcepts: [
      { title: 'Type selector', desc: 'Targets all elements of a given HTML tag name. No prefix, just the tag name.' },
      { title: 'Inheritance', desc: 'Some CSS properties (like color and font-family) are inherited by child elements automatically.' },
      { title: 'Universal selector', desc: 'The * selector targets every element on the page — a powerful but broad tool.' },
    ],
    taskTheme: 'Use element selectors to apply a consistent style theme across the whole page! 🎨',
    steps: [
      'In the CSS tab, write a rule targeting <code>body</code> and set <code>background-color</code> to <code>#fafafa</code>.',
      'Write a rule targeting <code>h1</code> and set <code>color</code> to <code>darkslateblue</code>.',
      'Write a rule targeting <code>p</code> and set <code>color</code> to <code>#555</code> and <code>line-height</code> to <code>1.6</code>.',
      'Write a rule targeting <code>a</code> and set <code>color</code> to <code>tomato</code>.',
    ],
    closingLine: 'You\'re speaking the browser\'s language — selectors unlocked! 🔓',
    hint: 'Target any HTML tag by name. Example:\nh1 {\n  color: darkslateblue;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Element Selector</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>Element Selectors</h1>\n    <p>Style every paragraph at once with one CSS rule.</p>\n    <p>This paragraph gets the same style automatically.</p>\n    <a href="#">And links too!</a>\n  </body>\n</html>\n',
      css: '/* Target HTML elements by tag name */\n',
    },
    language: 'css',
  },

  'class-selector': {
    numberTitle: '05. Class Selector',
    mainHeading: 'Class Selector',
    introduction: 'Element selectors style *everything* of a type — but what if you only want to style *some* paragraphs? Classes let you label specific elements and target them with surgical precision. 🏷️',
    conceptExplanation: 'A CSS class selector starts with a dot (.) followed by the class name. In HTML, you assign a class to an element using the <code>class</code> attribute. An element can have multiple classes separated by spaces, and the same class can be applied to any number of elements — across different tag types. This makes classes the most reusable styling tool in CSS.',
    funFact: 'CSS class names are case-sensitive! A class named "Card" and one named "card" are completely different. Most developers use lowercase-with-hyphens (kebab-case) as a convention, like "hero-button" or "card-title".',
    relatedConcepts: [
      { title: '. (dot) selector', desc: 'The prefix for a class selector in CSS. .highlight targets all elements with class="highlight".' },
      { title: 'class attribute', desc: 'An HTML attribute used to assign one or more class names to an element.' },
      { title: 'Reusability', desc: 'The same class can be applied to any element anywhere on the page, applying the same styles.' },
    ],
    taskTheme: 'Create CSS classes and apply them to specific elements on the page! 🎨',
    steps: [
      'In the CSS tab, create a class <code>.highlight</code> with <code>background-color: yellow</code> and <code>padding: 4px</code>.',
      'Create a class <code>.card</code> with <code>border: 1px solid #ddd</code>, <code>padding: 16px</code>, and <code>border-radius: 8px</code>.',
      'In the HTML tab, add <code>class="highlight"</code> to one of the <code>&lt;span&gt;</code> elements.',
      'Add <code>class="card"</code> to the <code>&lt;div&gt;</code> to see the card style appear.',
    ],
    closingLine: 'Labels applied, styles targeted — classes are your new superpower! ⚡',
    hint: 'Start class names with a dot in CSS: .myClass { color: red; } Then add class="myClass" to HTML elements.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Class Selector</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div>\n      <h2>My Card</h2>\n      <p>This is a paragraph with a <span>highlighted word</span> inside it.</p>\n    </div>\n    <div>\n      <h2>Another Card</h2>\n      <p>A second section that can also be styled with classes.</p>\n    </div>\n  </body>\n</html>\n',
      css: '/* Define your classes below (remember the dot!) */\n',
    },
    language: 'css',
  },

  'id-selector': {
    numberTitle: '06. ID Selector',
    mainHeading: 'ID Selector',
    introduction: 'Every citizen has a unique ID. Every important element on a page can have one too. ID selectors are the most targeted tool in CSS — pointing at one element and one element only. 🎯',
    conceptExplanation: 'An ID selector in CSS starts with a hash (#) symbol. In HTML, you assign it using the <code>id</code> attribute. Unlike classes, an ID must be unique on the page — only one element should have any given ID. IDs also have higher specificity than classes, so they override class styles when there\'s a conflict.',
    funFact: 'The id attribute has a bonus superpower beyond CSS: it creates a "fragment identifier" that allows deep linking. A URL ending in #section2 will make the browser automatically scroll to the element with id="section2" when the page loads. No JavaScript needed!',
    relatedConcepts: [
      { title: '# (hash) selector', desc: 'The prefix for an ID selector in CSS. #logo targets the element with id="logo".' },
      { title: 'Uniqueness', desc: 'An ID must only be used once per page. Reusing IDs is invalid HTML and causes bugs.' },
      { title: 'Specificity score', desc: 'IDs score 0-1-0-0 in specificity — higher than classes (0-0-1-0), lower than inline styles.' },
    ],
    taskTheme: 'Use an ID selector to apply a one-of-a-kind style to a unique page element! ✨',
    steps: [
      'In the CSS tab, write a rule <code>#hero</code> and set <code>background-color: #1a202c</code>, <code>color: white</code>, and <code>padding: 32px</code>.',
      'Write a rule <code>#footer</code> and set <code>background-color: #edf2f7</code> and <code>text-align: center</code>.',
      'In the HTML tab, confirm the <code>&lt;div&gt;</code> elements already have <code>id="hero"</code> and <code>id="footer"</code>.',
      'Notice how only those specific elements are affected, even though other divs exist on the page.',
    ],
    closingLine: 'One element, one style, total uniqueness — ID selectors nailed! 🏆',
    hint: 'Use # to target an ID in CSS: #hero { background-color: navy; } Then add id="hero" to the HTML element.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>ID Selector</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div id="hero">\n      <h1>Welcome to My Page</h1>\n      <p>This is the hero section — styled with an ID.</p>\n    </div>\n    <div>\n      <p>This is a regular div — it won\'t get the hero styles.</p>\n    </div>\n    <div id="footer">\n      <p>&copy; 2025 My Website</p>\n    </div>\n  </body>\n</html>\n',
      css: '/* Target unique elements by their ID (use #) */\n',
    },
    language: 'css',
  },

  'text-color': {
    numberTitle: '07. Text Color',
    mainHeading: 'Text Color',
    introduction: 'Black text on a white background is functional, but color brings emotion and theme. Let\'s paint your webpage! 🎨',
    conceptExplanation: 'We use the <code>color</code> property in CSS to set the color of text. You can specify colors using name keywords (like <code>red</code>), Hexadecimal values (like <code>#ff0000</code>), or RGB/HSL coordinates. Setting color on a parent element (like <code>body</code>) cascades down to all text inside it.',
    funFact: 'Computers display colors by mixing Red, Green, and Blue light. With standard 24-bit color, you can display over 16.7 million distinct colors on a screen!',
    relatedConcepts: [
      { title: 'color property', desc: 'Sets the color of text inside target elements.' },
      { title: 'Hex codes', desc: 'Six-character codes representing RGB values, e.g. #00FF00 is bright green.' },
      { title: 'Named colors', desc: 'CSS has 140+ named color keywords like tomato, coral, steelblue, and goldenrod.' },
    ],
    taskTheme: 'Breathe color into your heading and paragraph elements! 🌈',
    steps: [
      'In the CSS tab, target the <code>h1</code> element and set its <code>color</code> to <code>tomato</code>.',
      'Target the <code>p</code> element and set its <code>color</code> to <code>#4A5568</code> (a slate grey).',
      'Try targeting <code>body</code> with a <code>color</code> — notice how it cascades to all child text.',
      'Try an RGB value: <code>color: rgb(72, 52, 212)</code> on the <code>h2</code>.',
    ],
    closingLine: 'Your page is glowing with custom color! 🎨✨',
    hint: 'Add style rules for h1 and p. Example:\nh1 {\n  color: tomato;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Text Color</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>Colorful Adventure</h1>\n    <h2>Chapter One</h2>\n    <p>This is where your coding journey takes shape.</p>\n    <p>Every word deserves the perfect hue.</p>\n  </body>\n</html>\n',
      css: '/* Write your CSS below */\n',
    },
    language: 'css',
  },

  'background-color': {
    numberTitle: '08. Background Color',
    mainHeading: 'Background Color',
    introduction: 'A great backdrop sets the mood for everything in front of it. Whether it\'s a dramatic dark theme or a breezy pastel, the background color is the first impression your page makes. 🖼️',
    conceptExplanation: 'The <code>background-color</code> property sets the fill color behind an element\'s content and padding. It accepts the same color formats as the <code>color</code> property — keywords, hex codes, RGB, HSL. You can apply it to any element, from the full <code>body</code> to a tiny <code>span</code>.',
    funFact: 'The default background of a webpage isn\'t actually white — it\'s transparent! Browsers display white because their own default background is white. Set body { background-color: transparent; } and the browser chrome shows through.',
    relatedConcepts: [
      { title: 'background-color', desc: 'Fills the area behind an element\'s content and padding with a solid color.' },
      { title: 'rgba()', desc: 'Adds an alpha (opacity) channel to RGB: rgba(0,0,0,0.5) is 50% transparent black.' },
      { title: 'background shorthand', desc: 'The background property can set color, image, and position all at once.' },
    ],
    taskTheme: 'Create a visually striking page by combining background colors on different elements! 🌅',
    steps: [
      'Target <code>body</code> and set <code>background-color</code> to <code>#1a1a2e</code> (a deep navy).',
      'Target <code>h1</code> and set <code>color</code> to <code>white</code> so it\'s visible.',
      'Create a class <code>.card</code> in CSS and set its <code>background-color</code> to <code>#16213e</code> with <code>padding: 20px</code>.',
      'Add <code>class="card"</code> to the <code>&lt;div&gt;</code> in the HTML to apply the card style.',
    ],
    closingLine: 'The backdrop is set — your page has atmosphere! 🌙',
    hint: 'Use background-color on any element. Example:\nbody {\n  background-color: #1a1a2e;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Background Color</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div>\n      <h1>Dark Mode Vibes</h1>\n      <p>Background colors set the entire mood of a page.</p>\n    </div>\n  </body>\n</html>\n',
      css: '/* Experiment with background-color */\n',
    },
    language: 'css',
  },

  'background-image': {
    numberTitle: '09. Background Image',
    mainHeading: 'Background Image',
    introduction: 'A solid color is great. But sometimes you want texture, depth, or a dramatic photo filling your page. CSS background images make it possible — without a single <code>&lt;img&gt;</code> tag. 🏔️',
    conceptExplanation: 'The <code>background-image</code> property applies an image to the background of an element using <code>url()</code>. You can control how it repeats with <code>background-repeat</code>, how it scales with <code>background-size</code> (try <code>cover</code>!), and how it\'s positioned with <code>background-position</code>. The value <code>background-size: cover</code> ensures the image always fills the element perfectly.',
    funFact: 'CSS gradients are technically background images! linear-gradient(to right, red, blue) uses the background-image property, not background-color. This means you can layer gradients on top of photos using multiple comma-separated values.',
    relatedConcepts: [
      { title: 'background-image', desc: 'Sets one or more images as the background of an element using url().' },
      { title: 'background-size: cover', desc: 'Scales the image to cover the entire element, cropping edges if needed.' },
      { title: 'background-position', desc: 'Controls where the image is anchored. Common values: center, top, left.' },
      { title: 'background-repeat', desc: 'Controls tiling. Use no-repeat to stop the image from repeating.' },
    ],
    taskTheme: 'Fill a hero section with a full-bleed background image — cinematic style! 🎬',
    steps: [
      'Target the <code>.hero</code> class in CSS and set <code>background-image: url("https://picsum.photos/1200/600")</code>.',
      'Add <code>background-size: cover</code> to make it fill the container.',
      'Add <code>background-position: center</code> to center the image.',
      'Set <code>background-repeat: no-repeat</code> to prevent tiling.',
      'Set <code>height: 400px</code> on <code>.hero</code> so the image has space to show.',
    ],
    closingLine: 'Cinematic and stunning — your background image is live! 🎥',
    hint: 'Combine these four properties:\n.hero {\n  background-image: url("https://picsum.photos/1200/600");\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Background Image</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div class="hero">\n      <h1>Welcome</h1>\n    </div>\n    <p>Content below the hero section.</p>\n  </body>\n</html>\n',
      css: '/* Style your hero background here */\n.hero {\n  height: 400px;\n}\n',
    },
    language: 'css',
  },

  'font-size': {
    numberTitle: '10. Font Size',
    mainHeading: 'Font Size',
    introduction: 'Text size is one of the most powerful tools in visual design. A single large word can command a whole screen. A tiny caption can whisper context. Let\'s take control of the scale! 📏',
    conceptExplanation: 'The <code>font-size</code> property controls how large text is displayed. You can use fixed pixel values (<code>px</code>), relative units like <code>em</code> (relative to parent font size) or <code>rem</code> (relative to the root element), or viewport units like <code>vw</code>. Using <code>rem</code> is generally the best practice for accessible, scalable text.',
    funFact: 'The default browser font size is 16px. That makes 1rem = 16px. Designers often set html { font-size: 62.5%; } to make 1rem = 10px, which makes mental maths much easier (2.4rem = 24px).',
    relatedConcepts: [
      { title: 'px (pixels)', desc: 'An absolute unit. 24px is always 24 screen pixels regardless of context.' },
      { title: 'rem', desc: 'Relative to the root font size. Flexible and accessibility-friendly.' },
      { title: 'em', desc: 'Relative to the parent element\'s font size. Useful for proportional scaling within components.' },
    ],
    taskTheme: 'Create a clear typographic hierarchy by setting different font sizes for each level of text! 📰',
    steps: [
      'Target <code>h1</code> in CSS and set <code>font-size: 3rem</code>.',
      'Target <code>h2</code> and set <code>font-size: 2rem</code>.',
      'Target <code>p</code> and set <code>font-size: 1rem</code>.',
      'Target <code>.caption</code> and set <code>font-size: 0.75rem</code>.',
      'Notice how a clear visual hierarchy emerges just from size differences.',
    ],
    closingLine: 'From headline to whisper — your typographic scale is set! 🔤',
    hint: 'Set font-size using rem for scalable text:\nh1 {\n  font-size: 3rem;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Font Size</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>Main Headline</h1>\n    <h2>Section Title</h2>\n    <p>Body paragraph text that should be comfortable to read at length.</p>\n    <p class="caption">A small caption with supporting details.</p>\n  </body>\n</html>\n',
      css: '/* Set font-size for each text level */\n',
    },
    language: 'css',
  },

  'font-family': {
    numberTitle: '11. Font Family',
    mainHeading: 'Font Family',
    introduction: 'The typeface of a page is its personality. A serif font feels formal and classical. A sans-serif feels clean and modern. A monospace feels technical. Let\'s dress your words in the right outfit! 🎩',
    conceptExplanation: 'The <code>font-family</code> property sets the typeface. You list multiple fonts in order of preference (a "font stack") — the browser uses the first one it has installed, falling back to the next if unavailable. Always end with a generic family: <code>serif</code>, <code>sans-serif</code>, <code>monospace</code>, or <code>cursive</code>. Google Fonts lets you use hundreds of web fonts for free via a <code>&lt;link&gt;</code> tag.',
    funFact: 'Web-safe fonts are typefaces virtually every device in the world has installed: Arial, Georgia, Times New Roman, Courier New, and Verdana. These have been reliable fallbacks since the 1990s. Web fonts (like Google Fonts) load from a server, so they\'re not guaranteed to appear if the network is slow.',
    relatedConcepts: [
      { title: 'Font stack', desc: 'A comma-separated list of font names, tried in order until one is found on the user\'s device.' },
      { title: 'Generic families', desc: 'serif, sans-serif, monospace — safe fallback categories supported by all browsers.' },
      { title: 'Google Fonts', desc: 'A free CDN hosting 1000+ web fonts, loaded via a <link> tag in your <head>.' },
    ],
    taskTheme: 'Set a typeface for your page and create a distinctive visual personality! ✍️',
    steps: [
      'In the CSS tab, target <code>body</code> and set <code>font-family: "Georgia", serif</code>.',
      'Target <code>h1</code> and override with <code>font-family: "Arial", sans-serif</code>.',
      'Target <code>.code-text</code> and set <code>font-family: "Courier New", monospace</code>.',
      'For a bonus: add a Google Font link in the HTML <code>&lt;head&gt;</code> and use it in your CSS.',
    ],
    closingLine: 'Your page now has a voice — and it speaks in your chosen typeface! 🗣️',
    hint: 'Set font-family with a fallback:\nbody {\n  font-family: "Georgia", serif;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Font Family</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>Typography Matters</h1>\n    <p>The right typeface transforms your page from a document into a design.</p>\n    <p class="code-text">console.log("Hello, World!");</p>\n  </body>\n</html>\n',
      css: '/* Set font families for your elements */\n',
    },
    language: 'css',
  },

  'text-align': {
    numberTitle: '12. Text Align',
    mainHeading: 'Text Align',
    introduction: 'Alignment is the invisible grid behind every great design. Left, right, center, or justified — where your text sits on the line changes how readers experience it entirely. 📐',
    conceptExplanation: 'The <code>text-align</code> property controls the horizontal alignment of inline content (like text) inside a block element. The most common values are <code>left</code> (default), <code>center</code>, <code>right</code>, and <code>justify</code> (stretches text to fill the line, like a newspaper column). Note: <code>text-align</code> only affects inline content — it doesn\'t move the block element itself.',
    funFact: 'text-align: justify is used by most books, newspapers, and academic papers. Browsers achieve it by subtly stretching the spaces between words on each line. It looks clean in print but can create awkward "rivers" of white space on narrow screens.',
    relatedConcepts: [
      { title: 'text-align: left', desc: 'The default. Text aligns to the left edge of the container.' },
      { title: 'text-align: center', desc: 'Centers text horizontally within the container. Great for headings and CTAs.' },
      { title: 'text-align: justify', desc: 'Stretches text lines to fill the container width, like a printed book.' },
    ],
    taskTheme: 'Control the flow of your text by setting alignment for different sections! ↔️',
    steps: [
      'Target <code>h1</code> in CSS and set <code>text-align: center</code>.',
      'Target <code>.intro</code> and set <code>text-align: center</code>.',
      'Target <code>.body-text</code> and set <code>text-align: justify</code>.',
      'Target <code>.signature</code> and set <code>text-align: right</code>.',
    ],
    closingLine: 'Left, right, center — your text is perfectly positioned! 📌',
    hint: 'Apply text-align to any block element:\nh1 {\n  text-align: center;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Text Align</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>The Art of Alignment</h1>\n    <p class="intro">A centered intro draws the reader in from both sides.</p>\n    <p class="body-text">Justified body text gives the page a clean, professional newspaper feel. It works best on wider containers where the browser has room to distribute spacing naturally between words.</p>\n    <p class="signature">— The Author</p>\n  </body>\n</html>\n',
      css: '/* Set text alignment for different sections */\n',
    },
    language: 'css',
  },

  'margin-practice': {
    numberTitle: '13. Margin Practice',
    mainHeading: 'Margin Practice',
    introduction: 'Elements on a page are like people in a room — they need personal space. Margins are the invisible buffer zones around elements that keep everything from feeling cramped. 🌬️',
    conceptExplanation: 'The <code>margin</code> property adds space *outside* an element\'s border. You can set all four sides at once (<code>margin: 20px</code>), or individually with shorthand (<code>margin: top right bottom left</code>). Setting <code>margin: 0 auto</code> on a block element with a defined width centers it horizontally — one of the most classic CSS tricks.',
    funFact: 'CSS has a quirk called "margin collapsing." When two block elements stack vertically, the space between them is NOT the sum of both margins — it\'s just the larger of the two. If one has 20px bottom margin and the next has 30px top margin, the gap is only 30px, not 50px!',
    relatedConcepts: [
      { title: 'margin shorthand', desc: 'One value sets all sides. Two values set top/bottom and left/right. Four values set each side.' },
      { title: 'margin: 0 auto', desc: 'The classic trick for horizontally centering a block element with a defined width.' },
      { title: 'Margin collapsing', desc: 'Adjacent vertical margins merge into the larger of the two — a common CSS gotcha.' },
    ],
    taskTheme: 'Give your elements breathing room and center your content using margins! 🏡',
    steps: [
      'Target <code>body</code> in CSS and set <code>margin: 0</code> to remove the default browser margin.',
      'Target <code>.container</code> and set <code>max-width: 600px</code> and <code>margin: 40px auto</code> to center it.',
      'Target <code>h1</code> and set <code>margin-bottom: 8px</code> to tighten the gap below it.',
      'Target <code>p</code> and set <code>margin-top: 0</code> and <code>margin-bottom: 16px</code>.',
    ],
    closingLine: 'Perfectly spaced — your layout has room to breathe! 🌿',
    hint: 'Use margin: 0 auto with a max-width to center a container:\n.container {\n  max-width: 600px;\n  margin: 0 auto;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Margin Practice</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div class="container">\n      <h1>Margins in Action</h1>\n      <p>Margins push elements away from the edges and from each other.</p>\n      <p>Adjust the spacing between these paragraphs using margin properties.</p>\n    </div>\n  </body>\n</html>\n',
      css: '/* Practice margin on these elements */\n',
    },
    language: 'css',
  },

  'padding-practice': {
    numberTitle: '14. Padding Practice',
    mainHeading: 'Padding Practice',
    introduction: 'Margin pushes things away from the *outside*. Padding creates breathing room on the *inside* — between the border and the content. It\'s the difference between a cramped apartment and a well-furnished one. 🛋️',
    conceptExplanation: 'The <code>padding</code> property adds space *inside* an element\'s border, between the border and the content. Like margin, it accepts one to four values for shorthand. Padding is included inside the element\'s background-color, so it visually extends the colored area. With <code>box-sizing: border-box</code>, padding is included in the element\'s total width — preventing accidental overflow.',
    funFact: 'By default, CSS uses box-sizing: content-box, meaning padding is added on top of the declared width. If you set width: 200px and padding: 20px, the total width becomes 240px! Most developers add box-sizing: border-box to everything to avoid this surprise.',
    relatedConcepts: [
      { title: 'padding', desc: 'Space inside the element between its border and content. Part of the background area.' },
      { title: 'box-sizing: border-box', desc: 'Makes padding and border count toward the declared width, not beyond it.' },
      { title: 'Padding vs margin', desc: 'Padding = inside the border. Margin = outside the border.' },
    ],
    taskTheme: 'Add generous padding to cards and buttons to make them feel spacious and clickable! 🖱️',
    steps: [
      'In CSS, target <code>.card</code> and set <code>padding: 24px</code>.',
      'Add <code>background-color: white</code> and <code>border-radius: 8px</code> to <code>.card</code> — see the padding create whitespace inside.',
      'Target <code>.button</code> and set <code>padding: 12px 24px</code> (top/bottom then left/right).',
      'Add <code>box-sizing: border-box</code> to <code>*</code> (universal selector) to make width calculations predictable.',
    ],
    closingLine: 'Inner space mastered — your elements feel roomy and refined! 🏠',
    hint: 'Add padding inside any element:\n.card {\n  padding: 24px;\n  background-color: white;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Padding Practice</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="background:#f0f4f8; padding:40px;">\n    <div class="card">\n      <h2>My Card</h2>\n      <p>Padding adds space between this text and the card edge.</p>\n      <button class="button">Click Me</button>\n    </div>\n  </body>\n</html>\n',
      css: '* {\n  box-sizing: border-box;\n}\n\n/* Style the card and button below */\n',
    },
    language: 'css',
  },

  'border-practice': {
    numberTitle: '15. Border Practice',
    mainHeading: 'Border Practice',
    introduction: 'Borders are the frames around your content — they can be bold outlines, subtle dividers, or pill-shaped curves. Master borders and you\'ll add clarity and style to every element. 🖼️',
    conceptExplanation: 'The <code>border</code> property is a shorthand that sets the border\'s width, style, and color in one declaration: <code>border: 2px solid black</code>. The style is required — without it, no border appears. Common styles include <code>solid</code>, <code>dashed</code>, <code>dotted</code>, and <code>double</code>. You can also round the corners using <code>border-radius</code>.',
    funFact: 'Setting border-radius: 50% on a perfect square (equal width and height) turns it into a perfect circle. This is how profile pictures and avatar icons are made circular in CSS — no image cropping required!',
    relatedConcepts: [
      { title: 'border shorthand', desc: 'Sets width, style, and color at once. border: 2px solid #333.' },
      { title: 'border-radius', desc: 'Rounds the corners of an element. 50% on a square creates a circle.' },
      { title: 'border-style values', desc: 'solid, dashed, dotted, double, groove, ridge — each gives a different visual effect.' },
    ],
    taskTheme: 'Frame your elements with creative borders and rounded corners! 🟦',
    steps: [
      'Target <code>.box</code> in CSS and add <code>border: 2px solid #3490dc</code>.',
      'Add <code>border-radius: 12px</code> to <code>.box</code> to round the corners.',
      'Create a <code>.circle</code> rule with <code>width: 100px</code>, <code>height: 100px</code>, <code>border-radius: 50%</code>, and <code>background-color: coral</code>.',
      'Add a <code>border: 3px dashed gray</code> to the <code>.dashed-box</code> class.',
    ],
    closingLine: 'Framed and rounded — your borders are looking sharp (and smooth)! 💎',
    hint: 'Use border shorthand:\n.box {\n  border: 2px solid #3490dc;\n  border-radius: 12px;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Border Practice</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:40px;">\n    <div class="box">\n      <p>I have a solid border and rounded corners.</p>\n    </div>\n    <br>\n    <div class="dashed-box">\n      <p>I have a dashed border.</p>\n    </div>\n    <br>\n    <div class="circle"></div>\n  </body>\n</html>\n',
      css: '/* Add borders to the elements below */\n.box {\n  padding: 20px;\n}\n\n.dashed-box {\n  padding: 20px;\n}\n',
    },
    language: 'css',
  },

  'block-inline': {
    numberTitle: '16. Block vs Inline',
    mainHeading: 'Block vs Inline',
    introduction: 'Not all elements behave the same way on a page. Some take over the whole line; others quietly share space with their neighbours. Understanding this difference is one of the most important CSS concepts you\'ll ever learn. 🧱',
    conceptExplanation: 'Every HTML element has a default <code>display</code> value. Block elements (<code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>) take up the full available width and stack vertically. Inline elements (<code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>) only take up as much space as their content and sit side by side. You can override this with <code>display: block</code> or <code>display: inline</code>.',
    funFact: 'The <a> tag is inline by default, which is why a link doesn\'t take up the full line. But menus and navigation bars need links to sit in rows — which is why nav links are often given display: inline-block or placed inside flex containers!',
    relatedConcepts: [
      { title: 'display: block', desc: 'Element takes full width, starts on a new line. Can have width and height set.' },
      { title: 'display: inline', desc: 'Element flows with text. Width and height properties have no effect.' },
      { title: 'Default display values', desc: '<div> and <p> are block. <span> and <a> are inline by default.' },
    ],
    taskTheme: 'Switch an element from block to inline and back — and observe how the layout shifts! 🔄',
    steps: [
      'In CSS, target <code>.block-demo</code> and set <code>display: block</code>, <code>background: lightblue</code>, and <code>padding: 10px</code>.',
      'Target <code>.inline-demo</code> and set <code>display: inline</code>, <code>background: lightsalmon</code>, and <code>padding: 10px</code>.',
      'Observe the difference: block elements stack, inline elements sit side by side.',
      'Try setting <code>width: 200px</code> on both — notice it only works on the block element!',
    ],
    closingLine: 'Block and inline — two worlds, one page! You\'ve got them both under control. 🌍',
    hint: 'Change display with:\n.element {\n  display: block; /* or inline */\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Block vs Inline</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:20px;">\n    <div class="block-demo">I am a block element</div>\n    <div class="block-demo">I stack below the first</div>\n    <span class="inline-demo">I am inline</span>\n    <span class="inline-demo">I sit beside the first</span>\n    <span class="inline-demo">And I\'m next to the second</span>\n  </body>\n</html>\n',
      css: '/* Compare block vs inline display */\n',
    },
    language: 'css',
  },

  'inline-block': {
    numberTitle: '17. Inline-block',
    mainHeading: 'Inline-block',
    introduction: 'What if you want elements to sit side by side *and* respect width and height? The best of both worlds exists: <code>display: inline-block</code>. It\'s the original tool for building horizontal layouts. 🧩',
    conceptExplanation: '<code>display: inline-block</code> makes an element flow inline (sit next to siblings) while also respecting block properties like <code>width</code>, <code>height</code>, <code>padding</code>, and <code>margin</code>. This was the main technique for creating multi-column layouts before Flexbox arrived. It\'s still widely used for button groups, navigation items, and tag chips.',
    funFact: 'Before Flexbox (2012) and Grid (2017) were adopted by browsers, inline-block was THE way to build side-by-side columns in CSS. Developers had to add a clever hack: set font-size: 0 on the parent to remove mysterious gaps between inline-block elements caused by whitespace in the HTML!',
    relatedConcepts: [
      { title: 'display: inline-block', desc: 'Flows inline like text, but accepts width, height, padding, and margin like a block.' },
      { title: 'Whitespace gaps', desc: 'Spaces and newlines between inline-block elements in HTML create small visible gaps.' },
      { title: 'Vertical alignment', desc: 'Use vertical-align: top to align inline-block siblings along their top edges.' },
    ],
    taskTheme: 'Build a row of styled cards using inline-block to lay them side by side! 🃏',
    steps: [
      'In CSS, target <code>.chip</code> and set <code>display: inline-block</code>.',
      'Add <code>padding: 8px 16px</code>, <code>background-color: #e2e8f0</code>, and <code>border-radius: 999px</code>.',
      'Add <code>margin: 4px</code> to space the chips apart.',
      'Observe how they sit side by side while still responding to padding and border-radius.',
    ],
    closingLine: 'Side by side and fully styled — inline-block at its finest! 🏆',
    hint: 'Apply display: inline-block to allow elements to sit side by side with controlled sizing:\n.chip {\n  display: inline-block;\n  padding: 8px 16px;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Inline-block</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:20px;">\n    <span class="chip">HTML</span>\n    <span class="chip">CSS</span>\n    <span class="chip">JavaScript</span>\n    <span class="chip">React</span>\n    <span class="chip">Node.js</span>\n  </body>\n</html>\n',
      css: '/* Make the chips sit side by side */\n',
    },
    language: 'css',
  },

  'display-none': {
    numberTitle: '18. Display None',
    mainHeading: 'Display None',
    introduction: 'Sometimes the most powerful design move is making something disappear. CSS can hide elements completely — as if they were never there. This is the engine behind modals, dropdown menus, and accordions. 🫥',
    conceptExplanation: '<code>display: none</code> removes an element from the page layout entirely. It occupies no space and is invisible. This is different from <code>visibility: hidden</code>, which hides the element but still reserves its space. Toggling <code>display: none</code> on and off with JavaScript is how most interactive show/hide behaviours are built.',
    funFact: 'display: none is also used for accessibility tricks! Developers hide content visually but keep it "visible" to screen readers using a special .sr-only class with specific CSS — removing it from the visual layout without removing it from the accessibility tree.',
    relatedConcepts: [
      { title: 'display: none', desc: 'Removes the element from layout entirely. Takes up no space.' },
      { title: 'visibility: hidden', desc: 'Makes the element invisible but it still takes up its original space.' },
      { title: 'opacity: 0', desc: 'Makes the element fully transparent but still interactive and still taking up space.' },
    ],
    taskTheme: 'Hide and reveal elements by toggling display:none — the foundation of interactive UI! 🎩',
    steps: [
      'In CSS, create a <code>.hidden</code> class and set <code>display: none</code>.',
      'Apply <code>class="hidden"</code> to the <code>&lt;p class="secret"&gt;</code> element in HTML.',
      'Add a second CSS class <code>.visible</code> with <code>display: block</code>.',
      'Compare: set the secret paragraph to <code>visibility: hidden</code> instead — notice it still takes up space!',
    ],
    closingLine: 'Now you see it, now you don\'t — the magic of display:none revealed! ✨',
    hint: 'Create a class to hide elements:\n.hidden {\n  display: none;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Display None</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:20px;">\n    <h1>What\'s Hiding?</h1>\n    <p>This paragraph is always visible.</p>\n    <p class="secret">🤫 This is a secret paragraph — hide me with CSS!</p>\n    <p>This paragraph is also always visible.</p>\n  </body>\n</html>\n',
      css: '/* Create a .hidden class and apply it in HTML */\n',
    },
    language: 'css',
  },

  'center-flex': {
    numberTitle: '19. Center with Flex',
    mainHeading: 'Center with Flex',
    introduction: 'Centering something both horizontally and vertically used to be the most notoriously painful task in CSS. Flexbox changed everything in one beautiful moment. Let\'s do it in just two lines. 🎯',
    conceptExplanation: 'CSS Flexbox is a one-dimensional layout system. When you set <code>display: flex</code> on a container, all direct children become flex items. <code>justify-content</code> aligns items along the main axis (horizontal by default); <code>align-items</code> aligns them on the cross axis (vertical by default). Together, <code>justify-content: center</code> and <code>align-items: center</code> achieve perfect centering.',
    funFact: 'Before Flexbox, developers used a hack called "the absolute centering trick" involving position: absolute, top: 50%, left: 50%, and transform: translate(-50%, -50%). Flexbox reduced this to two properties — and the web was never the same!',
    relatedConcepts: [
      { title: 'display: flex', desc: 'Activates Flexbox on the container, making all direct children flex items.' },
      { title: 'justify-content', desc: 'Aligns flex items along the main axis (horizontal by default).' },
      { title: 'align-items', desc: 'Aligns flex items along the cross axis (vertical by default).' },
    ],
    taskTheme: 'Perfectly center a card on the screen using just two Flexbox properties! 🎯',
    steps: [
      'Target <code>.page</code> in CSS and set <code>display: flex</code>.',
      'Add <code>justify-content: center</code> to center horizontally.',
      'Add <code>align-items: center</code> to center vertically.',
      'Add <code>height: 100vh</code> to <code>.page</code> so it fills the full viewport height.',
    ],
    closingLine: 'Dead center — Flexbox made the impossible trivial! 🥳',
    hint: 'Three flex properties center anything:\n.page {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Center with Flex</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div class="page">\n      <div class="card">\n        <h2>I am centered!</h2>\n        <p>Both horizontally and vertically.</p>\n      </div>\n    </div>\n  </body>\n</html>\n',
      css: 'body {\n  margin: 0;\n}\n\n.card {\n  background: white;\n  padding: 32px;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n\n/* Make .page a flex container that centers its child */\n.page {\n  background: #f0f4f8;\n}\n',
    },
    language: 'css',
  },

  'space-between': {
    numberTitle: '20. Space Between',
    mainHeading: 'Space Between',
    introduction: 'Navigation bars, card grids, toolbars — they all need items spread evenly across a line. Flexbox\'s <code>justify-content: space-between</code> pushes items to the edges and distributes the remaining space perfectly. 📏',
    conceptExplanation: '<code>justify-content: space-between</code> places the first flex item at the start and the last at the end, with equal space between all the items. <code>space-around</code> adds equal space on each side of every item (so edges get half the space). <code>space-evenly</code> distributes space uniformly — including before the first and after the last item.',
    funFact: 'The classic two-item navbar layout — logo on the left, navigation links on the right — is built with just justify-content: space-between on a flex container. No floats, no absolute positioning, no tricks. Just two lines of CSS!',
    relatedConcepts: [
      { title: 'space-between', desc: 'First item at start, last at end, equal space between remaining items.' },
      { title: 'space-around', desc: 'Equal space on each side of each item. Edges get half the inter-item spacing.' },
      { title: 'space-evenly', desc: 'Equal space everywhere — between items and at both edges.' },
    ],
    taskTheme: 'Build a navigation bar with a logo and links spread to opposite ends! 🧭',
    steps: [
      'Target <code>.navbar</code> in CSS and set <code>display: flex</code>.',
      'Add <code>justify-content: space-between</code>.',
      'Add <code>align-items: center</code> to vertically align the logo and links.',
      'Add <code>padding: 16px 32px</code> and <code>background-color: #1a202c</code> for styling.',
    ],
    closingLine: 'Space mastered — your navbar is production-ready! 🚀',
    hint: 'Use space-between on a flex parent:\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Space Between</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <nav class="navbar">\n      <span class="logo">🚀 MyBrand</span>\n      <div class="nav-links">\n        <a href="#">Home</a>\n        <a href="#">About</a>\n        <a href="#">Contact</a>\n      </div>\n    </nav>\n  </body>\n</html>\n',
      css: 'body {\n  margin: 0;\n  font-family: sans-serif;\n}\n\n.logo {\n  color: white;\n  font-weight: bold;\n  font-size: 1.2rem;\n}\n\n.nav-links a {\n  color: #a0aec0;\n  text-decoration: none;\n  margin-left: 24px;\n}\n\n/* Style the navbar with flexbox */\n.navbar {\n\n}\n',
    },
    language: 'css',
  },

  'flex-direction': {
    numberTitle: '21. Flex Direction',
    mainHeading: 'Flex Direction',
    introduction: 'Flexbox isn\'t just about rows. One property flips the entire layout from horizontal to vertical — giving you the power to stack items in any direction you choose. 🔀',
    conceptExplanation: 'The <code>flex-direction</code> property controls the direction of the main axis. <code>row</code> (the default) arranges items left to right. <code>column</code> arranges them top to bottom. The reverse variants (<code>row-reverse</code>, <code>column-reverse</code>) flip the order visually without changing the HTML. This property is the key to building both horizontal and vertical layouts with Flexbox.',
    funFact: 'When you change flex-direction to column, justify-content and align-items swap their axes! Now justify-content controls vertical alignment and align-items controls horizontal alignment. This trips up even experienced developers — always double-check your axis when switching directions.',
    relatedConcepts: [
      { title: 'flex-direction: row', desc: 'Default. Items arranged left to right along the horizontal main axis.' },
      { title: 'flex-direction: column', desc: 'Items stacked top to bottom. Main axis becomes vertical.' },
      { title: 'Main vs cross axis', desc: 'The main axis is set by flex-direction. The cross axis is always perpendicular to it.' },
    ],
    taskTheme: 'Build a sidebar layout by switching flex direction from row to column! 🏗️',
    steps: [
      'Target <code>.sidebar</code> in CSS and set <code>display: flex</code> and <code>flex-direction: column</code>.',
      'Add <code>gap: 8px</code> to space the items apart.',
      'Target <code>.layout</code> and set <code>display: flex</code> and <code>flex-direction: row</code>.',
      'Add <code>height: 100vh</code> to <code>.layout</code> to make the sidebar full height.',
    ],
    closingLine: 'Horizontal, vertical, reversed — flex-direction is your layout compass! 🧭',
    hint: 'Switch layout direction with:\n.sidebar {\n  display: flex;\n  flex-direction: column;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Flex Direction</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <div class="layout">\n      <div class="sidebar">\n        <a href="#">Dashboard</a>\n        <a href="#">Profile</a>\n        <a href="#">Settings</a>\n        <a href="#">Logout</a>\n      </div>\n      <main class="content">\n        <h1>Main Content</h1>\n        <p>The sidebar on the left uses flex-direction: column.</p>\n      </main>\n    </div>\n  </body>\n</html>\n',
      css: 'body {\n  margin: 0;\n  font-family: sans-serif;\n}\n\n.sidebar {\n  background: #2d3748;\n  padding: 24px 16px;\n  min-width: 180px;\n}\n\n.sidebar a {\n  color: #a0aec0;\n  text-decoration: none;\n  padding: 8px;\n}\n\n.content {\n  padding: 32px;\n  flex: 1;\n}\n\n/* Set flex-direction on .layout and .sidebar */\n.layout {\n\n}\n',
    },
    language: 'css',
  },

  'relative-box': {
    numberTitle: '22. Relative Box',
    mainHeading: 'Relative Box',
    introduction: 'Flexbox handles flow. But sometimes you need to nudge an element slightly from its natural position without disturbing the layout around it. That\'s the superpower of <code>position: relative</code>. 🔧',
    conceptExplanation: 'When you set <code>position: relative</code> on an element, you can use <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> to offset it from its *normal* position. Crucially, the space where it would have been is *still reserved* — surrounding elements don\'t shift. It also creates a new "positioning context," which is essential for anchoring absolutely-positioned children.',
    funFact: 'The most common use of position: relative is NOT to move an element — it\'s to create a positioning anchor for an absolutely-positioned child! Setting position: relative on a parent is the standard way to make sure a badge or tooltip stays attached to its parent rather than floating off relative to the whole page.',
    relatedConcepts: [
      { title: 'position: relative', desc: 'Offsets the element from its normal document position without affecting other elements.' },
      { title: 'top / left / right / bottom', desc: 'Offset properties. Positive values push away from that edge.' },
      { title: 'Positioning context', desc: 'A positioned ancestor that absolutely-positioned descendants are measured against.' },
    ],
    taskTheme: 'Use relative positioning to nudge a badge element slightly from its natural position! 📍',
    steps: [
      'Target <code>.box</code> in CSS and set <code>position: relative</code>.',
      'Add <code>top: 20px</code> and <code>left: 20px</code> to shift it down and right from its natural position.',
      'Notice that the space it originally occupied is still visible — the layout around it doesn\'t shift.',
      'Try changing the values to <code>top: -10px</code> to move it upward past its natural position.',
    ],
    closingLine: 'Nudged but not displaced — relative positioning is a precision instrument! 🎯',
    hint: 'Move an element from its natural spot:\n.box {\n  position: relative;\n  top: 20px;\n  left: 20px;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Relative Box</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:40px;">\n    <div class="placeholder">I am a placeholder. The box below is shifted from here.</div>\n    <div class="box">I am shifted using position: relative.</div>\n    <div class="placeholder">I am unaffected — the space above me is still reserved.</div>\n  </body>\n</html>\n',
      css: '.placeholder {\n  background: #e2e8f0;\n  padding: 16px;\n  margin: 8px 0;\n}\n\n.box {\n  background: #4299e1;\n  color: white;\n  padding: 16px;\n  margin: 8px 0;\n  /* Add position: relative and offset values here */\n}\n',
    },
    language: 'css',
  },

  'absolute-box': {
    numberTitle: '23. Absolute Box',
    mainHeading: 'Absolute Box',
    introduction: 'Sometimes an element needs to break free from the document flow entirely and be pinned to a precise spot — like a badge on a card or a close button on a modal. That\'s what absolute positioning is for. 📌',
    conceptExplanation: '<code>position: absolute</code> removes the element from the document flow — other elements act as if it doesn\'t exist. It is then positioned relative to its nearest ancestor that has a <code>position</code> value other than <code>static</code> (usually <code>relative</code>). If no such ancestor exists, it positions relative to the <code>&lt;html&gt;</code> element. Use <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> to place it precisely.',
    funFact: 'Tooltips, dropdown menus, notification badges, autocomplete suggestions — almost all of these use position: absolute. They need to appear "on top of" and "attached to" a specific element without pushing other content around.',
    relatedConcepts: [
      { title: 'position: absolute', desc: 'Removes the element from flow. Positioned relative to the nearest positioned ancestor.' },
      { title: 'Positioned ancestor', desc: 'Any ancestor with position other than static. Usually set to relative to act as an anchor.' },
      { title: 'z-index', desc: 'Controls stacking order. Higher z-index values appear in front of lower ones.' },
    ],
    taskTheme: 'Pin a notification badge to the top-right corner of a card using absolute positioning! 🔔',
    steps: [
      'Target <code>.card</code> in CSS and set <code>position: relative</code> to act as the anchor.',
      'Target <code>.badge</code> and set <code>position: absolute</code>.',
      'Add <code>top: -10px</code> and <code>right: -10px</code> to pin the badge to the top-right corner of the card.',
      'Style the badge with <code>background: red</code>, <code>color: white</code>, <code>border-radius: 50%</code>, <code>width: 24px</code>, and <code>height: 24px</code>.',
    ],
    closingLine: 'Pinned to perfection — absolute positioning unlocked! 🏅',
    hint: 'Set the parent to relative, then place the child with absolute:\n.card { position: relative; }\n.badge { position: absolute; top: -10px; right: -10px; }',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Absolute Box</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:60px;">\n    <div class="card">\n      <h3>Notifications</h3>\n      <p>You have new messages waiting for you.</p>\n      <span class="badge">3</span>\n    </div>\n  </body>\n</html>\n',
      css: '.card {\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 24px;\n  width: 280px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  /* Add position: relative here */\n}\n\n.badge {\n  background: red;\n  color: white;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: bold;\n  /* Add position: absolute and offset values here */\n}\n',
    },
    language: 'css',
  },

  'fixed-header': {
    numberTitle: '24. Fixed Header',
    mainHeading: 'Fixed Header',
    introduction: 'Scroll down a professional website and the header stays put, watching over the page from the top. That sticky navigation bar is one of the most common UI patterns on the web — and it\'s powered by <code>position: fixed</code>. 📌',
    conceptExplanation: '<code>position: fixed</code> removes an element from the normal flow and positions it relative to the *viewport* (the browser window), not the page. It stays exactly in place even when the user scrolls. A common pattern is to create a fixed header at the top of the screen. Remember to add <code>padding-top</code> to the body equal to the header\'s height so content isn\'t hidden behind it.',
    funFact: 'Sticky headers became a major UX trend around 2013, when responsive design pushed navigation to be always accessible. Before CSS fixed positioning was reliable cross-browser, developers used JavaScript scroll event listeners to achieve the same effect — significantly slower and more complex!',
    relatedConcepts: [
      { title: 'position: fixed', desc: 'Positions the element relative to the viewport. Stays in place during scroll.' },
      { title: 'z-index', desc: 'Fixed elements often need a high z-index (e.g. 100) to appear above scrolled-past content.' },
      { title: 'Body padding', desc: 'Add padding-top to <body> equal to the header height to prevent content overlap.' },
    ],
    taskTheme: 'Build a header that stays visible at the top as you scroll down a long page! 📜',
    steps: [
      'Target <code>.header</code> in CSS and set <code>position: fixed</code>.',
      'Add <code>top: 0</code> and <code>left: 0</code> and <code>width: 100%</code> to stretch it across the viewport.',
      'Add <code>z-index: 100</code> so it floats above all other content.',
      'Set <code>padding-top: 60px</code> on <code>body</code> to prevent the first content from hiding behind the header.',
    ],
    closingLine: 'Always there, never in the way — your fixed header is live! 🌟',
    hint: 'Pin a header to the viewport:\n.header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Fixed Header</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <header class="header">\n      <span>🚀 My Website</span>\n      <nav><a href="#">Home</a> <a href="#">About</a></nav>\n    </header>\n    <main class="content">\n      <h1>Scroll Down</h1>\n      <p>Keep scrolling to see the header stay fixed...</p>\n      <p>More content...</p>\n      <p>Even more content...</p>\n      <p>Still more content...</p>\n      <p>The header is still there! 👆</p>\n    </main>\n  </body>\n</html>\n',
      css: 'body {\n  margin: 0;\n  font-family: sans-serif;\n  /* Add padding-top here to avoid content hiding behind header */\n}\n\n.header {\n  background: #1a202c;\n  color: white;\n  padding: 16px 32px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /* Add position: fixed, top, left, width, z-index here */\n}\n\n.header a {\n  color: #a0aec0;\n  text-decoration: none;\n  margin-left: 16px;\n}\n\n.content {\n  padding: 32px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n.content p {\n  margin-bottom: 300px;\n  font-size: 1.1rem;\n  color: #555;\n}\n',
    },
    language: 'css',
  },

  'color-hover': {
    numberTitle: '25. Color Hover',
    mainHeading: 'Color Hover',
    introduction: 'Static pages are fine. But interactive pages that *respond* to the user feel alive. The <code>:hover</code> pseudo-class is your first taste of CSS interactivity — no JavaScript required! 🖱️',
    conceptExplanation: 'The <code>:hover</code> pseudo-class applies styles to an element when the user\'s mouse pointer is over it. Combined with the <code>transition</code> property, color changes become smooth animations rather than jarring snaps. The syntax is: <code>selector:hover { property: value; }</code>.',
    funFact: 'Pseudo-classes like :hover are called "pseudo" because they don\'t match actual HTML attributes or elements — they match states. CSS has over 30 pseudo-classes, including :focus, :checked, :nth-child(), :first-of-type, and :not() — a whole grammar of dynamic states!',
    relatedConcepts: [
      { title: ':hover pseudo-class', desc: 'Matches an element while the mouse cursor is positioned over it.' },
      { title: 'transition', desc: 'Animates a CSS property change over a set duration. Makes hover effects smooth.' },
      { title: 'Pseudo-class syntax', desc: 'Written with a colon between the selector and the state: a:hover, button:focus.' },
    ],
    taskTheme: 'Make your buttons and links react to the mouse with smooth color changes! 🎨',
    steps: [
      'In CSS, style <code>.btn</code> with <code>background-color: #4299e1</code>, <code>color: white</code>, and <code>padding: 12px 24px</code>.',
      'Add <code>transition: background-color 0.3s ease</code> to <code>.btn</code>.',
      'Write a <code>.btn:hover</code> rule and set <code>background-color: #2b6cb0</code> (a darker blue).',
      'Do the same for the <code>a</code> link: add <code>a:hover { color: tomato; }</code>.',
    ],
    closingLine: 'Responsive to the touch — your UI just came alive! ✨',
    hint: 'Write hover styles with the :hover pseudo-class:\n.btn:hover {\n  background-color: #2b6cb0;\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Color Hover</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:40px; font-family:sans-serif;">\n    <h2>Hover Over These Elements</h2>\n    <button class="btn">Hover Me</button>\n    <br><br>\n    <a href="#" class="link">Or hover over this link</a>\n  </body>\n</html>\n',
      css: '.btn {\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n  /* Add base color and transition here */\n}\n\n/* Add .btn:hover rule here */\n\n.link {\n  color: #4299e1;\n  font-size: 1rem;\n}\n\n/* Add a:hover or .link:hover rule here */\n',
    },
    language: 'css',
  },

  'scale-hover': {
    numberTitle: '26. Scale Hover',
    mainHeading: 'Scale Hover',
    introduction: 'Color changes are great. But what if the whole element *grows* when you hover it? That pop-out effect feels premium and satisfying — and it\'s powered by a single CSS property: <code>transform</code>. 🔍',
    conceptExplanation: 'The <code>transform</code> property applies a visual transformation to an element — scaling, rotating, skewing, or translating it — without affecting the layout of surrounding elements. <code>scale(1.1)</code> makes an element 10% larger on hover. Combined with <code>transition: transform 0.2s ease</code>, it becomes a smooth, elegant animation.',
    funFact: 'CSS transforms are hardware-accelerated by the GPU on most devices. This means transform and opacity animations are buttery-smooth at 60fps even on mobile, unlike animating width, height, or margin — which force the browser to recalculate the entire page layout on every frame!',
    relatedConcepts: [
      { title: 'transform: scale()', desc: 'Scales an element by a multiplier. scale(1) is normal size, scale(1.1) is 10% larger.' },
      { title: 'transition: transform', desc: 'Animates the scale change smoothly over a specified duration.' },
      { title: 'GPU acceleration', desc: 'Transform and opacity are animated by the GPU for smooth 60fps performance.' },
    ],
    taskTheme: 'Make cards grow slightly on hover for a satisfying, premium feel! 📦',
    steps: [
      'Target <code>.card</code> in CSS and add <code>transition: transform 0.2s ease, box-shadow 0.2s ease</code>.',
      'Write a <code>.card:hover</code> rule and add <code>transform: scale(1.05)</code>.',
      'Add <code>box-shadow: 0 8px 24px rgba(0,0,0,0.15)</code> to <code>.card:hover</code> for a lifting effect.',
      'Hover over each card in the preview — feel the difference!',
    ],
    closingLine: 'That subtle growth on hover — pure premium UI magic! ✨',
    hint: 'Scale up on hover:\n.card:hover {\n  transform: scale(1.05);\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Scale Hover</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:40px; font-family:sans-serif; display:flex; gap:24px;">\n    <div class="card">\n      <h3>Card One</h3>\n      <p>Hover over me!</p>\n    </div>\n    <div class="card">\n      <h3>Card Two</h3>\n      <p>Hover over me too!</p>\n    </div>\n    <div class="card">\n      <h3>Card Three</h3>\n      <p>Don\'t forget me!</p>\n    </div>\n  </body>\n</html>\n',
      css: '.card {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  width: 200px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n  cursor: pointer;\n  /* Add transition here */\n}\n\n/* Add .card:hover with transform and box-shadow here */\n',
    },
    language: 'css',
  },

  'smooth-transition': {
    numberTitle: '27. Smooth Transition',
    mainHeading: 'Smooth Transition',
    introduction: 'Instant changes feel jarring. Gradual changes feel polished. The <code>transition</code> property is the difference between amateur and professional UI — it\'s the animation layer that makes CSS come alive. 🎬',
    conceptExplanation: 'The <code>transition</code> property takes up to four values: the property to animate, the duration, the timing function (easing), and an optional delay. You can animate multiple properties at once by separating them with commas, or use <code>transition: all 0.3s ease</code> to animate any changing property. Common easing values include <code>ease</code>, <code>linear</code>, <code>ease-in</code>, <code>ease-out</code>, and <code>ease-in-out</code>.',
    funFact: 'CSS transitions use mathematical "easing functions" based on cubic Bézier curves — the same curves used in vector graphic software like Illustrator. You can write custom easing with cubic-bezier(x1, y1, x2, y2). Tools like cubic-bezier.com let you design them visually!',
    relatedConcepts: [
      { title: 'transition property', desc: 'Specifies which CSS property to animate smoothly on state change.' },
      { title: 'transition duration', desc: 'How long the animation takes. 0.3s is snappy, 0.6s is gentle.' },
      { title: 'Easing functions', desc: 'ease, linear, ease-in, ease-out, ease-in-out — controls the speed curve of the animation.' },
    ],
    taskTheme: 'Craft a button with multiple smooth transitions — color, size, and shadow all at once! 🎛️',
    steps: [
      'Target <code>.btn</code> in CSS and style it with a background color, padding, and border-radius.',
      'Add <code>transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease</code>.',
      'Write <code>.btn:hover</code> and change the background color, add <code>transform: translateY(-3px)</code>, and add a box-shadow.',
      'Hover slowly and quickly — notice the easing makes each direction feel natural.',
      'Try changing <code>ease</code> to <code>linear</code> — notice how it feels more mechanical.',
    ],
    closingLine: 'Smooth, polished, professional — your transitions are cinema-quality! 🎥',
    hint: 'Animate multiple properties:\n.btn {\n  transition: background-color 0.3s ease, transform 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-3px);\n}',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Smooth Transition</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body style="padding:80px; font-family:sans-serif; text-align:center;">\n    <h2>Hover for Smooth Transitions</h2>\n    <button class="btn">Hover Me Slowly</button>\n  </body>\n</html>\n',
      css: 'body {\n  background: #f7fafc;\n}\n\n.btn {\n  background-color: #667eea;\n  color: white;\n  padding: 14px 32px;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(102,126,234,0.3);\n  /* Add your transition here */\n}\n\n/* Add .btn:hover styles here */\n',
    },
    language: 'css',
  },
};

export default cssExercises;
