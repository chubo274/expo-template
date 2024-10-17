import React, { memo, useEffect, useMemo, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { Image, ImageContentFit, ImageProps } from "expo-image";
import ImageSource from "src/assets/images";

// @ts-ignore
interface IProps extends ImageProps {
    source?: ImageSourcePropType | string,
    contentFit?: ImageContentFit
    fallBackSource?: string
}

export const RenderImage = memo((props: IProps) => {
  const { source, contentFit = "contain", fallBackSource, ...rest } = props;
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (typeof source === "string") {
      setIsError(false)
    }
  }, [source])

  const renderSource = useMemo(() => {
    const copy = source
    if (isError) return fallBackSource || ImageSource.image_error;
    if (!source) return fallBackSource || ImageSource.image_error;
    if (typeof source === "string") {
      return { uri: copy }
    }
    return source
  }, [source, isError, fallBackSource])


  return <Image
    {...rest}
    source={renderSource}
    contentFit={contentFit}
    onError={() => {
      if (!isError) {
        setIsError(true);
      }
    }}
  />
})