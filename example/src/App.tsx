import * as React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import {
  isInstagramAvailable,
  shareInstagramStory,
} from '@blackplate/react-native-share-story';

export default function App() {
  const [result, setResult] = React.useState<boolean>();
  const [hasShared, setHasShared] = React.useState<boolean>();

  const checkInstagram = React.useCallback(async () => {
    try {
      const instagram = await isInstagramAvailable();
      setResult(instagram);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const share = React.useCallback(async () => {
    try {
      const shareSuccess = await shareInstagramStory({
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      });
      setHasShared(shareSuccess);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    checkInstagram();
  }, [checkInstagram]);

  return (
    <View style={styles.container}>
      <Text>Instagram: {result?.toString()}</Text>
      <Text>has Shared: {hasShared?.toString()}</Text>
      <Button
        title="Share to instagram"
        onPress={() => {
          share();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
