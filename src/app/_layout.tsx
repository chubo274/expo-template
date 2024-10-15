import { Stack } from "expo-router";
import { useEffect } from "react";
import { configureLocalization, LANGUAGES } from "src/localization";
import { useSave } from "src/zustand";
import { getLocal } from "src/zustand/asyncStoreFunc";
import { ZustandKeyPersist } from "src/zustand/keyZustand";

export default function RootLayout() {
  const save = useSave();

  getLocal("Localization").then((value?: LANGUAGES) => {
    configureLocalization(value);
  });

  // set data local for zustand
  useEffect(() => {
    ZustandKeyPersist.forEach((key: any) => {
      if (ZustandKeyPersist.includes(key) && key != "Localization")
        getLocal(key).then((value: any) => save(key, value));
    });
  }, [save]);

  return (
    <Stack>
      <Stack.Screen name="(unAuth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
