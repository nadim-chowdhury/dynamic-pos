// Type declarations for CSS and style imports
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// Type declarations for image imports
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}

declare module '*.ico' {
  const content: any;
  export default content;
}

declare module '*.bmp' {
  const content: any;
  export default content;
}

// Type declarations for font imports
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.eot';

// Type declarations for data imports
declare module '*.json' {
  const content: any;
  export default content;
}
