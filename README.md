# Variantwind

Friendly Tailwind CSS variants in Vue 3

- Use as Binding
- Use as Directive
- Supports Purge

## Usage

### Installation

```sh
yarn add variantwind
```

### Directive

```js
import { createApp } from "vue";
import App from "./App.vue";
import { directive } from "variantwind";

let app = createApp(App);

app.directive("class", directive);

app.mount("#app");
```

Or register as a Plugin

```js
import { createApp } from "vue";
import App from "./App.vue";
import Variantwind from "variantwind";

let app = createApp(App);

// Second argument is directive name (optional) default: "variantwind"
app.use(Variantwind, "variantwind");

app.mount("#app");
```

```html
<template>
  <div
    class="w-full bg-red-500 md:{w-1/3 bg-blue-500} lg:{w-1/4 bg-yellow-500} hover:{bg-green-500}"
    v-class
  >
    Hello world
  </div>
</template>
```

### Binding

```html
<template>
  <div
    :class="variantwind`w-full bg-red-500 md:{w-1/3 bg-blue-500} lg:{w-1/4 bg-yellow-500} hover:{bg-green-500}`"
    v-class
  >
    Hello world
  </div>
</template>

<script>
  import { variantwind } from "variantwind";

  export default {
    methods: { variantwind },
  };
</script>
```

## Tailwind Purge Setup

```js
// tailwind.config.js
const { extractor } = require("variantwind");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.vue", "./src/**/*.js"],
    extractors: [{ extractor, extensions: ["vue"] }],
  },
};
```

### License

[MIT License](https://github.com/sibbngheid/variantwind/blob/master/LICENSE) © 2020 [Sibbngheid](https://github.com/antfu)
