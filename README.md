# React Native Threads Clone with Clerk, Convex & Sentry

This is a React Native Threads clone using [Clerk](https://go.clerk.com/WKHSBp0) for user authentication and [Convex](https://supabase.com/?utm_source=youtube&utm_medium=referral&utm_campaign=yt-collab-trello-clone) for all backend logic.

For improved debuggability, we've added [Sentry] to the project.

Additional features:

- [Expo Router](https://docs.expo.dev/routing/introduction/) file-based navigation
- [Convex Database](https://docs.convex.dev/database) for data storage
- [Convex File Storage](https://docs.convex.dev/file-storage) for file storage
- [Convex Actions](https://supabase.com/edge-functions) for push notifications
- [Sentry](https://docs.sentry.io/platforms/javascript/react-native/) for error tracking
- [Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) for haptic feedback
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) for push notifications
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for powerful animations
- [Image Zoom](https://github.com/likashefqet/react-native-image-zoom) for image zoom component

## Setup

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

## Push Notifications

For Push Notifications, you need to set up the Expo Push Notifications like presented in the video.

Then, add the access key to the Convex environment variables:

```sh
npx convex env set EXPO_ACCESS_TOKEN your-api-key
```

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

</div>

## 🚀 More

**Take a shortcut from web developer to mobile development fluency with guided learning**

Enjoyed this project? Learn to use React Native to build production-ready, native mobile apps for both iOS and Android based on your existing web development skills.

<a href="https://galaxies.dev"><img src="banner.png" height="auto" width="100%"></a>