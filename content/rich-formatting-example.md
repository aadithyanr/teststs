---
title: "Rich Text Formatting in Markdown - A Complete Guide"
description: "Learn how to use all the rich text formatting features available in Markdown for your blog posts."
date: "2025-03-30"
category: "Tips & Resources"
thumbnail: "https://www.firecrawl.dev/images/blog/firecrawl-extract-endpoint.png"
author:
  name: "Hamza Ali"
  role: "Co-Founder & CEO"
  avatar: "/hamza.jpg"
---

# Rich Text Formatting in Markdown

When writing technical content, proper formatting is essential for readability and comprehension. This guide demonstrates all the rich text formatting options available in our blog platform.

## Text Styling Basics

### Bold and Italic Text

You can make text **bold** by wrapping it with double asterisks or __underscores__. For *italic* text, use single *asterisks* or _underscores_. To create ***bold and italic*** text, use three asterisks.

### Strikethrough

You can ~~strike through~~ text by wrapping it with double tildes.

### Highlighting

While standard Markdown doesn't support highlighting, our platform allows you to ==highlight text== using double equal signs.

## Lists and Structure

### Unordered Lists

Here's an unordered list:

- First item
- Second item
- Third item
  - Nested item 1
  - Nested item 2
- Fourth item

### Ordered Lists

Here's an ordered list:

1. First step
2. Second step
3. Third step
   1. Substep A
   2. Substep B
4. Fourth step

### Task Lists

You can create task lists:

- [x] Research topic
- [x] Create outline
- [ ] Write first draft
- [ ] Review and edit
- [ ] Publish

## Code Formatting

### Inline Code

Use backticks for `inline code` like variable names, function calls, or short commands.

### Code Blocks

For multi-line code blocks, use triple backticks with an optional language identifier:

```javascript
// This is a JavaScript function
function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((total, value) => total + value, 0);
}

// Example usage
const cart = [
  { name: 'Widget', price: 9.99, quantity: 2 },
  { name: 'Gadget', price: 14.95, quantity: 1 }
];

const total = calculateTotal(cart);
console.log(`Total: $${total.toFixed(2)}`);