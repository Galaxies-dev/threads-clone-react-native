# React Native Threads Clone with Clerk, Convex & Sentry

This is a React Native Threads clone using [Clerk](https://go.clerk.com/WKHSBp0) for user authentication and [Convex](https://convex.dev/?utm_source=simongrimm&utm_medium=referral&utm_campaign=yt-collab-threads-clone) for all backend logic.

For improved debuggability, we've added [Sentry](https://sentry.io/welcome?utm_source=simongrimm&utm_medium=paid-community&utm_campaign=mobile-fy25q3-builders&utm_content=partner-react-native-mobile-learnmore&code=simongrimm) to the project.

Additional features:

- [Expo Router](https://docs.expo.dev/routing/introduction/) file-based navigation
- [Convex Database](https://docs.convex.dev/database) for data storage
- [Convex File Storage](https://docs.convex.dev/file-storage) for file storage
- [Convex Actions](https://supabase.com/edge-functions) for push notifications
- [Sentry](https://docs.sentry.io/platforms/react-native/?utm_source=simongrimm&utm_medium=paid-community&utm_campaign=mobile-fy25q3-builders&utm_content=partner-react-native-mobile-trysentry&code=simongrimm) for error tracking
- [Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) for haptic feedback
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) for push notifications
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for powerful animations
- [Image Zoom](https://github.com/likashefqet/react-native-image-zoom) for image zoom component

## Setup

### Environment Setup

Make sure you have the [Expo CLI](https://docs.expo.dev/get-started/set-up-your-environment/) installed.

Because we are using pre-built and a custom development client, you should download [Android Studio](https://developer.android.com/studio) and [Xcode](https://developer.apple.com/xcode/) to your Mac. For more information on setting up your development environment, refer to the [Expo documentation](https://docs.expo.dev/workflow/android-studio-emulator/) for Android Studio and the [React Native documentation](https://reactnative.dev/docs/environment-setup?guide=native) for Xcode.

### App Setup
To build the app, perform the following steps:

1. Clone the repository
2. Run `npm install`
3. Run `npx expo prebuild`
4. Run `npx expo run:ios` or `npx expo run:android`

For Convex, you need to import the database from the `db.zip` file after setting up your Convex project.

```sh
npx convex import db.zip   
```

Finally, make sure to update the `DUMMY.env` file with your own Clerk and Convex credentials and rename it to `.env`.

## Push Notifications Setup

For Push Notifications, you need to set up the Expo Push Notifications like presented in the video.

Then, add the access key to the Convex environment variables:

```sh
npx convex env set EXPO_ACCESS_TOKEN your-api-key

```

## Clerk Setup

### Authentication Setup

Create a [Clerk](https://clerk.com/) account and project, then update the `convex/auth.config.js` file with your `domain` and `applicationID`.

```js
export default {
  providers: [
    {
      domain: 'https://your-clerk-domain.clerk.accounts.dev',
      applicationID: 'your-clerk-application-id',
    },
  ],
};
```

You also need to connect Convex and Clerk with a JWT template. For this, cehck out the video and [Convex docs](https://docs.convex.dev/auth/clerk).

### Webhook Setup

You need to set up a webhook in Clerk to handle the user creation and update events.

1. Go to [Clerk](https://clerk.com/) and select your project
2. Go to **API** and select **Webhooks**
3. Add the following webhook, which should point to your Convex instance and include the `user.created` and `user.deleted` events:

<img src="./screenshots/webhook.png" width=100%>






## Sentry Setup

1. Create a [Sentry](https://sentry.io/welcome?utm_source=simongrimm&utm_medium=paid-community&utm_campaign=mobile-fy25q3-builders&utm_content=partner-react-native-mobile-learnmore&code=simongrimm) account and project
2. Go to **Project Settings** and select **Client Keys**
3. Copy the DSN and add it to the `.env` file

<img src="./screenshots/dsn.png" width=100%>


## App Screenshots

<div style="display: flex; flex-direction: 'row';">
<img src="./screenshots/1.png" width=30%>
<img src="./screenshots/2.png" width=30%>
<img src="./screenshots/3.png" width=30%>
<img src="./screenshots/4.png" width=30%>
<img src="./screenshots/5.png" width=30%>
<img src="./screenshots/6.png" width=30%>
<img src="./screenshots/7.png" width=30%>
<img src="./screenshots/8.png" width=30%>
<img src="./screenshots/9.png" width=30%>
</div>

## Demo

<div style="display: flex; flex-direction: 'row';">
<img src="./screenshots/tabbar.gif" width=30%>
<img src="./screenshots/comment.gif" width=30%>
<img src="./screenshots/search.gif" width=30%>
<img src="./screenshots/post.gif" width=30%>
<img src="./screenshots/profile.gif" width=30%>
<img src="./screenshots/imagezoom.gif" width=30%>

</div>

## Convex Screenshots

<div style="display: flex; flex-direction: 'row';">
<img src="./screenshots/convex1.png" width=100%>
<img src="./screenshots/convex2.png" width=100%>
<img src="./screenshots/convex3.png" width=100%>
<img src="./screenshots/convex4.png" width=100%>
<img src="./screenshots/convex5.png" width=100%>
</div>

## Sentry Screenshots

<div style="display: flex; flex-direction: 'row';">
<img src="./screenshots/sentry1.png" width=100%>
<img src="./screenshots/sentry2.png" width=100%>
<img src="./screenshots/sentry3.png" width=100%>
<img src="./screenshots/sentry4.png" width=100%>
<img src="./screenshots/sessionreplay.gif" width=100%>

</div>

## 🚀 More

**Take a shortcut from web developer to mobile development fluency with guided learning**

Enjoyed this project? Learn to use React Native to build production-ready, native mobile apps for both iOS and Android based on your existing web development skills.

<a href="https://galaxies.dev"><img src="banner.png" height="auto" width="100%"></a>
