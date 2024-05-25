// These are the things we need from the 'react-native' library to build our app
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

// This is the main thing we need from the 'react' library to make our app work
import React from 'react'

// These are special tools from the 'expo-router' library that help us move around in the app
import { useLocalSearchParams, useRouter } from 'expo-router';

// This is a special component that helps us show images in our app
import { Image } from 'expo-image';

// These are special tools that help us make our app look good on different screen sizes
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// This is a library that gives us nice icons to use in our app
import Anticons from 'react-native-vector-icons/AntDesign';

// These are special tools that help us make things move and appear in cool ways
import Animated, { FadeInDown } from 'react-native-reanimated';

// This is the main part of our app that shows the details of an exercise
export default function exerciseDetails() {

  // This is a variable that holds information about the exercise we want to see details for
  const item = useLocalSearchParams();
  
  // This is a tool that helps us move around in the app
  const router = useRouter();

  // This is what our app will show on the screen
  return (
    <View className="flex flex-1">
      {/* This is a container that holds the image of the exercise */}
      <View className="shadow-md bg-white rounded-b-[40px]">
        {/* This is the image of the exercise */}
        <Image source={{uri: item.gifUrl}} contentFit='cover' style={{width:wp(100), height: wp(100) }} className="rounded-b-[40px]" />
      </View>
      
      {/* This is a button that closes the exercise details screen */}
      <TouchableOpacity onPress={()=> router.back()} className="mx-2 absolute rounded-full mt-2 right-0" >
        <Anticons name="closecircle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>
      
      {/* This is a scrollable container that holds the details of the exercise */}
      <ScrollView className="mx-4 space-y-2 mt-3" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 60}}>
        {/* This is the name of the exercise */}
        <Animated.Text entering={FadeInDown.duration(300).springify()} style={{fontSize: hp(3.5)}} className="font-semibold text-neutral-800 tracking-wide" >
          {item.name}
        </Animated.Text>
        
        {/* This is the equipment needed for the exercise */}
        <Animated.Text entering={FadeInDown.delay(100).duration(300).springify()} style={{fontSize: hp(2)}} className=" text-neutral-700 tracking-wide" >
          Equipment <Text className="font-bold text-neutral-800"> {item?.equipment} </Text>
        </Animated.Text>
        
        {/* These are the secondary muscles worked by the exercise */}
        <Animated.Text entering={FadeInDown.delay(200).duration(300).springify()} style={{fontSize: hp(2)}} className=" text-neutral-700 tracking-wide" >
          Secondary Muscles <Text className="font-bold text-neutral-800"> {item?.secondaryMuscles} </Text>
        </Animated.Text>
        
        {/* This is the main muscle targeted by the exercise */}
        <Animated.Text entering={FadeInDown.delay(300).duration(300).springify()} style={{fontSize: hp(2)}} className=" text-neutral-700 tracking-wide" >
          Target <Text className="font-bold text-neutral-800"> {item?.target} </Text>
        </Animated.Text>
        
        {/* This is the title for the instructions section */}
        <Animated.Text entering={FadeInDown.delay(400).duration(300).springify()} style={{fontSize: hp(3)}} className="font-semibold text-neutral-800 tracking-wide" >
          Instructions
        </Animated.Text>
        
        {/* This is a list of instructions for the exercise */}
        { item.instructions?.split(',').map((instruction, index)=>{
          return (
            <Animated.Text entering={FadeInDown.delay((index+5)*100).duration(300).springify()} key={instruction} style={{fontSize: hp(1.7)}} className="text-neutral-800" >
              {instruction}
            </Animated.Text>
          )
        }) }
      </ScrollView>
    </View>
  )
}