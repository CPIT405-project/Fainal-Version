// These are the things we need from the 'react-native' library to build our app
import { View, Text } from 'react-native'

// This is the main thing we need from the 'react' library to make our app work
import React from 'react'

// This is a special component that helps us make a sliding carousel of images
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

// These are the images we want to show in our carousel
import { sliderImages } from '../constants';

// These are special tools that help us make our app look good on different screen sizes
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// This is the main part of our app that shows the image carousel
export default function ImageSlider() {

  // This is what our app will show on the screen
  return (
    <Carousel
      data={sliderImages}  // These are the images for the carousel
      loop={true}  // This makes the carousel loop back to the beginning when it reaches the end
      autoplay={true}  // This makes the carousel move by itself
      renderItem={ItemCard}  // This is a function that decides what each item in the carousel looks like
      hasParallaxImages={true}  // This makes the images have a cool 3D effect
      sliderWidth={wp(100)}  // This is how wide the whole carousel is
      firstItem={1}  // This decides which image is shown first
      autoplayInterval={4000}  // This is how long each image is shown before moving to the next one
      itemWidth={wp(100)-70}  // This is how wide each image is
      slideStyle={{display: 'flex', alignItems: 'center'}}  // This makes the carousel look nice and centered
    />
  )
}

// This is a function that decides what each item in the carousel looks like
const ItemCard = ({item, index}, parallaxProps)=>{
  return (
    <View style={{width: wp(100)-70, height: hp(25)}}>  
      {/* This is the container for each image */}
      <ParallaxImage
        source={item}  // This is the actual image
        containerStyle={{borderRadius: 30, flex:1}}  // This makes the image have round corners and fill its container
        style={{resizeMode: 'contain'}}  // This makes the image fit nicely inside its container
        parallaxFactor={1}  // This controls how much of the 3D effect is applied
        {...parallaxProps}  // These are some special settings for the 3D effect
      />
    </View>
  )
}