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
      {/* <TouchableOpacity style={{ marginTop: 12 }} activeOpacity={0.8} onPress={onOpenPopUp}>
        <Text>Open Modal</Text>
      </TouchableOpacity> */}

      {/* <Modalize ref={modalizeRef} snapPoint={300}>
        <View >
          <Text >Hello from Modalize!</Text>
        </View>
      </Modalize> */}

      {/* <AppModal
        refModal={modalizeRef}
        adjustToContentHeight
        titleHeader={`t('schoolYear')`}>
        <Text>move to Notification screen.</Text>
      </AppModal>

      <AppPopUp
        refPopUp={modalizeRefPopUp}
        title="sndkjsadjk"
        content={<AppText >{`t('confirmCreateDeferment')`}
        </AppText>}
      /> */}

      {/* <RenderImage style={{ width: 300, height: 300, backgroundColor: 'red' }} source={{ uri: `https://picsum.photos/200/300` }} /> */}
    </View>
  );
};

export default Index;
