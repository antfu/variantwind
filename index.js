export function variantwind(className) {
  // Array of blocks, e.g. ["lg:{bg-red-500 hover:bg-red-900}"]
  const blocks = className.match(/\w*:\{(.*?)\}/g);

  let plainClasses = className;

  const processedClasses = blocks
    .map((block) => {
      plainClasses = plainClasses.replace(block, "").trim();
      const [variant, classes] = block.split(/:(.+)/);

      const withVariants = classes
        .replace(/\{|\}/g, "")
        .replace(" ", " " + variant + ":");

      return withVariants.startsWith(variant)
        ? withVariants
        : variant + ":" + withVariants;
    })
    .join(" ");

  return plainClasses + " " + processedClasses;
}

export const directive = {
  beforeMount(el) {
    el.className = variantwind(el.className);
  },
  updated(el) {
    el.className = variantwind(el.className);
  },
};

export const extractor = (content) => {
  return content
    .match(/[^<]*[^>]/g)
    .map((item) => item.match(/\w*:\{(.*?)\}/g))
    .filter((item) => !!item)
    .flatMap((classes) => variantwind(classes).trim().split(" "));
};

export default (app, directiveName = "variantwind") => {
  app.directive(directiveName, directive);
};
