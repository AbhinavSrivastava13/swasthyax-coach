import { createStart, createMiddleware } from "@tanstack/react-start";

const requestMiddleware = createMiddleware().server(async ({ next }) => {
  return next();
});

export const startInstance = createStart({
  requestMiddleware: [requestMiddleware],
});
