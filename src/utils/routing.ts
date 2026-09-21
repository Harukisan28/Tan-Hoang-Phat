import type { RouteHref, RoutePath, ServiceSlug } from '../types/site';

const serviceSlugs: readonly ServiceSlug[] = [
  'gia-cong-co-khi',
  'san-xuat-theo-yeu-cau',
  'thi-cong-lap-dat',
  'san-pham-inox',
  'vat-tu-co-khi',
];

export const isRoutePath = (value: string): value is RoutePath =>
  value === '/' ||
  value === '/linh-vuc-hoat-dong' ||
  value === '/du-an' ||
  value === '/lien-he';

export const isServiceSlug = (value: string): value is ServiceSlug =>
  serviceSlugs.includes(value as ServiceSlug);

export const serviceHref = (slug: ServiceSlug): `/linh-vuc-hoat-dong#${ServiceSlug}` =>
  `/linh-vuc-hoat-dong#${slug}`;

export const getCurrentPath = (): RoutePath | null => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return isRoutePath(path) ? path : null;
};

export const getCurrentServiceSlug = (): ServiceSlug | null => {
  const hash = window.location.hash.replace(/^#/, '');
  return isServiceSlug(hash) ? hash : null;
};

export const navigateTo = (href: RouteHref) => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (href.includes('#')) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
};
