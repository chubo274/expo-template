import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "shared/theme";
import { useSave } from "src/zustand";

const Index = () => {
  const { t } = useTranslation();
  const save = useSave();
  const themeColor = useThemeColor();

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
        style={{ backgroundColor: themeColor.color.background.white }}
      >
        <Text>move to Home screen.</Text>
        <Text>{t("login")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
