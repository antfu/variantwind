export function variantwind(className) {
  className = Array.isArray(className) ? className[0] : className;
  let result = className.match(/\w*:\{(.*?)\}/g);
  result = result
    .map((cls) => {
      className = className.replace(cls, "");
      const variant = cls.split(":")[0];
      const classes = cls
        .replace(/\{|\}/g, "")
        .replace(/\s/g, " " + variant + ":");
      return classes.indexOf(variant) === 0 ? classes : variant + ":" + classes;
    })
    .join(" ");
  return className.trim() + " " + result;
}

export const directive = {
  mounted(el) {
    el.className = cls(el.className);
  },
};

export const extractor = (content) => {
  return content
    .match(/[^<]*[^>]/g)
    .map((item) => item.match(/\w*:\{(.*?)\}/g))
    .filter((item) => !!item)
    .flatMap((classes) => cls(classes).trim().split(" "));
};
