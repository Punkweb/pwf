// Switch to true if you want to be spammed relentlessly.
// This is for development purposes.
export const DEBUG = false;

export function logIfDebug(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}