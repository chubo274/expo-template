import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { AppRoutes } from "src/navigation/routes";

const Index = () => {
  const params = useLocalSearchParams<AppRoutes["/auth/notification"]>();
  console.info("params", params);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Notification screen.</Text>
    </View>
  );
};
export default Index;
