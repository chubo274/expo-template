import { AppText } from "components/text/AppText"
import React, { MutableRefObject, ReactElement, ReactNode } from "react"
import { Keyboard, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Modalize } from "react-native-modalize"
import { ITheme, useThemeColor } from "shared/theme"
import dimensions from "shared/theme/dimensions"

interface IAppPopUpProps {
  refPopUp: MutableRefObject<Modalize | undefined>;
  title: string
  content?: ReactElement
  textButtonLeft?: string
  textButtonRight?: string
  textLeftStyle?: TextStyle
  textRightStyle?: TextStyle
  buttonLeftStyle?: ViewStyle
  buttonRightStyle?: ViewStyle
  onLeftPress?: () => void
  onRightPress?: () => void
  onClose?: () => void
  iconPopup?: ReactNode
  titleStyle?: TextStyle
  contentStyle?: ViewStyle
  buttonWrapper?: ViewStyle
  blockPressOverlay?: boolean
}

export const AppPopUp = React.memo((props: IAppPopUpProps) => {
  const { contentStyle, refPopUp, title, content, textButtonLeft, textButtonRight, textLeftStyle, textRightStyle, buttonLeftStyle, buttonRightStyle, onLeftPress, onRightPress, iconPopup, titleStyle, buttonWrapper, onClose, blockPressOverlay = false } = props
  const theme = useThemeColor();
  const styles = useStyles(theme);

  const renderButton = (text: string, onPress?: () => void, buttonStyle?: ViewStyle, textButtonStyle?: TextStyle) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.buttonStyle, buttonStyle]} onPress={onPress}>
        <AppText style={[styles.textButtonStyle, textButtonStyle]}>{text}</AppText>
      </TouchableOpacity>
    )
  }
  return (
    <Modalize
      ref={refPopUp}
      withHandle={false}
      modalStyle={styles.modalStyle}
      modalHeight={dimensions.space.deviceHeight}
      childrenStyle={{ width: "100%" }}
      onOpen={() => Keyboard.dismiss()}
      onClose={() => {
        onClose?.()
      }}
      scrollViewProps={{
        keyboardShouldPersistTaps: "handled",
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
      }}
    >
      <TouchableOpacity style={{ height: dimensions.space.deviceHeight, width: "100%", justifyContent: "center" }} activeOpacity={1} onPress={() => !blockPressOverlay ? refPopUp.current?.close() : null}>
        <View style={styles.contentWrapper}>
          {iconPopup ? <View style={styles.bgHeader}>{iconPopup}</View> : null}
          <View style={styles.headerWrapper}>
            <AppText style={[styles.titleStyle, titleStyle]}>{title}</AppText>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => refPopUp?.current?.close()}><X size={16} weight="bold" /></TouchableOpacity> */}
          </View>
          <View style={[styles.contentStyle, contentStyle]}>
            {content}
          </View>
          <View style={[styles.buttonWrapper, buttonWrapper]}>
            {textButtonLeft ? renderButton(textButtonLeft, onLeftPress, buttonLeftStyle, textLeftStyle) : null}
            {textButtonRight ? renderButton(textButtonRight, onRightPress, buttonRightStyle, textRightStyle) : null}
          </View>
        </View>
      </TouchableOpacity>
    </Modalize>
  )
})

const useStyles = (theme: ITheme) => StyleSheet.create({
  modalStyle: {
    backgroundColor: "transparent",
    paddingHorizontal: dimensions.space.p16,
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    borderRadius: dimensions.space.p8,
    backgroundColor: theme.color.background.white,
    paddingTop: dimensions.space.p24,
    paddingBottom: dimensions.space.p16,
    paddingRight: dimensions.space.p12,
    paddingLeft: dimensions.space.p12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleStyle: {
    fontSize: dimensions.fontSize.p18,
    // fontFamily: theme.font.Medium,
    textTransform: "capitalize",
  },
  contentStyle: {
    paddingTop: dimensions.space.p4,
    paddingBottom: dimensions.space.p16,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  buttonStyle: {
    flex: 1,
    alignItems: "center",
    paddingVertical: dimensions.space.p12,
    borderRadius: dimensions.space.p48
  },
  textButtonStyle: {
    fontSize: dimensions.fontSize.p15,
    // fontFamily: theme.font.Medium,
    textTransform: "capitalize"
  },
  bgHeader: {
    width: dimensions.space.makeResponsiveSize(56),
    height: dimensions.space.makeResponsiveSize(56),
    backgroundColor: theme.color.background.white,
    borderRadius: dimensions.space.makeResponsiveSize(50),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: dimensions.space.p16
  },
})