import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PAGE_WIDTH = Dimensions.get('screen').width;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  };

  const carouselRef = useRef<ICarouselInstance>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = useCallback(({item}: any) => {
    return (
      <View style={{backgroundColor: item.color}}>
        <Text>{item.label}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Carousel
        ref={carouselRef}
        {...baseOptions}
        loop={false}
        pagingEnabled={true}
        autoPlay={false}
        windowSize={3}
        data={[
          {label: 'poiMarkers', color: 'red'},
          {label: 'itineraryMarkers', color: 'green'},
          {label: 'abcd', color: 'yellow'},
        ]}
        panGestureHandlerProps={{
          activeOffsetX: [-5, 5],
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 20,
        }}
        scrollAnimationDuration={500}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default App;
