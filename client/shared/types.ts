export interface Route {
  id: string;
  name: string;
  path: string;
  method: string;
  currentHandlerIdx: number;
  handlers: { name: string; status: number; a: string }[];
  delay: number;
}
