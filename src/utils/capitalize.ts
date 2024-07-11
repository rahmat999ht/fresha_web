import React from "react";
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
