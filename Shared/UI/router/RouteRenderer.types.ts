export interface RouteDef {
  path?: string;
  index?: boolean;
  element: React.ComponentType;
  children?: RouteDef[];
}

export interface RouteConfig {
  layout?: string;
  routes: RouteDef[];
}
