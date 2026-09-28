/// <reference types="vite/client" />

// Vite's bundled types only declare lowercase image extensions, but this repo
// has assets stored with uppercase ones (e.g. ToddStudioInstructor.JPG).
declare module '*.JPG' {
  const src: string;
  export default src;
}
