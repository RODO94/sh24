export type ErrorTypes = "input" | "network" | "server" | "zod";
export type ErrorMessages = {
  type: ErrorTypes;
  message: string;
  statusCode?: number;
};
