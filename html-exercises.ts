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

const htmlExercises: Record<string, Exercise> = {
  'add-title': {
    numberTitle: '03. Add a Title',
    mainHeading: 'Add a Title',
    introduction: 'Every great book has a name on the cover. Your webpage deserves one too! The browser tab at the top of your screen is the window to your world — let\'s give it a name. 🏷️',
    conceptExplanation: 'The <code>&lt;title&gt;</code> tag lives inside the <code>&lt;head&gt;</code> of your HTML document. Whatever text you place inside it appears in the browser\'s tab and is the first thing search engines read. It\'s invisible on the page itself, but incredibly important.',
    funFact: 'Search engines like Google use your page\'s <title> tag as the clickable blue headline in search results. A good title can make or break whether someone visits your page!',
    relatedConcepts: [
      { title: '<head>', desc: 'The invisible section of your page that holds metadata and configuration.' },
      { title: '<title>', desc: 'Sets the text shown in the browser tab and bookmarks.' },
    ],
    taskTheme: 'Name your digital kingdom by giving the page its very first title! 👑',
    steps: [
      'Make sure you have a <code>&lt;head&gt;</code> section inside your <code>&lt;html&gt;</code> tag.',
      'Inside the <code>&lt;head&gt;</code>, add a <code>&lt;title&gt;</code> tag.',
      'Between the opening and closing <code>&lt;title&gt;</code> tags, type the name of your page — for example, <code>My Awesome Page</code>.',
    ],
    closingLine: 'Your page now has a name the whole browser can see! 🌟',
    hint: 'The <title> tag goes inside <head>, not <body>. Try: <title>My Awesome Page</title>',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Add your title tag here -->\n  </head>\n  <body>\n    <p>Hello, world!</p>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'using-head': {
    numberTitle: '04. Using the &lt;head&gt;',
    mainHeading: 'Using the <head>',
    introduction: 'Think of the <code>&lt;head&gt;</code> as the backstage crew of a theatre production — invisible to the audience, but absolutely essential for a smooth show. 🎭',
    conceptExplanation: 'The <code>&lt;head&gt;</code> element is a container for metadata — information *about* your page rather than content *on* it. Common things found here include the <code>&lt;title&gt;</code>, character encoding declarations, stylesheet links, and script references. None of this shows up in the visible page, but the browser relies on it.',
    funFact: 'The <head> section can contain dozens of different tags. Large websites like Twitter or Facebook have <head> sections with 50+ lines of metadata, tracking codes, and resource hints!',
    relatedConcepts: [
      { title: 'Metadata', desc: 'Data that describes and gives information about other data — like the label on a filing cabinet.' },
      { title: '<meta>', desc: 'A self-closing tag used to define metadata such as character set, author, and description.' },
      { title: '<link>', desc: 'Used inside <head> to connect external resources like CSS stylesheets.' },
    ],
    taskTheme: 'Explore the backstage of your page by populating the <code>&lt;head&gt;</code> section! 🎬',
    steps: [
      'Ensure your HTML document has a <code>&lt;head&gt;</code> section between the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags.',
      'Add a <code>&lt;title&gt;My Head Demo&lt;/title&gt;</code> inside the <code>&lt;head&gt;</code>.',
      'Below the title, add a charset meta tag: <code>&lt;meta charset="UTF-8"&gt;</code>.',
      'Check the browser tab — you should see your title appear there.',
    ],
    closingLine: 'The backstage is set — your page is production-ready! 🎉',
    hint: 'Everything inside <head> is invisible on the page. Use <meta charset="UTF-8"> to tell the browser to use standard characters.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Put your head content here -->\n  </head>\n  <body>\n    <p>Check the browser tab above!</p>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'using-body': {
    numberTitle: '05. Using the &lt;body&gt;',
    mainHeading: 'Using the <body>',
    introduction: 'The stage is set and the curtain is about to rise. Everything the audience sees and interacts with lives inside the <code>&lt;body&gt;</code>. Time to fill it with life! ✨',
    conceptExplanation: 'The <code>&lt;body&gt;</code> element contains all the visible content of a web page — headings, paragraphs, images, links, buttons, and more. While <code>&lt;head&gt;</code> works behind the scenes, <code>&lt;body&gt;</code> is where your story is told.',
    funFact: 'A webpage\'s <body> can technically be empty and still be valid HTML — you\'d just see a blank white page. Every visual pixel you\'ve ever seen on a website lives inside a <body> tag!',
    relatedConcepts: [
      { title: '<body>', desc: 'Contains all the visible page content — text, images, links, and everything in between.' },
      { title: 'Block elements', desc: 'Elements like <h1> and <p> that take up the full width of their container.' },
      { title: 'Inline elements', desc: 'Elements like <span> and <a> that only take up as much space as their content.' },
    ],
    taskTheme: 'Bring your page to life by adding real content inside the <code>&lt;body&gt;</code>! 🌈',
    steps: [
      'Locate the <code>&lt;body&gt;</code> section in your HTML.',
      'Add an <code>&lt;h1&gt;</code> tag with a welcome message, like <code>&lt;h1&gt;Welcome to My Page!&lt;/h1&gt;</code>.',
      'Below the heading, add a <code>&lt;p&gt;</code> tag with a short description of yourself or your page.',
      'Preview the result and see your content appear on screen.',
    ],
    closingLine: 'The stage is alive! Your body content is looking great. 🎊',
    hint: 'All visible content goes inside <body>. Try adding both a <h1> heading and a <p> paragraph.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Body Demo</title>\n  </head>\n  <body>\n    <!-- Add your visible content here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'add-meta': {
    numberTitle: '06. Add Metadata',
    mainHeading: 'Add Metadata',
    introduction: 'Behind every great webpage is a layer of hidden intelligence — metadata. It\'s the secret dossier that tells browsers and search engines exactly who you are. 🕵️',
    conceptExplanation: 'The <code>&lt;meta&gt;</code> tag is a self-closing element placed in the <code>&lt;head&gt;</code>. It can define the character encoding, the page\'s author, a description for search engines, and viewport settings for mobile devices. These small additions make a massive difference in how your page is discovered and displayed.',
    funFact: 'The "viewport" meta tag is why websites look great on phones. Without it, mobile browsers would render the page as if it were a tiny desktop screen and then zoom out — making everything unreadably small!',
    relatedConcepts: [
      { title: 'charset', desc: 'Defines the character encoding. UTF-8 supports almost every language on Earth.' },
      { title: 'description', desc: 'The snippet of text shown below your page title in Google search results.' },
      { title: 'viewport', desc: 'Controls how your page scales on different screen sizes and mobile devices.' },
    ],
    taskTheme: 'Equip your page with the metadata it needs to be smart and discoverable! 🔍',
    steps: [
      'Inside your <code>&lt;head&gt;</code>, add <code>&lt;meta charset="UTF-8"&gt;</code> as the very first tag.',
      'Add a viewport meta tag: <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>.',
      'Add a description meta tag: <code>&lt;meta name="description" content="My first webpage built with HTML."&gt;</code>.',
      'Add an author meta tag: <code>&lt;meta name="author" content="Your Name"&gt;</code>.',
    ],
    closingLine: 'Your page now speaks fluent browser! 🌐',
    hint: 'Meta tags are self-closing — they don\'t need a closing tag. Use name="description" and content="..." to describe your page.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Metadata Demo</title>\n    <!-- Add your meta tags here -->\n  </head>\n  <body>\n    <h1>Hello, Metadata!</h1>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'paragraphs': {
    numberTitle: '07. Paragraphs',
    mainHeading: 'Paragraphs',
    introduction: 'Every story is told one paragraph at a time. In HTML, we have a dedicated tag just for this — and it\'s one of the most used tags on the entire web. Let\'s write! ✍️',
    conceptExplanation: 'The <code>&lt;p&gt;</code> element defines a paragraph of text. Browsers automatically add some space (margin) above and below each paragraph, making content easier to read. You can have as many <code>&lt;p&gt;</code> tags as you need on a single page.',
    funFact: 'The <p> tag has been part of HTML since its very first public specification in 1991. It\'s one of the oldest and most universally used HTML elements in existence!',
    relatedConcepts: [
      { title: '<p>', desc: 'Wraps a block of text into a paragraph with automatic spacing above and below.' },
      { title: 'Block element', desc: 'The <p> tag is a block-level element — it always starts on a new line.' },
      { title: 'Whitespace', desc: 'Extra spaces or line breaks inside a <p> tag are collapsed to a single space by the browser.' },
    ],
    taskTheme: 'Tell your story paragraph by paragraph! 📖',
    steps: [
      'Inside the <code>&lt;body&gt;</code>, add a <code>&lt;p&gt;</code> tag with your first sentence.',
      'Below it, add a second <code>&lt;p&gt;</code> tag with a different sentence.',
      'Add a third paragraph. Notice how each paragraph automatically has space between them.',
      'Try adding extra line breaks *inside* a paragraph in your code — notice the browser ignores them!',
    ],
    closingLine: 'Wonderful writing! Your paragraphs are picture-perfect. 📝',
    hint: 'Each <p>...</p> block becomes its own paragraph. The browser adds spacing between paragraphs automatically.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Paragraphs</title>\n  </head>\n  <body>\n    <!-- Add your paragraph tags here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'bold-italic': {
    numberTitle: '08. Bold &amp; Italic',
    mainHeading: 'Bold & Italic',
    introduction: 'Not all words are created equal. Some deserve to *stand out*. HTML gives us two powerful tools to add emphasis and importance to your text. Let\'s make some words pop! 💥',
    conceptExplanation: 'The <code>&lt;strong&gt;</code> tag marks text as important — browsers display it in bold. The <code>&lt;em&gt;</code> tag marks text for emphasis — browsers display it in italic. These tags also carry semantic meaning: screen readers will stress the words differently, helping visually impaired users understand your content.',
    funFact: 'While <b> and <i> also make text bold and italic, they are purely visual. <strong> and <em> carry meaning — they tell browsers and assistive technologies *why* the text is special, not just *how* it looks.',
    relatedConcepts: [
      { title: '<strong>', desc: 'Marks text as critically important. Renders as bold by default.' },
      { title: '<em>', desc: 'Marks text for emphasis. Renders as italic by default.' },
      { title: '<b> and <i>', desc: 'Visual-only alternatives with no semantic meaning. Avoid when meaning matters.' },
    ],
    taskTheme: 'Add drama and importance to your text with bold and italic styling! 🎭',
    steps: [
      'Add a paragraph with some text inside the <code>&lt;body&gt;</code>.',
      'Wrap one important word or phrase with <code>&lt;strong&gt;</code> tags to make it bold.',
      'Wrap another word or phrase with <code>&lt;em&gt;</code> tags to make it italic.',
      'Try nesting them: <code>&lt;strong&gt;&lt;em&gt;bold and italic&lt;/em&gt;&lt;/strong&gt;</code>.',
    ],
    closingLine: 'Your words now carry weight and style! 💪',
    hint: 'Use <strong> for bold and <em> for italic. You can nest them for bold-italic text.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Bold &amp; Italic</title>\n  </head>\n  <body>\n    <p><!-- Make some text bold and italic here --></p>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'new-tab-link': {
    numberTitle: '09. Open in New Tab',
    mainHeading: 'Open in New Tab',
    introduction: 'Links are the highways of the internet. But sometimes, you want visitors to keep your page open while they explore somewhere else. The solution? Open the link in a new tab! 🪟',
    conceptExplanation: 'By default, clicking an <code>&lt;a&gt;</code> link navigates away from your current page. Adding the <code>target="_blank"</code> attribute makes the link open in a brand new browser tab. You should also add <code>rel="noopener noreferrer"</code> for security — it prevents the new tab from being able to manipulate your page.',
    funFact: 'The target="_blank" attribute was actually considered controversial for a long time! Many UX designers argue it takes control away from the user. Modern best practice is to use it only for external links, not internal ones.',
    relatedConcepts: [
      { title: 'target="_blank"', desc: 'Opens the linked URL in a new browser tab or window.' },
      { title: 'rel="noopener noreferrer"', desc: 'A security attribute that prevents the new page from accessing your page\'s window object.' },
      { title: '<a href>', desc: 'The anchor tag with its href attribute defines the destination of a link.' },
    ],
    taskTheme: 'Build a link that sends visitors on an adventure — without losing them from your page! 🗺️',
    steps: [
      'Create an <code>&lt;a&gt;</code> tag with an <code>href</code> pointing to an external URL, like <code>https://www.wikipedia.org</code>.',
      'Add the <code>target="_blank"</code> attribute to the tag.',
      'Also add <code>rel="noopener noreferrer"</code> for security.',
      'Give the link descriptive text between the tags, like <code>Visit Wikipedia</code>.',
    ],
    closingLine: 'Your link now opens a portal to new worlds — without closing this one! 🌍',
    hint: 'Add target="_blank" and rel="noopener noreferrer" to your <a> tag. Example: <a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>New Tab Link</title>\n  </head>\n  <body>\n    <p>Click this link: <!-- Add your link here --></p>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'email-link': {
    numberTitle: '10. Link to Email',
    mainHeading: 'Link to Email',
    introduction: 'What if clicking a link could open someone\'s email app with your address already filled in? That\'s the magic of the mailto link — a simple trick that makes contacting you effortless! 📧',
    conceptExplanation: 'The <code>&lt;a&gt;</code> tag doesn\'t only link to web pages. By using <code>href="mailto:someone@example.com"</code>, the browser will open the user\'s default email client with the "To" field pre-filled. You can even pre-fill a subject line with <code>?subject=Hello</code>!',
    funFact: 'The mailto: protocol was defined in 1994 in RFC 1738 — one of the earliest internet standards documents. It\'s over 30 years old and still works perfectly in modern browsers today!',
    relatedConcepts: [
      { title: 'mailto:', desc: 'A URI scheme that triggers the user\'s email client when used in an href.' },
      { title: 'URL encoding', desc: 'Spaces in email subjects are written as %20 or + in a mailto link.' },
      { title: 'Spam risk', desc: 'Visible mailto links can be harvested by bots. Some developers hide emails using JavaScript.' },
    ],
    taskTheme: 'Create a contact link that opens someone\'s email app instantly! 💌',
    steps: [
      'Create an <code>&lt;a&gt;</code> tag.',
      'Set the <code>href</code> to <code>mailto:hello@example.com</code>.',
      'Add link text between the tags like <code>Email Me</code>.',
      'As a bonus, try adding a subject: <code>mailto:hello@example.com?subject=Hello%20There</code>.',
    ],
    closingLine: 'One click, and the conversation begins! Great work. 💬',
    hint: 'Use href="mailto:your@email.com" inside an <a> tag. Add ?subject=Your%20Subject to pre-fill the subject line.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Email Link</title>\n  </head>\n  <body>\n    <p>Get in touch: <!-- Add your mailto link here --></p>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'image-size': {
    numberTitle: '11. Image Size',
    mainHeading: 'Image Size',
    introduction: 'A great photo in the wrong frame can ruin a gallery. Learning to control the size of images in HTML is the art of perfect presentation. Let\'s frame your visuals just right! 🖼️',
    conceptExplanation: 'The <code>&lt;img&gt;</code> tag has two key sizing attributes: <code>width</code> and <code>height</code>. You can set them to pixel values (e.g., <code>width="300"</code>) or use CSS for more flexible control. Setting only one attribute (width or height) while omitting the other preserves the image\'s aspect ratio automatically.',
    funFact: 'Always specify width and height on your images! Browsers use these to reserve space in the layout before the image loads. Without them, the page "jumps" as images pop in — this is called Cumulative Layout Shift (CLS), a real metric Google uses to score websites.',
    relatedConcepts: [
      { title: 'width attribute', desc: 'Sets the horizontal size of an image in pixels.' },
      { title: 'height attribute', desc: 'Sets the vertical size of an image in pixels.' },
      { title: 'Aspect ratio', desc: 'The proportional relationship between width and height. Setting only one preserves it.' },
    ],
    taskTheme: 'Resize your image to fit perfectly inside your page\'s frame! 🔭',
    steps: [
      'Add an <code>&lt;img&gt;</code> tag with a <code>src</code> attribute pointing to an image URL.',
      'Add a <code>width="400"</code> attribute to the tag.',
      'Add a <code>height="300"</code> attribute to the tag.',
      'Try removing <code>height</code> and see how the browser preserves the ratio using only <code>width</code>.',
    ],
    closingLine: 'Perfectly framed — your images are gallery-ready! 🏛️',
    hint: 'Add width and height attributes directly to the <img> tag: <img src="..." width="300" height="200" alt="...">',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Image Size</title>\n  </head>\n  <body>\n    <!-- Add your sized image here -->\n    <img src="https://picsum.photos/800/600" alt="A random photo">\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'alt-text': {
    numberTitle: '12. Add Alt Text',
    mainHeading: 'Add Alt Text',
    introduction: 'What happens when someone can\'t see your image? Maybe their internet is slow, or they use a screen reader. Alt text is your image\'s voice when it can\'t speak for itself. 🗣️',
    conceptExplanation: 'The <code>alt</code> attribute on an <code>&lt;img&gt;</code> tag provides alternative text for an image. Screen readers read it aloud for visually impaired users. If the image fails to load, the alt text is shown in its place. Search engines also use it to understand image content. A good alt description is specific and meaningful.',
    funFact: 'In many countries, websites are legally required to have alt text on images as part of accessibility laws (like the ADA in the USA or the European Accessibility Act). Missing alt text can result in real legal penalties for businesses!',
    relatedConcepts: [
      { title: 'alt attribute', desc: 'Provides a text description of an image for accessibility and fallback display.' },
      { title: 'Accessibility (a11y)', desc: 'The practice of making websites usable for people with disabilities.' },
      { title: 'Decorative images', desc: 'Purely decorative images should use alt="" (empty) to be skipped by screen readers.' },
    ],
    taskTheme: 'Give every image a voice by adding meaningful alt text! ♿',
    steps: [
      'Add an <code>&lt;img&gt;</code> tag to your page with a <code>src</code> attribute.',
      'Add an <code>alt</code> attribute with a meaningful description, e.g., <code>alt="A golden sunset over the ocean"</code>.',
      'Try breaking the image URL on purpose to see the alt text appear as a fallback.',
      'For a purely decorative image, use an empty alt: <code>alt=""</code>.',
    ],
    closingLine: 'Your images now speak to everyone — accessibility champion! 🏆',
    hint: 'Add alt="description" to every <img> tag. Describe what the image shows, not what it looks like (e.g., alt="A dog playing fetch" not alt="image123.jpg").',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Alt Text</title>\n  </head>\n  <body>\n    <!-- Add an image with descriptive alt text -->\n    <img src="https://picsum.photos/400/300">\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'unordered-list': {
    numberTitle: '13. Unordered List',
    mainHeading: 'Unordered List',
    introduction: 'Grocery lists. Feature lists. To-do lists. The web is full of them. HTML\'s unordered list is the perfect tool when the order of items doesn\'t matter — just the items themselves. 🛒',
    conceptExplanation: 'The <code>&lt;ul&gt;</code> tag creates an unordered (bulleted) list. Each item inside is wrapped in an <code>&lt;li&gt;</code> (list item) tag. By default, browsers show a bullet point (•) next to each item. The appearance can be changed with CSS.',
    funFact: 'The default bullet style (disc) is just one of several options CSS offers: circle, square, or even none. You can also use custom images as bullet points using the list-style-image CSS property!',
    relatedConcepts: [
      { title: '<ul>', desc: 'The unordered list container. Items inside have no implied numerical order.' },
      { title: '<li>', desc: 'List item tag. Goes inside <ul> or <ol>. Each <li> creates one bullet or number.' },
      { title: 'list-style-type', desc: 'A CSS property to control the shape of the bullet: disc, circle, square, or none.' },
    ],
    taskTheme: 'Create a bulleted list of your favourite things! ⭐',
    steps: [
      'Add a <code>&lt;ul&gt;</code> tag inside the <code>&lt;body&gt;</code>.',
      'Inside the <code>&lt;ul&gt;</code>, add at least three <code>&lt;li&gt;</code> tags.',
      'Type one item per <code>&lt;li&gt;</code> — your favourite foods, hobbies, or anything you like!',
      'Preview the result and see the bullet points appear automatically.',
    ],
    closingLine: 'A bullet-proof list! You\'re making great progress. 🎯',
    hint: 'Wrap your list in <ul>...</ul> and each item in <li>...</li>. The bullets are added automatically by the browser.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Unordered List</title>\n  </head>\n  <body>\n    <h2>My Favourite Things</h2>\n    <!-- Add your unordered list here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'ordered-list': {
    numberTitle: '14. Ordered List',
    mainHeading: 'Ordered List',
    introduction: 'Step 1: Open the fridge. Step 2: Find the cheese. Step 3: Make the perfect sandwich. Some things *have* to be in order — and HTML has a tag exactly for that! 🥪',
    conceptExplanation: 'The <code>&lt;ol&gt;</code> tag creates an ordered (numbered) list. Like <code>&lt;ul&gt;</code>, it uses <code>&lt;li&gt;</code> tags for each item. Browsers automatically number the items starting from 1. You can change the starting number with the <code>start</code> attribute, or the type (letters, Roman numerals) with the <code>type</code> attribute.',
    funFact: 'You can reverse an ordered list using the "reversed" attribute: <ol reversed>. The numbers will count down from the total number of items to 1. Great for Top-10 countdown lists!',
    relatedConcepts: [
      { title: '<ol>', desc: 'Ordered list container. Items are numbered automatically starting from 1.' },
      { title: 'start attribute', desc: 'Lets you set the starting number. E.g., start="5" begins numbering at 5.' },
      { title: 'type attribute', desc: 'Changes the counter style: "A" for uppercase letters, "i" for Roman numerals.' },
    ],
    taskTheme: 'Write a numbered recipe or how-to guide using an ordered list! 📋',
    steps: [
      'Add an <code>&lt;ol&gt;</code> tag inside the <code>&lt;body&gt;</code>.',
      'Add at least four <code>&lt;li&gt;</code> items inside the <code>&lt;ol&gt;</code>.',
      'Write out steps for making something — a snack, getting ready for school, anything!',
      'Try adding <code>type="A"</code> to the <code>&lt;ol&gt;</code> tag to use letters instead of numbers.',
    ],
    closingLine: 'Step by step, you\'re building something great! 🚀',
    hint: 'Replace <ul> with <ol> for numbered lists. Each <li> still holds one item. Add start="5" to begin numbering at 5.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Ordered List</title>\n  </head>\n  <body>\n    <h2>How to Make a Sandwich</h2>\n    <!-- Add your ordered list here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'nested-list': {
    numberTitle: '15. Nested List',
    mainHeading: 'Nested List',
    introduction: 'What if your shopping list had subcategories — fruits, vegetables, dairy? Welcome to the world of nested lists, where lists live inside other lists. It\'s lists all the way down! 🪆',
    conceptExplanation: 'You can nest a <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code> inside an <code>&lt;li&gt;</code> element to create sub-items. Browsers visually indent nested lists and change the bullet style automatically. You can nest lists as deeply as you need, mixing <code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code> types.',
    funFact: 'HTML has no official limit on how deeply you can nest lists — but browsers start having trouble beyond about 20 levels deep. No real webpage should ever need more than 3–4 levels of nesting!',
    relatedConcepts: [
      { title: 'Nesting', desc: 'Placing one HTML element inside another. The inner element is the "child", the outer is the "parent".' },
      { title: 'Indentation', desc: 'Browsers automatically indent nested lists to show the hierarchy visually.' },
      { title: 'Mixed lists', desc: 'You can put a <ol> inside a <ul> or vice versa to mix numbered and bulleted sub-lists.' },
    ],
    taskTheme: 'Create a shopping list with categories and items nested underneath! 🛍️',
    steps: [
      'Create a <code>&lt;ul&gt;</code> with two or three main category items using <code>&lt;li&gt;</code>.',
      'Inside one of the <code>&lt;li&gt;</code> elements, add another <code>&lt;ul&gt;</code>.',
      'Put two or three sub-items inside the nested <code>&lt;ul&gt;</code>.',
      'Try using an <code>&lt;ol&gt;</code> for one of the nested lists to mix styles.',
    ],
    closingLine: 'Layers within layers — you\'ve mastered the art of nesting! 🏅',
    hint: 'Put a new <ul> or <ol> inside an <li> to create a nested sub-list. Make sure to close all your tags correctly!',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Nested List</title>\n  </head>\n  <body>\n    <h2>Shopping List</h2>\n    <ul>\n      <li>Fruits\n        <!-- Nest a sub-list here -->\n      </li>\n      <li>Vegetables</li>\n    </ul>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'basic-div': {
    numberTitle: '16. Basic &lt;div&gt;',
    mainHeading: 'Basic <div>',
    introduction: 'Imagine you\'re designing a room — you need walls to separate spaces. In HTML, the <code>&lt;div&gt;</code> is your wall. It groups and contains other elements, letting you organise and style sections of your page. 🏗️',
    conceptExplanation: 'The <code>&lt;div&gt;</code> element is a block-level container with no visual appearance by default. It\'s used to group elements together so they can be styled with CSS or manipulated with JavaScript as a unit. Divs are the workhorses of page layout.',
    funFact: 'In the early 2000s, websites were built entirely using HTML tables for layout. The shift to using <div> elements and CSS was called "CSS Zen Garden" and completely revolutionised web design. Today, semantic HTML5 elements like <section> and <article> are preferred over bare divs!',
    relatedConcepts: [
      { title: '<div>', desc: 'A generic block-level container with no semantic meaning. Used purely for grouping and layout.' },
      { title: 'Block-level', desc: 'A <div> takes up the full available width and starts on a new line.' },
      { title: 'class attribute', desc: 'Used to label divs so CSS can target them. E.g., class="card" or class="header".' },
    ],
    taskTheme: 'Build the walls of your page by grouping content into div containers! 🧱',
    steps: [
      'Add a <code>&lt;div&gt;</code> tag inside the body and put a heading and paragraph inside it.',
      'Add a <code>class="card"</code> attribute to the <code>&lt;div&gt;</code>.',
      'In the CSS tab, add a style for <code>.card</code> with a <code>border</code> and <code>padding</code>.',
      'Add a second <code>&lt;div&gt;</code> with different content and see how divs stack.',
    ],
    closingLine: 'Your content is grouped and glowing! The power of divs is yours. ⚡',
    hint: 'A <div> by itself is invisible. Give it a class and add CSS to see it. Try: .card { border: 1px solid black; padding: 16px; }',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Basic Div</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <!-- Add your div containers here -->\n  </body>\n</html>\n',
      css: '/* Style your divs here */\n',
    },
    language: 'html',
  },

  'basic-span': {
    numberTitle: '17. Basic &lt;span&gt;',
    mainHeading: 'Basic <span>',
    introduction: 'What if you only wanted to highlight a single word inside a paragraph — not the whole thing? Meet <code>&lt;span&gt;</code>, the precision tool that targets exactly the text you need. 🎯',
    conceptExplanation: 'The <code>&lt;span&gt;</code> element is an inline container, meaning it doesn\'t break onto a new line. It\'s used to wrap a specific part of text or an inline element for styling or scripting purposes. Like <code>&lt;div&gt;</code>, it has no visual default appearance.',
    funFact: 'The key difference between <div> and <span> is their display type. <div> is block (takes full width, starts new line), <span> is inline (flows with text). Putting a <div> inside a <span> is invalid HTML!',
    relatedConcepts: [
      { title: '<span>', desc: 'An inline container that wraps text or elements without affecting layout.' },
      { title: 'Inline element', desc: 'Flows with surrounding text. Does not force a line break before or after.' },
      { title: 'Targeted styling', desc: 'Wrap a single word or phrase in a <span> to apply specific CSS color, font, etc.' },
    ],
    taskTheme: 'Highlight a single word in a paragraph with a splash of colour using <code>&lt;span&gt;</code>! 🌈',
    steps: [
      'Write a sentence inside a <code>&lt;p&gt;</code> tag.',
      'Wrap one keyword in a <code>&lt;span&gt;</code> tag and give it a <code>class="highlight"</code>.',
      'In the CSS tab, add <code>.highlight { color: orange; font-weight: bold; }</code>.',
      'Notice that only the word inside <code>&lt;span&gt;</code> changes — the rest of the paragraph stays the same.',
    ],
    closingLine: 'Pinpoint precision styling — you\'ve got the span down! ✅',
    hint: 'Wrap part of your text in <span class="highlight">word</span> and then add CSS: .highlight { color: red; }',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Basic Span</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <p>The night sky was filled with <span>a thousand stars</span>.</p>\n  </body>\n</html>\n',
      css: '/* Target your span here */\n',
    },
    language: 'html',
  },

  'grouping-elements': {
    numberTitle: '18. Grouping Elements',
    mainHeading: 'Grouping Elements',
    introduction: 'A well-organized page is like a well-organised city — distinct neighbourhoods, each with a clear purpose. HTML5 gives us semantic grouping elements that make our code readable *and* meaningful. 🗺️',
    conceptExplanation: 'Beyond <code>&lt;div&gt;</code>, HTML5 introduced semantic elements that describe the *purpose* of their content: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;article&gt;</code>. Using these instead of generic divs helps search engines understand your page structure and improves accessibility for screen readers.',
    funFact: 'Semantic HTML is a significant ranking signal for Google. Pages that use proper structural elements like <main> and <article> tend to rank better in search results than those using only generic <div> tags for everything!',
    relatedConcepts: [
      { title: '<header>', desc: 'Wraps the top section of a page or article — typically contains nav and logo.' },
      { title: '<main>', desc: 'Contains the primary, unique content of the page. There should only be one per page.' },
      { title: '<footer>', desc: 'Wraps the bottom section, typically holding contact info, links, and copyright.' },
      { title: '<section>', desc: 'Groups thematically related content, usually with its own heading.' },
    ],
    taskTheme: 'Divide your page into semantic neighbourhoods using HTML5 structural elements! 🏙️',
    steps: [
      'Add a <code>&lt;header&gt;</code> containing an <code>&lt;h1&gt;</code> with a site name.',
      'Below the header, add a <code>&lt;main&gt;</code> element.',
      'Inside <code>&lt;main&gt;</code>, add two <code>&lt;section&gt;</code> elements with headings and content.',
      'At the bottom, add a <code>&lt;footer&gt;</code> with a copyright notice.',
    ],
    closingLine: 'Your page is now a semantic city with perfectly zoned neighbourhoods! 🌆',
    hint: 'Use <header>, <main>, <section>, and <footer> instead of plain <div> tags when the role of the content is clear.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Grouping Elements</title>\n  </head>\n  <body>\n    <!-- Build your semantic page structure here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'table-structure': {
    numberTitle: '19. Table Structure',
    mainHeading: 'Table Structure',
    introduction: 'Data. Rows. Columns. Tables are the spreadsheets of the web — perfect for displaying structured, comparative information. Let\'s build one from scratch! 📊',
    conceptExplanation: 'An HTML table is built from three core elements: <code>&lt;table&gt;</code> (the container), <code>&lt;tr&gt;</code> (table row), and <code>&lt;td&gt;</code> (table data / cell). These work together to create a grid of information. You can also use <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> to semantically separate header rows from data rows.',
    funFact: 'Before CSS was widely adopted in the early 2000s, web developers used HTML tables to control the visual layout of entire websites — sidebars, columns, navigation. It was a horrible hack but it was the only tool available!',
    relatedConcepts: [
      { title: '<table>', desc: 'The container for the entire table structure.' },
      { title: '<tr>', desc: 'Table Row — creates one horizontal row in the table.' },
      { title: '<td>', desc: 'Table Data — creates one cell inside a row.' },
      { title: '<thead> / <tbody>', desc: 'Semantic wrappers to separate header rows from data rows.' },
    ],
    taskTheme: 'Build a data table from the ground up, cell by cell! 🧮',
    steps: [
      'Add a <code>&lt;table&gt;</code> tag inside the <code>&lt;body&gt;</code>.',
      'Add a <code>&lt;thead&gt;</code> section with one <code>&lt;tr&gt;</code> inside it.',
      'Add a <code>&lt;tbody&gt;</code> section with two <code>&lt;tr&gt;</code> rows.',
      'Put two <code>&lt;td&gt;</code> cells inside each <code>&lt;tbody&gt;</code> row with sample data.',
    ],
    closingLine: 'Your data is organised and clear — a masterpiece of structure! 🗃️',
    hint: 'Build tables like this: <table><tr><td>Cell</td></tr></table>. Use border="1" on the <table> tag to see the grid while building.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Table Structure</title>\n  </head>\n  <body>\n    <!-- Build your table here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'add-rows': {
    numberTitle: '20. Add Rows',
    mainHeading: 'Add Rows',
    introduction: 'A table with one row is just a heading. Real tables have data — row after row of it. Let\'s learn how to expand a table and pack it full of useful information! 📈',
    conceptExplanation: 'Adding more rows to a table is simply a matter of adding more <code>&lt;tr&gt;</code> elements inside the <code>&lt;tbody&gt;</code>. Each row should have the same number of <code>&lt;td&gt;</code> cells to keep the table aligned. If a row needs to span multiple columns, you can use the <code>colspan</code> attribute.',
    funFact: 'The colspan and rowspan attributes let a single cell span multiple columns or rows — just like merging cells in Excel! This is useful for summary rows or complex table headers.',
    relatedConcepts: [
      { title: '<tr>', desc: 'Each additional <tr> you add creates another horizontal row of data.' },
      { title: 'colspan', desc: 'Makes a cell span across multiple columns. E.g., colspan="2" spans two columns.' },
      { title: 'rowspan', desc: 'Makes a cell span across multiple rows. Useful for category labels on the left side.' },
    ],
    taskTheme: 'Expand your table with more rows of data and fill it with meaning! 🗂️',
    steps: [
      'Start with a basic table that already has a header row and one data row.',
      'Add three more <code>&lt;tr&gt;</code> rows inside the <code>&lt;tbody&gt;</code>.',
      'Make sure each row has the same number of <code>&lt;td&gt;</code> cells as the header.',
      'Add a final <code>&lt;tr&gt;</code> with a <code>&lt;td colspan="2"&gt;Total&lt;/td&gt;</code> spanning across.',
    ],
    closingLine: 'Row by row, your table is growing into a data powerhouse! 💪',
    hint: 'Add more <tr> elements inside <tbody> to add rows. Each <tr> should have the same number of <td> elements.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Add Rows</title>\n  </head>\n  <body>\n    <table border="1">\n      <thead>\n        <tr>\n          <td>Name</td>\n          <td>Score</td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Alice</td>\n          <td>95</td>\n        </tr>\n        <!-- Add more rows here -->\n      </tbody>\n    </table>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'add-headers': {
    numberTitle: '21. Add Headers',
    mainHeading: 'Add Headers',
    introduction: 'A table without headers is like a spreadsheet with no column names — completely confusing. The <code>&lt;th&gt;</code> element transforms a plain cell into a bold, semantic table header. Let\'s label your data! 🏷️',
    conceptExplanation: 'The <code>&lt;th&gt;</code> (table header) element works just like <code>&lt;td&gt;</code> but carries extra meaning: it labels a column or row. By default, browsers bold and centre the text inside <code>&lt;th&gt;</code>. Using the <code>scope</code> attribute (<code>scope="col"</code> or <code>scope="row"</code>) further improves accessibility for screen readers.',
    funFact: 'The <th> element makes tables accessible to screen reader users. A screen reader can announce "Score: 95" instead of just "95" because it knows from the <th> that the column is called "Score". Without <th>, blind users get a confusing grid of numbers.',
    relatedConcepts: [
      { title: '<th>', desc: 'Table Header cell — bold and centred by default. Provides semantic labelling.' },
      { title: 'scope attribute', desc: 'Tells screen readers whether a <th> is a header for a column (col) or a row (row).' },
      { title: '<thead> vs <tbody>', desc: 'Semantic groupings. Header rows in <thead> are visually and semantically distinct.' },
    ],
    taskTheme: 'Replace plain cells with proper header cells to make your table crystal clear! 🔍',
    steps: [
      'In the <code>&lt;thead&gt;</code> row, replace each <code>&lt;td&gt;</code> with a <code>&lt;th&gt;</code> tag.',
      'Add <code>scope="col"</code> to each <code>&lt;th&gt;</code>: <code>&lt;th scope="col"&gt;Name&lt;/th&gt;</code>.',
      'Notice how the header text is now bold and centred automatically.',
      'Optionally, add a <code>&lt;th scope="row"&gt;</code> as the first cell in each data row to label it.',
    ],
    closingLine: 'Crystal-clear columns — your table is now a beacon of clarity! 💡',
    hint: 'Use <th> instead of <td> for header cells. Add scope="col" for column headers: <th scope="col">Name</th>',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Add Headers</title>\n  </head>\n  <body>\n    <table border="1">\n      <thead>\n        <tr>\n          <!-- Change these td tags to th tags -->\n          <td>Product</td>\n          <td>Price</td>\n          <td>Stock</td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Apple</td>\n          <td>$1.00</td>\n          <td>50</td>\n        </tr>\n        <tr>\n          <td>Banana</td>\n          <td>$0.50</td>\n          <td>120</td>\n        </tr>\n      </tbody>\n    </table>\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'input-field': {
    numberTitle: '22. Input Field',
    mainHeading: 'Input Field',
    introduction: 'So far, your pages have talked *to* the user. It\'s time to let the user talk *back*. Input fields are the bridge between the visitor and your page — let\'s open up the conversation! 💬',
    conceptExplanation: 'The <code>&lt;input&gt;</code> tag is a self-closing element that creates an interactive field where users can type or select data. The <code>type</code> attribute controls what kind of input it creates: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>checkbox</code>, and many more. The <code>placeholder</code> attribute shows hint text inside the field.',
    funFact: 'HTML5 added over 13 new input types in 2014, including date, color, range, and tel. Before HTML5, developers had to build these controls from scratch using JavaScript — a process that took hours. Now it\'s one attribute!',
    relatedConcepts: [
      { title: '<input>', desc: 'A self-closing tag that creates an interactive field. Type determines the kind of input.' },
      { title: 'type attribute', desc: 'Controls the input kind: text, email, password, number, checkbox, radio, etc.' },
      { title: 'placeholder', desc: 'Grey hint text shown inside the field before the user types anything.' },
      { title: 'name attribute', desc: 'The identifier sent to the server when the form is submitted.' },
    ],
    taskTheme: 'Create a text input field that invites users to enter their name! 👋',
    steps: [
      'Add an <code>&lt;input&gt;</code> tag with <code>type="text"</code>.',
      'Add a <code>placeholder="Enter your name"</code> attribute to show hint text.',
      'Add a <code>name="username"</code> attribute to identify the field.',
      'Try changing the type to <code>email</code> or <code>password</code> to see how the browser responds differently.',
    ],
    closingLine: 'The conversation is open! Your users now have a voice. 🎤',
    hint: 'Use <input type="text" placeholder="Type here..." name="field"> — the input tag is self-closing, no closing tag needed.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Input Field</title>\n  </head>\n  <body>\n    <h2>Tell us about yourself</h2>\n    <!-- Add your input field here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'labels': {
    numberTitle: '23. Labels',
    mainHeading: 'Labels',
    introduction: 'An input field alone is like a mystery box — what goes inside? Labels are the friendly signs that tell users exactly what each field expects. They\'re also crucial for accessibility. 🏷️',
    conceptExplanation: 'The <code>&lt;label&gt;</code> element provides a visible, clickable caption for an input field. The magic happens when you connect them: set the <code>for</code> attribute on the label to match the <code>id</code> attribute on the input. Now clicking the label text also focuses the input — a small UX improvement that makes a huge accessibility difference.',
    funFact: 'Properly labelled form fields are a legal requirement under accessibility laws in many jurisdictions. Screen readers announce the label text when a user focuses on an input. Without labels, blind users have no idea what a field is for!',
    relatedConcepts: [
      { title: '<label>', desc: 'A clickable text caption associated with a specific input field.' },
      { title: 'for attribute', desc: 'On a <label>, this must match the id of its associated <input>.' },
      { title: 'id attribute', desc: 'On an <input>, this unique identifier links the field to its label.' },
    ],
    taskTheme: 'Label every field in your form so users always know what to type! ✍️',
    steps: [
      'Add an <code>&lt;input type="text" id="username"&gt;</code> tag.',
      'Above it, add a <code>&lt;label for="username"&gt;Your Name:&lt;/label&gt;</code>.',
      'Click the label text — notice the input field gets focused automatically!',
      'Add a second field with <code>id="email"</code> and a matching label with <code>for="email"</code>.',
    ],
    closingLine: 'Labelled and linked — your form is now a model of clarity! 📌',
    hint: 'Match the label\'s for attribute to the input\'s id: <label for="email">Email:</label> <input id="email" type="email">',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Labels</title>\n  </head>\n  <body>\n    <h2>Sign Up</h2>\n    <!-- Add labels and inputs here -->\n  </body>\n</html>\n',
    },
    language: 'html',
  },

  'submit-button': {
    numberTitle: '24. Submit Button',
    mainHeading: 'Submit Button',
    introduction: 'Every form needs a grand finale — the moment the user says "I\'m done, send it!" The submit button is that moment. It\'s the rocket launch button of your form. 🚀',
    conceptExplanation: 'A submit button is created using <code>&lt;input type="submit"&gt;</code> or the more flexible <code>&lt;button type="submit"&gt;</code> element. When clicked inside a <code>&lt;form&gt;</code>, it sends all the form data to the server. The <code>value</code> attribute on an input submit, or the text content of a <code>&lt;button&gt;</code>, sets the button\'s label.',
    funFact: 'The very first web form was created by Tim Berners-Lee in 1993. Before submit buttons existed, there was no way to send data back to a server from a webpage — the web was read-only! Forms and submit buttons transformed the web from a library into an interactive platform.',
    relatedConcepts: [
      { title: '<button type="submit">', desc: 'A flexible button element. You can put text and HTML inside it.' },
      { title: '<input type="submit">', desc: 'A simpler self-closing submit button. The value attribute sets its label.' },
      { title: '<form>', desc: 'The container for all form elements. The action attribute defines where data is sent.' },
    ],
    taskTheme: 'Complete your form with a submit button and launch it into the world! 🛸',
    steps: [
      'Wrap your inputs in a <code>&lt;form&gt;</code> tag with an <code>action="#"</code> attribute.',
      'At the bottom of the form, add a <code>&lt;button type="submit"&gt;Send&lt;/button&gt;</code>.',
      'Try clicking the button — notice the page reloads (because there\'s no real server yet).',
      'Alternatively, try <code>&lt;input type="submit" value="Sign Me Up!"&gt;</code> and compare.',
    ],
    closingLine: 'Mission control, we have lift-off! Your form is complete and ready to launch! 🌟',
    hint: 'Wrap your form in <form action="#"> and add <button type="submit">Send</button> at the end.',
    defaultFiles: {
      html: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Submit Button</title>\n  </head>\n  <body>\n    <h2>Contact Us</h2>\n    <form action="#">\n      <label for="name">Name:</label>\n      <input type="text" id="name" name="name" placeholder="Your name">\n      <br><br>\n      <label for="email">Email:</label>\n      <input type="email" id="email" name="email" placeholder="your@email.com">\n      <br><br>\n      <!-- Add your submit button here -->\n    </form>\n  </body>\n</html>\n',
    },
    language: 'html',
  },
};

export default htmlExercises;
