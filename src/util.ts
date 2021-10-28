// Switch to true if you want to be spammed relentlessly.
// This is for development purposes.
export const PWF_DEBUG = process.env.PWF_DEBUG === 'true';

export function logIfDebug(...args: any[]) {
  if (PWF_DEBUG) {
    console.log(...args);
  }
}
