
// These are the things we need from the 'react-native' library to build our app
import { View, Text, TouchableOpacity } from 'react-native'

// These are the things we need from the 'react' library to make our app work
import React, { useEffect, useState } from 'react'

// These are special tools from the 'expo-router' library that help us move around in the app
import { useLocalSearchParams, useRouter } from 'expo-router'

// This is a helper function that gets exercises from a database
import { fetchExercisesByBodypart } from '../api/exerciseDB';

// These are some example exercises we can use if we don't have real data
import { demoExercises } from '../constants';

// This is a special bar that shows information at the top of the screen
import { StatusBar } from 'expo-status-bar';

// This is a component that helps us show images in our app
import { Image } from 'react-native';

// These are special tools that help us make our app look good on different screen sizes
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// This is a library that gives us nice icons to use in our app
import Ionicons from 'react-native-vector-icons/Ionicons';

// This is a special list component we made to show our exercises
import ExerciseList from '../components/ExerciseList';

// This is a component that helps us scroll through content that doesn't fit on the screen
import { ScrollView } from 'react-native-virtualized-view'

// This is the main part of our app that shows exercises
export default function Exercises() {

  // This is a tool that helps us move around in the app
  const router = useRouter();
  
  // This is a special variable that will hold our list of exercises
  const [exercises, setExercises] = useState([]);
  
  // This is a variable that holds information about the body part we want to see exercises for
  const item = useLocalSearchParams();
  
  // This is a special function that runs when our app starts or when 'item' changes
  useEffect(()=>{
    // If we have an 'item', get the exercises for that body part
    if(item) getExercises(item.name);
  },[item]);

  // This is a function that gets exercises from the database for a specific body part
  const getExercises = async (bodypart)=>{
    let data = await fetchExercisesByBodypart(bodypart);
    setExercises(data);
  }

  // This is what our app will show on the screen
  return (
    <ScrollView>
      {/* This is the status bar at the top of the screen */}
      <StatusBar style="light" />
      
      {/* This is a big image that shows the body part */}
      <Image source={item.image} style={{width: wp(100), height: hp(45)}} className="rounded-b-[40px]" />
      
      {/* This is a button that takes us back to the previous screen */}
      <TouchableOpacity onPress={()=> router.back()} className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full" style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}} >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>
      
      {/* This is where we show the list of exercises */}
      <View className="mx-4 space-y-3 mt-4">
        {/* This is the title of the list */}
        <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
          {item.name} exercises
        </Text>
        
        {/* This is the list of exercises */}
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  )
}
