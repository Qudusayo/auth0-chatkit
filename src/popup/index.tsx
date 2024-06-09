import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import Popup from "./popup";
import { Auth0Provider } from "@auth0/auth0-react";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);

  root.render(
    <Auth0Provider
      domain={"dev-wn1ex84xnkicivjz.us.auth0.com"}
      clientId={"f4SsLnK6pIuSYhqCwqUUAwTO8k3L2gUO"}
      authorizationParams={{
        redirect_uri:
          "chrome-extension://bgneomaglpbbifgpmbmkbjfedoajklde/popup.html",
      }}
    >
      <Popup />
    </Auth0Provider>
  );
}

init();
