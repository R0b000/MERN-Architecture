export interface ISocketEvent<T = unknown> {
  event: string;
  payload: T;
  room?: string;
  userId?: string;
}

export interface ISocketEventHandler<T = unknown> {
  (event: ISocketEvent<T>): void;
}
