import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppRouter } from "src/navigation";

const Index = () => {
  const appRouter = useAppRouter();

  const onPress = useCallback(() => {
    appRouter.navigate("/auth/notification", {
      id: "1",
      data: JSON.stringify([1, 2]),
    });
  }, [appRouter]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home screen.</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Text>move to Notification screen.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
