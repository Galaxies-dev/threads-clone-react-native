npx create-expo-app threads  
npx expo install expo-dev-client

npx expo install @expo-google-fonts/dm-sans expo-font  

npx expo install expo-haptics

npm install @clerk/clerk-expo
npx expo install expo-secure-store

npm install convex
npx convex dev
npx convex import --table messages testData.jsonl 

# npx convex import --append --table users testUser.jsonl
# npx convex import --append --table messages testMessages.jsonl

npm install @sentry/react-native
npm uninstall promise
npm install promise

# pod repo update

npm install @likashefqet/react-native-image-zoom

npx expo install expo-notifications expo-device expo-constants

eas build:configure
eas device:create

npx expo prebuild --clean 
eas build --local --profile development --platform ios

npx convex env list
npx convex env set EXPO_ACCESS_TOKEN your-api-key

