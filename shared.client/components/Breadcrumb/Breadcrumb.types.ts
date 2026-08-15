export interface BreadcrumbItem {
  title: string;
  href?: string;
  key?: string;
  disabled?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  className?: string;
}
