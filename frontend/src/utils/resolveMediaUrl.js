import { SERVER_URL } from '../config';

export function resolveMediaUrl(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/images/uploads/')) {
    return `${SERVER_URL}${path}`;
  }
  return path;
}

export default resolveMediaUrl;
