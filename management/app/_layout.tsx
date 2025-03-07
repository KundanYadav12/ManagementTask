// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }


import { Provider } from "react-redux";
import { store } from "../redux/store"; // Ensure correct path to your store
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
