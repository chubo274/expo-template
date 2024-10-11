import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>SignIn screen.</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push({ pathname: "/(tabs)/home" })}
      >
        <Text>move to Home screen.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
