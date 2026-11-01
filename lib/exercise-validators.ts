// DOM & Console Assertion Engine for Code-adventure exercises

export interface ValidationContext {
  doc: Document | null;
  logs: Array<{ type: string; message: string }>;
  files: {
    html: string;
    css: string;
    js: string;
  };
  iframeWindow?: any;
}

export interface ValidationTest {
  id: string;
  description: string;
  test: (ctx: ValidationContext) => boolean | string;
}

export interface TestResult {
  id: string;
  description: string;
  passed: boolean;
  message?: string;
}

// ─────────────────────────────────────────────────────────────
// Helper assertion utilities
// ─────────────────────────────────────────────────────────────

function textClean(text: string | null | undefined): string {
  return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function hasTag(doc: Document | null, selector: string): boolean {
  if (!doc) return false;
  try {
    return doc.querySelector(selector) !== null;
  } catch {
    return false;
  }
}

function getTagText(doc: Document | null, selector: string): string {
  if (!doc) return '';
  try {
    const el = doc.querySelector(selector);
    return el?.textContent || '';
  } catch {
    return '';
  }
}

function hasTagWithText(doc: Document | null, selector: string, textSubstring: string): boolean {
  const text = textClean(getTagText(doc, selector));
  return text.includes(textSubstring.toLowerCase());
}

function hasConsoleLog(logs: Array<{ type: string; message: string }>, pattern?: RegExp | string): boolean {
  if (!pattern) return logs.some(l => l.type === 'log');
  return logs.some(l => {
    if (pattern instanceof RegExp) {
      return pattern.test(l.message);
    }
    return l.message.toLowerCase().includes(pattern.toLowerCase());
  });
}

function hasNoError(logs: Array<{ type: string; message: string }>): boolean {
  return !logs.some(l => l.type === 'error');
}

// ─────────────────────────────────────────────────────────────
// Exercise Tests Registry
// ─────────────────────────────────────────────────────────────

export const EXERCISE_TESTS: Record<string, ValidationTest[]> = {
  // Practice Page Inline HTML Exercises
  'hello-world': [
    {
      id: 'date-heading',
      description: 'Fill in the <h2> heading with today\'s date',
      test: ({ doc }) => {
        const text = textClean(getTagText(doc, 'h2'));
        if (!text) return 'Missing <h2> heading tag.';
        if (text === 'write the date') return 'Replace the placeholder "Write the date" with your actual date.';
        return true;
      }
    },
    {
      id: 'wish-paragraph',
      description: 'Fill in the <p> paragraph with your coding wish',
      test: ({ doc }) => {
        const text = textClean(getTagText(doc, 'p'));
        if (!text) return 'Missing <p> paragraph tag.';
        if (text === 'write your wish') return 'Replace the placeholder "Write your wish" with your wish.';
        return true;
      }
    }
  ],

  'basic-structure': [
    {
      id: 'html-skeleton',
      description: 'Page has <html>, <head>, and <body> structural tags',
      test: ({ doc }) => {
        if (!hasTag(doc, 'html')) return 'Missing <html> tag wrapping the document.';
        if (!hasTag(doc, 'head')) return 'Missing <head> section.';
        if (!hasTag(doc, 'body')) return 'Missing <body> section.';
        return true;
      }
    },
    {
      id: 'title-inside-head',
      description: 'Page has a <title> tag inside <head> with "My Digital Home"',
      test: ({ doc }) => {
        if (!hasTag(doc, 'head title')) return 'Add a <title> tag inside your <head> section.';
        const text = textClean(getTagText(doc, 'head title'));
        if (!text) return 'Your <title> tag is empty. Add a page name.';
        return true;
      }
    }
  ],

  'headings': [
    {
      id: 'h1-headline',
      description: 'Create an <h1> with "ALIENS LAND ON MARS"',
      test: ({ doc }) => {
        if (!hasTag(doc, 'h1')) return 'Missing <h1> tag.';
        if (!hasTagWithText(doc, 'h1', 'aliens land on mars')) {
          return 'The <h1> must contain the text "ALIENS LAND ON MARS".';
        }
        return true;
      }
    },
    {
      id: 'h2-subheading',
      description: 'Create an <h2> with "Local rovers confused"',
      test: ({ doc }) => {
        if (!hasTag(doc, 'h2')) return 'Missing <h2> tag.';
        if (!hasTagWithText(doc, 'h2', 'local rovers confused')) {
          return 'The <h2> must contain the text "Local rovers confused".';
        }
        return true;
      }
    },
    {
      id: 'h3-author',
      description: 'Create an <h3> with "Written by: You"',
      test: ({ doc }) => {
        if (!hasTag(doc, 'h3')) return 'Missing <h3> tag.';
        if (!hasTagWithText(doc, 'h3', 'written by')) {
          return 'The <h3> must contain "Written by: You" (or your name).';
        }
        return true;
      }
    }
  ],

  'basic-link': [
    {
      id: 'link-tag',
      description: 'Create an <a> tag pointing to "https://www.google.com"',
      test: ({ doc }) => {
        const link = doc?.querySelector('a');
        if (!link) return 'Missing <a> anchor link tag.';
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (!href.includes('google.com')) {
          return 'The href attribute must point to https://www.google.com.';
        }
        return true;
      }
    },
    {
      id: 'link-text',
      description: 'Link has clickable text "Travel to Google"',
      test: ({ doc }) => {
        const link = doc?.querySelector('a');
        const text = textClean(link?.textContent);
        if (!text) return 'The <a> tag has no text inside it.';
        if (!text.includes('google')) {
          return 'The link text should say "Travel to Google".';
        }
        return true;
      }
    }
  ],

  'show-image': [
    {
      id: 'image-src',
      description: 'Has an <img> tag with a valid src attribute',
      test: ({ doc }) => {
        const img = doc?.querySelector('img');
        if (!img) return 'Missing <img> tag.';
        const src = img.getAttribute('src');
        if (!src || src.trim().length === 0) return 'The <img> tag is missing a src attribute.';
        return true;
      }
    },
    {
      id: 'image-alt',
      description: 'Has a non-empty alt attribute describing the image',
      test: ({ doc }) => {
        const img = doc?.querySelector('img');
        if (!img) return 'Missing <img> tag.';
        const alt = img.getAttribute('alt');
        if (!alt || alt.trim().length === 0) return 'Provide a descriptive alt attribute (e.g. alt="A cute dog").';
        return true;
      }
    }
  ],

  // HTML Exercises
  'add-title': [
    {
      id: 'title-tag-exists',
      description: 'The <title> tag is placed inside <head>',
      test: ({ doc }) => {
        if (!hasTag(doc, 'head title')) return 'Put the <title> tag inside the <head> element.';
        return true;
      }
    },
    {
      id: 'title-text-filled',
      description: 'The <title> tag contains a name for your page',
      test: ({ doc }) => {
        const text = textClean(getTagText(doc, 'title'));
        if (!text) return '<title> is empty. Type a title between <title> and </title>.';
        return true;
      }
    }
  ],

  'using-head': [
    {
      id: 'head-present',
      description: 'Document has a <head> element inside <html>',
      test: ({ doc }) => hasTag(doc, 'html > head') || 'Add a <head> tag directly inside <html>.'
    },
    {
      id: 'head-metadata',
      description: '<head> contains metadata elements (such as <title>)',
      test: ({ doc }) => (doc?.querySelector('head')?.children.length || 0) > 0 || 'Place elements like <title> inside <head>.'
    }
  ],

  'using-body': [
    {
      id: 'body-present',
      description: 'Document has a <body> tag inside <html>',
      test: ({ doc }) => hasTag(doc, 'html > body') || 'Add a <body> tag inside <html>.'
    },
    {
      id: 'body-content',
      description: '<body> contains visible elements or text',
      test: ({ doc }) => {
        const body = doc?.querySelector('body');
        if (!body || body.innerHTML.trim().length === 0) return 'Add visible elements inside <body>.';
        return true;
      }
    }
  ],

  'add-meta': [
    {
      id: 'meta-charset',
      description: '<head> includes <meta charset="UTF-8">',
      test: ({ doc, files }) => {
        const meta = doc?.querySelector('meta[charset]');
        if (meta && (meta.getAttribute('charset') || '').toUpperCase() === 'UTF-8') return true;
        if (/charset=["']?utf-8["']?/i.test(files.html)) return true;
        return 'Add <meta charset="UTF-8"> inside the <head> tags.';
      }
    }
  ],

  'paragraphs': [
    {
      id: 'two-paragraphs',
      description: 'Document contains at least two <p> paragraph elements',
      test: ({ doc }) => {
        const ps = doc?.querySelectorAll('p') || [];
        if (ps.length < 2) return `Found ${ps.length} <p> tag(s). Add at least two separate <p> tags.`;
        return true;
      }
    }
  ],

  'bold-italic': [
    {
      id: 'bold-tag',
      description: 'Uses <strong> or <b> to make text bold',
      test: ({ doc }) => hasTag(doc, 'strong, b') || 'Use <strong> or <b> around words you want bold.'
    },
    {
      id: 'italic-tag',
      description: 'Uses <em> or <i> to italicize text',
      test: ({ doc }) => hasTag(doc, 'em, i') || 'Use <em> or <i> around words you want italicized.'
    }
  ],

  'new-tab-link': [
    {
      id: 'target-blank',
      description: 'Link has target="_blank" to open in a new tab',
      test: ({ doc }) => {
        const link = doc?.querySelector('a[target="_blank"]');
        if (!link) return 'Add target="_blank" to your <a> anchor tag.';
        return true;
      }
    }
  ],

  'email-link': [
    {
      id: 'mailto-href',
      description: 'Link uses mailto: in the href attribute',
      test: ({ doc }) => {
        const link = doc?.querySelector('a[href^="mailto:"]');
        if (!link) return 'The <a> href must start with mailto: followed by an email address.';
        return true;
      }
    }
  ],

  'image-size': [
    {
      id: 'img-dimensions',
      description: '<img> has width or height specified',
      test: ({ doc }) => {
        const img = doc?.querySelector('img');
        if (!img) return 'Missing <img> tag.';
        const w = img.getAttribute('width');
        const h = img.getAttribute('height');
        const style = img.getAttribute('style') || '';
        if (w || h || /width|height/.test(style)) return true;
        return 'Specify width or height attribute on the <img> tag (e.g. width="300").';
      }
    }
  ],

  'alt-text': [
    {
      id: 'non-empty-alt',
      description: '<img> tag has a non-empty alt description',
      test: ({ doc }) => {
        const img = doc?.querySelector('img');
        if (!img) return 'Missing <img> tag.';
        const alt = img.getAttribute('alt');
        if (!alt || alt.trim().length === 0) return 'Add a non-empty alt attribute describing the image.';
        return true;
      }
    }
  ],

  'unordered-list': [
    {
      id: 'ul-element',
      description: 'Has a <ul> element containing at least two <li> items',
      test: ({ doc }) => {
        if (!hasTag(doc, 'ul')) return 'Missing <ul> unordered list element.';
        const items = doc?.querySelectorAll('ul > li') || [];
        if (items.length < 2) return `Your <ul> list should contain at least two <li> items. Found ${items.length}.`;
        return true;
      }
    }
  ],

  'ordered-list': [
    {
      id: 'ol-element',
      description: 'Has an <ol> element containing at least two <li> items',
      test: ({ doc }) => {
        if (!hasTag(doc, 'ol')) return 'Missing <ol> ordered list element.';
        const items = doc?.querySelectorAll('ol > li') || [];
        if (items.length < 2) return `Your <ol> list should contain at least two <li> items. Found ${items.length}.`;
        return true;
      }
    }
  ],

  'nested-list': [
    {
      id: 'nested-list-element',
      description: 'Has a list nested inside another list item',
      test: ({ doc }) => {
        const nested = doc?.querySelector('li > ul, li > ol');
        if (!nested) return 'Place a <ul> or <ol> list inside an <li> element.';
        return true;
      }
    }
  ],

  'basic-div': [
    {
      id: 'div-element',
      description: 'Has a <div> container element',
      test: ({ doc }) => hasTag(doc, 'div') || 'Add a <div> element to group content.'
    }
  ],

  'basic-span': [
    {
      id: 'span-element',
      description: 'Has a <span> element for inline styling or grouping',
      test: ({ doc }) => hasTag(doc, 'span') || 'Add a <span> element.'
    }
  ],

  'grouping-elements': [
    {
      id: 'grouping-div',
      description: 'Uses a <div> wrapping multiple child elements',
      test: ({ doc }) => {
        const divs = doc?.querySelectorAll('div') || [];
        for (const d of Array.from(divs)) {
          if (d.children.length >= 2) return true;
        }
        return 'Wrap at least two elements inside a <div>.';
      }
    }
  ],

  'table-structure': [
    {
      id: 'table-element',
      description: 'Has a <table> element',
      test: ({ doc }) => hasTag(doc, 'table') || 'Add a <table> element.'
    }
  ],

  'add-rows': [
    {
      id: 'table-rows',
      description: 'Table contains <tr> rows and <td> cells',
      test: ({ doc }) => {
        if (!hasTag(doc, 'table tr')) return 'Add <tr> rows inside your <table>.';
        if (!hasTag(doc, 'table td')) return 'Add <td> data cells inside your <tr> rows.';
        return true;
      }
    }
  ],

  'add-headers': [
    {
      id: 'table-headers',
      description: 'Table contains <th> header cells',
      test: ({ doc }) => hasTag(doc, 'table th') || 'Add <th> header cells inside your table header row.'
    }
  ],

  'input-field': [
    {
      id: 'input-element',
      description: 'Form includes an <input> element with a type attribute',
      test: ({ doc }) => {
        const input = doc?.querySelector('input');
        if (!input) return 'Missing <input> tag.';
        if (!input.hasAttribute('type')) return 'Specify a type attribute on your <input> tag (e.g. type="text").';
        return true;
      }
    }
  ],

  'labels': [
    {
      id: 'label-element',
      description: 'Form includes a <label> element',
      test: ({ doc }) => hasTag(doc, 'label') || 'Add a <label> element describing your input field.'
    }
  ],

  'submit-button': [
    {
      id: 'submit-btn',
      description: 'Form includes a submit button or <button type="submit">',
      test: ({ doc }) => {
        if (hasTag(doc, 'button[type="submit"]') || hasTag(doc, 'input[type="submit"]') || hasTag(doc, 'button')) {
          return true;
        }
        return 'Add a <button type="submit">Submit</button> or <button> element.';
      }
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // CSS Exercises
  // ─────────────────────────────────────────────────────────────
  'add-css-inline': [
    {
      id: 'inline-style-attr',
      description: 'Add inline style="..." attribute to elements',
      test: ({ doc, files }) => {
        const styled = doc?.querySelectorAll('[style]') || [];
        if (styled.length === 0 && !/style\s*=\s*["']/i.test(files.html)) {
          return 'Add a style="..." attribute directly inside an HTML tag.';
        }
        return true;
      }
    }
  ],

  'add-css-internal': [
    {
      id: 'internal-style-tag',
      description: 'Use a <style> tag inside the HTML <head>',
      test: ({ doc, files }) => {
        if (hasTag(doc, 'head style') || /<style[\s>]/i.test(files.html)) return true;
        return 'Add a <style>...</style> block inside your HTML.';
      }
    }
  ],

  'add-css-external': [
    {
      id: 'external-rules',
      description: 'Add CSS rules into the CSS stylesheet',
      test: ({ files }) => {
        if (files.css.replace(/\/\*[\s\S]*?\*\//g, '').trim().length > 5) return true;
        return 'Write your styles in the CSS tab.';
      }
    }
  ],

  'element-selector': [
    {
      id: 'element-selector-css',
      description: 'Target an HTML element by tag name in CSS',
      test: ({ files }) => {
        const clean = files.css.replace(/\/\*[\s\S]*?\*\//g, '');
        if (/\b(h1|h2|p|div|body|span|ul|li)\s*\{/i.test(clean)) return true;
        return 'Write a rule targeting an element like h1, p, or body in the CSS tab.';
      }
    }
  ],

  'class-selector': [
    {
      id: 'class-selector-usage',
      description: 'Create a .classname selector in CSS and use class="..." in HTML',
      test: ({ files, doc }) => {
        const clean = files.css.replace(/\/\*[\s\S]*?\*\//g, '');
        const hasClassCss = /\.[a-zA-Z0-9_-]+\s*\{/.test(clean);
        const hasClassHtml = doc?.querySelector('[class]') !== null || /class=["'][^"']+["']/.test(files.html);
        if (!hasClassCss) return 'Define a class selector starting with a dot (e.g. .highlight { ... }) in CSS.';
        if (!hasClassHtml) return 'Add class="..." to an element in your HTML tab.';
        return true;
      }
    }
  ],

  'id-selector': [
    {
      id: 'id-selector-usage',
      description: 'Create an #idname selector in CSS and use id="..." in HTML',
      test: ({ files, doc }) => {
        const clean = files.css.replace(/\/\*[\s\S]*?\*\//g, '');
        const hasIdCss = /#[a-zA-Z0-9_-]+\s*\{/.test(clean);
        const hasIdHtml = doc?.querySelector('[id]') !== null || /id=["'][^"']+["']/.test(files.html);
        if (!hasIdCss) return 'Define an ID selector starting with a hash (e.g. #hero { ... }) in CSS.';
        if (!hasIdHtml) return 'Add id="..." to an element in your HTML tab.';
        return true;
      }
    }
  ],

  'text-color': [
    {
      id: 'color-property',
      description: 'Use the CSS color property to change text color',
      test: ({ files }) => {
        const clean = files.css.replace(/\/\*[\s\S]*?\*\//g, '');
        if (/\bcolor\s*:\s*[^;]+;/i.test(clean) || /style="[^"]*color\s*:/i.test(files.html)) return true;
        return 'Apply a color property in your CSS (e.g. color: coral;).';
      }
    }
  ],

  'background-color': [
    {
      id: 'bg-color-property',
      description: 'Use background-color to change element background',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/background(-color)?\s*:\s*[^;]+/i.test(combined)) return true;
        return 'Set background-color in your CSS (e.g. background-color: #1e293b;).';
      }
    }
  ],

  'font-size': [
    {
      id: 'font-size-prop',
      description: 'Set font-size to control typography size',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/font-size\s*:\s*[^;]+/i.test(combined)) return true;
        return 'Add font-size: 24px; (or rem/em) in CSS.';
      }
    }
  ],

  'margin-practice': [
    {
      id: 'margin-prop',
      description: 'Apply margin to add outer spacing',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/margin(-top|-bottom|-left|-right)?\s*:\s*[^;]+/i.test(combined)) return true;
        return 'Add margin in CSS (e.g. margin: 20px;).';
      }
    }
  ],

  'padding-practice': [
    {
      id: 'padding-prop',
      description: 'Apply padding to add inner spacing',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/padding(-top|-bottom|-left|-right)?\s*:\s*[^;]+/i.test(combined)) return true;
        return 'Add padding in CSS (e.g. padding: 16px;).';
      }
    }
  ],

  'border-practice': [
    {
      id: 'border-prop',
      description: 'Apply border styling to element(s)',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/border(-[a-z]+)?\s*:\s*[^;]+/i.test(combined)) return true;
        return 'Add border in CSS (e.g. border: 2px solid #fff;).';
      }
    }
  ],

  'center-flex': [
    {
      id: 'flex-centering',
      description: 'Use display: flex with justify-content or align-items to center',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (!/display\s*:\s*flex/i.test(combined)) return 'Set display: flex; on the container.';
        if (!/(justify-content|align-items)\s*:\s*center/i.test(combined)) {
          return 'Add justify-content: center; and/or align-items: center;.';
        }
        return true;
      }
    }
  ],

  'space-between': [
    {
      id: 'space-between-prop',
      description: 'Use justify-content: space-between on a flex container',
      test: ({ files }) => {
        const combined = files.css + files.html;
        if (/justify-content\s*:\s*space-between/i.test(combined)) return true;
        return 'Add justify-content: space-between; in your CSS flex rules.';
      }
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // JavaScript Exercises
  // ─────────────────────────────────────────────────────────────
  'first-script': [
    {
      id: 'js-code-exists',
      description: 'Write JavaScript code in the script file',
      test: ({ files, logs }) => {
        if (!hasNoError(logs)) return 'Fix JavaScript errors in the console.';
        const clean = files.js.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
        if (clean.length === 0) return 'Write your JavaScript code in the editor.';
        return true;
      }
    }
  ],

  'console-log': [
    {
      id: 'console-log-executed',
      description: 'Use console.log to print output to the console',
      test: ({ logs, files }) => {
        if (!/console\.log\s*\(/i.test(files.js)) {
          return 'Use console.log(...) to print a message.';
        }
        if (logs.length === 0) {
          return 'Run your code to see console.log output.';
        }
        return true;
      }
    }
  ],

  'declare-variables': [
    {
      id: 'variable-declaration',
      description: 'Declare a variable using let or const',
      test: ({ files }) => {
        if (/\b(let|const|var)\s+[a-zA-Z_$][0-9a-zA-Z_$]*\s*=/i.test(files.js)) return true;
        return 'Declare a variable with let or const (e.g. let score = 100;).';
      }
    }
  ],

  'reassign-values': [
    {
      id: 'variable-reassignment',
      description: 'Reassign a new value to a declared let variable',
      test: ({ files }) => {
        const matches = files.js.match(/[a-zA-Z_$][0-9a-zA-Z_$]*\s*=\s*[^=]/g) || [];
        if (matches.length >= 2 || /\b(let|var)\s+\w+[\s\S]*?\b\w+\s*=\s*/.test(files.js)) return true;
        return 'Reassign your variable to a new value (e.g. score = 200;).';
      }
    }
  ],

  'math-operators': [
    {
      id: 'math-operators-used',
      description: 'Use arithmetic operators (+, -, *, /) in JavaScript',
      test: ({ files }) => {
        if (/[\+\-\*\/%]\s*[0-9a-zA-Z_\$]/i.test(files.js)) return true;
        return 'Perform a math calculation using +, -, *, or /.';
      }
    }
  ],

  'create-function': [
    {
      id: 'function-defined',
      description: 'Define a function using function keyword or arrow syntax',
      test: ({ files }) => {
        if (/\bfunction\s+[a-zA-Z_$]|\b(const|let)\s+[a-zA-Z_$]+\s*=\s*(\([^\)]*\)|[a-zA-Z_$]+)\s*=>/i.test(files.js)) {
          return true;
        }
        return 'Define a function (e.g. function greet() { ... }).';
      }
    }
  ],

  'return-values': [
    {
      id: 'function-return',
      description: 'Function uses return to send back a value',
      test: ({ files }) => {
        if (/\breturn\b\s+[^;]+/i.test(files.js)) return true;
        return 'Use return inside your function to return a value.';
      }
    }
  ],

  'create-array': [
    {
      id: 'array-declaration',
      description: 'Create an array using square brackets [ ... ]',
      test: ({ files }) => {
        if (/\[\s*[^\]]+\s*\]/.test(files.js)) return true;
        return 'Create an array with values (e.g. const items = ["item1", "item2"];).';
      }
    }
  ],

  'create-object': [
    {
      id: 'object-declaration',
      description: 'Create an object using curly braces { ... }',
      test: ({ files }) => {
        if (/\{\s*[a-zA-Z0-9_$]+\s*:\s*[^}]+\}/.test(files.js)) return true;
        return 'Create an object with properties (e.g. const hero = { name: "Knight", level: 1 };).';
      }
    }
  ],

  'if-condition': [
    {
      id: 'if-statement',
      description: 'Write an if statement to test a condition',
      test: ({ files }) => {
        if (/\bif\s*\([^\)]+\)/i.test(files.js)) return true;
        return 'Add an if (...) statement in your script.';
      }
    }
  ],

  'for-loop': [
    {
      id: 'for-loop-statement',
      description: 'Write a for loop to repeat code',
      test: ({ files }) => {
        if (/\bfor\s*\([^\)]+\)/i.test(files.js)) return true;
        return 'Write a for loop (e.g. for (let i = 0; i < 5; i++) { ... }).';
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────
// Smart Fallback Tests for any exercise without custom suite
// ─────────────────────────────────────────────────────────────

export function getFallbackTests(language: 'html' | 'css' | 'js'): ValidationTest[] {
  return [
    {
      id: 'code-modified',
      description: 'Write solution code in the editor',
      test: ({ files }) => {
        const content = language === 'html' ? files.html : language === 'css' ? files.css : files.js;
        const clean = content.replace(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|\/\/.*/g, '').trim();
        if (clean.length < 5) return 'Write your solution in the code editor.';
        return true;
      }
    },
    {
      id: 'no-runtime-errors',
      description: 'Code executes without syntax or runtime errors',
      test: ({ logs }) => {
        const error = logs.find(l => l.type === 'error');
        if (error) return `Error in code: ${error.message}`;
        return true;
      }
    }
  ];
}

// ─────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────

export function runValidation(
  exerciseSlug: string,
  language: 'html' | 'css' | 'js',
  ctx: ValidationContext
): TestResult[] {
  const tests = EXERCISE_TESTS[exerciseSlug] || getFallbackTests(language);

  return tests.map(testDef => {
    try {
      const outcome = testDef.test(ctx);
      if (outcome === true) {
        return {
          id: testDef.id,
          description: testDef.description,
          passed: true
        };
      }
      return {
        id: testDef.id,
        description: testDef.description,
        passed: false,
        message: typeof outcome === 'string' ? outcome : 'Condition not satisfied.'
      };
    } catch (err: any) {
      return {
        id: testDef.id,
        description: testDef.description,
        passed: false,
        message: err?.message || 'Error occurred while testing solution.'
      };
    }
  });
}
