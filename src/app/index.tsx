import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useSave } from "src/zustand";

const Index = () => {
  const { t } = useTranslation();
  const save = useSave();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Index screen.</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          save("UserInfo", { name: "123", age: 123 });
        }}
      >
        <Text>move to Home screen.</Text>
        <Text>{t("login")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
