import { router } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const onLogout = useCallback(() => {
    router.push({ pathname: "/unAuth" });
  }, []);

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
