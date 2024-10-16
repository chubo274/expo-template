// useAppRouter.ts
import { useRouter } from "expo-router";
import { AppRoutes } from "./routes";

export function useAppRouter() {
  const router = useRouter();

  const navigate = <T extends keyof AppRoutes, P extends AppRoutes[T]>(
    pathname: T,
    params: P,
  ) => {
    router.navigate({ pathname, params });
  };

  const push = <T extends keyof AppRoutes, P extends AppRoutes[T]>(
    pathname: T,
    params: P,
  ) => {
    router.push({ pathname, params });
  };

  const replace = <T extends keyof AppRoutes, P extends AppRoutes[T]>(
    pathname: T,
    params: P,
  ) => {
    router.replace({ pathname, params });
  };

  const setParams = (params: object) => {
    router.setParams(params);
  };

  const back = () => {
    router.back();
  };

  const canDismiss = () => {
    return router.canDismiss();
  };

  const canGoBack = () => {
    return router.canGoBack();
  };

  const dismiss = (count?: number) => {
    router.dismiss(count);
  };

  const dismissAll = () => {
    router.dismissAll();
  };

  return {
    navigate,
    push,
    replace,
    setParams,
    back,
    canDismiss,
    canGoBack,
    dismiss,
    dismissAll,
  };
}
