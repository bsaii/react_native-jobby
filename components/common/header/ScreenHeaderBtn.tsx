import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

import { styles, btnImageStyle } from './screenheader.style';

type ScreenHeaderBtnProps = {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress?: () => void;
};

const ScreenHeaderBtn = ({
  dimension,
  handlePress,
  iconUrl,
}: ScreenHeaderBtnProps) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={btnImageStyle(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
