import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          // href: {
          //   pathname: '/[user]',
          //   params: {
          //     user: 'evanbacon',
          //   },
          // },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          // href: '/profile',
          // href: {
          //   pathname: '/[user]',
          //   params: {
          //     user: 'evanbacon',
          //   },
          // },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
