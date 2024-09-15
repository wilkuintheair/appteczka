import * as Notifications from "expo-notifications";

export const scheduleOpenAidKitSequence = async () => {
  await Notifications.scheduleNotificationAsync({
    trigger: new Date(Date.now() + 5000),
    content: {
      title: "Co z Apteczką?",
      body: "Niedawno korzystałeś z Apteczki 💉💊. Dbajmy wspólnie o bezpieczeństwo na szlaku! Powiedz nam coś o swoim doświadczeniu.",
    },
  });
  await Notifications.scheduleNotificationAsync({
    trigger: new Date(Date.now() + 15000),
    content: {
      title: "Hej 👋 Żyjesz?",
      body: "Niedawno korzystałeś z Apteczki 💉💊. Daj znać, co się wydarzyło! Pomożesz w ten sposób innym turystom.",
    },
  });
  await Notifications.scheduleNotificationAsync({
    trigger: new Date(Date.now() + 25000),
    content: {
      title: "Daj znać co z Apteczką!💉💊",
      body: "To ważne, bo bez tego nie wiemy czy Apteczka jest w pełni funkcjonalna. Dzięki za pomoc! 💪",
    },
  });
};
