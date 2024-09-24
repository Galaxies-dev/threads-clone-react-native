import { Platform, PlatformColor } from 'react-native';

export const Colors = {
  background: '#FDF8FF',
  border: '#acacac',
  itemBackground: '#f5f5f5',

  ...Platform.select({
    ios: {
      submit: PlatformColor('systemBlueColor'),
    },
    android: {
      submit: PlatformColor('@android:color/system_primary_light'),
    },
    default: { submit: 'black' },
  }),
};
