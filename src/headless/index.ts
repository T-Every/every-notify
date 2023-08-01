import { toast } from '../main/toast';

export type {
  DefaultToastOptions,
  IconTheme,
  Renderable,
  Toast,
  ToasterProps,
  ToastOptions,
  ToastPosition,
  ToastType,
  ValueFunction,
  ValueOrFunction,
} from '../main/types';

export { resolveValue } from '../main/types';
export { useToaster } from '../main/use-toaster';
export { useStore as useToasterStore } from '../main/store';

export { toast };
export default toast;