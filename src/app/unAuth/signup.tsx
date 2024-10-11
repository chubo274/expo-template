import { Text, View } from "react-native";

const SignUp = () => {
  // const onPressToDetail = useCallback(() => {
  //   router.push({
  //     pathname: "/home/main",
  //     params: { id: 2 }
  //   })
  // }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>SignUp screen.</Text>

      {/* <TouchableOpacity activeOpacity={0.8} onPress={onPressToDetail}>
        <Text>move to Home screen.</Text>
      </TouchableOpacity> */}

      {/* <Link href={{ pathname: '/home/index', params: { name: 'Bacon' } }} >
        <Text>move to Home screen.</Text>
      </Link> */}
    </View>
  );
};

export default SignUp;
