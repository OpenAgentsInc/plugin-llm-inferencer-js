declare module 'main' {
  // Extism exports take no params and return an I32
  export function callOpenAI(): I32;
}

declare module 'extism:host' {
  interface user {
    httpFetch(ptr: I64): I64;
  }
}
