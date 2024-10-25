declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.js' {
  const value: string;
  export default value;
}

declare module '*i18n' {
  const i18n: any;
  export default i18n;
}

declare global {
  interface Window {
    paypal: any;
  }
}

let paypal = window.paypal;