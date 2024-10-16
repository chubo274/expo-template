import { router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import ThemeProvider from "shared/theme";
import i18n from "src/localization";
import { useGet, useSave } from "src/zustand";
import { getLocal } from "src/zustand/asyncStoreFunc";
import { ZustandKeyPersist } from "src/zustand/keyZustand";

export default function RootLayout() {
  const save = useSave();
  const userInfo = useGet("UserInfo");
  const segments = useSegments();

  // set data local for zustand
  useEffect(() => {
    ZustandKeyPersist?.forEach((key: any) => {
      if (ZustandKeyPersist?.includes(key) && key != "Localization")
        getLocal(key).then((value: any) => save(key, value));
    });
  }, [save]);

  useEffect(() => {
    const segmentInAuth = segments[0] == "auth";
    if (!userInfo && segmentInAuth) {
      router.replace("/");
    } else if (userInfo && !segmentInAuth) {
      router.replace("/auth/tabs");
    }
  }, [userInfo, segments]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </I18nextProvider>
  );
}
