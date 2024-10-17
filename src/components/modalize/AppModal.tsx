import { AppText } from "components/text/AppText";
import React, { MutableRefObject } from "react";
import { Keyboard, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { ITheme, useThemeColor } from "shared/theme";
import dimensions from "shared/theme/dimensions";

export interface IAppModalProps extends ModalizeProps {
    refModal: MutableRefObject<Modalize | null> | React.ForwardedRef<Modalize>
    disableScroll?: boolean;
    childrenStyle?: ViewStyle;
    titleHeader?: string;
    titleHeaderStyle?: TextStyle;
    withHandle?: boolean;
}

export const AppModal = React.memo((props: IAppModalProps) => {
  const theme = useThemeColor();
  const styles = useStyles(theme);
  const { refModal, disableScroll, childrenStyle, children, HeaderComponent, modalStyle, titleHeader, withHandle = true, onOverlayPress, titleHeaderStyle, ...rest } = props;

  return (
    <Modalize
      ref={refModal}
      scrollViewProps={{
        keyboardShouldPersistTaps: "never",
        showsVerticalScrollIndicator: false,
      }}
      {...rest}
      panGestureEnabled={!disableScroll}
      onOverlayPress={() => {
        Keyboard.dismiss()
        onOverlayPress?.()
      }}
      withHandle={withHandle}
      childrenStyle={[styles.childrenStyle, childrenStyle]}
      HeaderComponent={<>
        {!!titleHeader ? <AppText style={[styles.titleHeader, titleHeaderStyle]}>{titleHeader}</AppText> : null}
        {HeaderComponent}
      </>}
      modalStyle={[styles.defaultModalStyle, modalStyle]}
    >
      {children}
    </Modalize>
  );
});

const useStyles = (theme: ITheme) => StyleSheet.create({
  viewHolder: {
    backgroundColor: "#CACFDA",
    borderRadius: 2,
    height: 4,
    width: 32,
    alignSelf: "center",
    marginTop: dimensions.space.p6,
    marginBottom: dimensions.space.p6,
  },
  defaultModalStyle: {
    borderTopLeftRadius: dimensions.space.p16,
    borderTopRightRadius: dimensions.space.p16,
  },
  childrenStyle: {
    paddingBottom: dimensions.space.p20,
  },
  titleHeader: {
    textTransform: "uppercase",
    textAlign: "center",
    // fontFamily: theme.font.Bold,
    fontSize: dimensions.fontSize.p11,
    color: theme.color.text.primary,
    marginTop: 10
  }
});
