"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

const RootLayout = ({ children }: PropsWithChildren<{}>) => (
  <html>
    <body>
      <Provider store={store}>{children}</Provider>
    </body>
  </html>
);

export default RootLayout;
