declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare namespace jest {
  interface AsymmetricMatcher {
    $$typeof: Symbol;
    sample?: string | RegExp | object | Array<any> | Function;
  }
  // throws an error because the non native version has it also defined, so just comment it
  // type Value = string | number | RegExp | AsymmetricMatcher | undefined

  interface Options {
    media?: string;
    modifier?: string;
    supports?: string;
  }

  interface Matchers<R> {
    toHaveStyleRule(property: string, value?: Value, options?: Options): R;
  }
}
