
type ActionReturnType<T> = T extends {[key: string]: (...args: any[]) => infer R}  ? R : never;

export type ActionType<T> = ActionReturnType<T>

















