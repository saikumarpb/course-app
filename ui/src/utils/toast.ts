import { toast } from 'react-toastify';

export function featureNotImplemented() {
  toast.warn('Feature not yet implemented', {
    position: 'bottom-right',
    autoClose: 3000,
    toastId: 'feature-not-implemented',
  });
}
