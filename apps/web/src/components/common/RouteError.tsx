import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { ErrorFallback } from './ErrorBoundary';
import { PageLoader } from './PageLoader';

const STALE_CHUNK = /dynamically imported module|Importing a module script failed|error loading dynamically/i;
const RELOAD_KEY = 'folia-chunk-reload';

function alreadyReloadedFor(message: string): boolean {
  try {
    return sessionStorage.getItem(RELOAD_KEY) === message;
  } catch {
    return false;
  }
}

/** After a deploy, an open tab asks for old hashed chunks that no longer exist; one reload per missing chunk fetches the new build. */
export function RouteError() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : '';
  const reload = STALE_CHUNK.test(message) && !alreadyReloadedFor(message);

  useEffect(() => {
    if (!reload) return;
    try {
      sessionStorage.setItem(RELOAD_KEY, message);
    } catch {
      /* storage blocked: reload once anyway */
    }
    window.location.reload();
  }, [reload, message]);

  if (reload) return <PageLoader />;
  console.error('Route error:', error);
  return <ErrorFallback />;
}
