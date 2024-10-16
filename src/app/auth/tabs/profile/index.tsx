import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSave } from "src/zustand";

export default function Index() {
  const save = useSave();
  const onLogout = useCallback(() => {
    save("UserInfo", undefined);
  }, [save]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile screen.</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onLogout}>
        <Text>move to unAuth screen.</Text>
      </TouchableOpacity>
    </View>
  );
}
