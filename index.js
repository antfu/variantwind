export function variantwind(className) {
  // Example lg:{bg-red-500 hover:bg-red-900}
  const blocks = className.match(/\w*:\{(.*?)\}/g);

  let plainClasses;
  const processedClasses = blocks
    .map((block) => {
      plainClasses = className.replace(block, "");

      const [variant, classes] = block.split(":");

      const withVariants = classes
        .replace(/\{|\}/g, "")
        .replace(/\s/g, " " + variant + ":");

      return withVariants.startsWith(variant)
        ? withVariants
        : variant + ":" + withVariants;
    })
    .join(" ");
  return plainClasses.trim() + " " + processedClasses;
}

export const directive = {
  mounted(el) {
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
