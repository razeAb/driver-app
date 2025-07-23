export default {
  expo: {
    name: "driver-app",
    slug: "driver-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./frontend/assets/images/icon.png",
    scheme: "driverapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./frontend/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static", // ✅ Force Expo to use classic rendering
      favicon: "./frontend/assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./frontend/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {},
  },
};
