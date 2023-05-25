import { styled } from "nativewind";
import { ImageBackground } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import * as SecureStore from "expo-secure-store";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null);

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsUserAuthenticated(!!token);
    });
  }, []);

  const StyledStripes = styled(Stripes);

  if (!hasLoadedFonts) return <SplashScreen />;

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{
        position: "absolute",
        left: "-100%",
      }}
      className="relative flex-1 bg-gray-900"
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  );
}
