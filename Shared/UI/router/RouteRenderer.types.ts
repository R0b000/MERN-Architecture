export interface RouteDef {
  path?: string;
  index?: boolean;
  element: React.ComponentType;
}

export interface RouteConfig {
  layout?: string;
  routes: RouteDef[];
}
