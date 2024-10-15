import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { changeLanguage, LANGUAGES } from "src/localization";
import { useGet, useSave } from "src/zustand";

const SignIn = () => {
  const { t } = useTranslation();
  const save = useSave();
  const userInfo = useGet("UserInfo");

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
        onPress={() => {
          save("UserInfo", { name: "123", age: 123 });
        }}
      >
        <Text>move to Home screen.</Text>
        <Text>{t("login")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          changeLanguage(LANGUAGES.ENGLISH);
        }}
      >
        <Text>ENG</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          changeLanguage(LANGUAGES.VIETNAM);
        }}
      >
        <Text>VNI</Text>
      </TouchableOpacity>

      <Text>userInfo: {userInfo?.toString()}</Text>
    </View>
  );
};

export default SignIn;
