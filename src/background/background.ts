chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let authURL = "https://dev-wn1ex84xnkicivjz.us.auth0.com/authorize";
  const clientID = "f4SsLnK6pIuSYhqCwqUUAwTO8k3L2gUO";
  const callbackUrl = chrome.identity.getRedirectURL();

  if (message.type === "login") {
    const scopes = ["openid", "email", "profile"];

    authURL += `?client_id=${clientID}`;

    authURL += `&redirect_uri=${callbackUrl}`;
    authURL += `&response_type=token`;
    authURL += `&scope=${encodeURIComponent(scopes.join(" "))}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authURL,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error(chrome.runtime.lastError);
          sendResponse({ success: false });
          return;
        }

        const accessToken = new URL(redirectUrl).hash
          .split("&")[0]
          .split("=")[1];
        chrome.storage.sync.set({ accessToken }, () => {
          sendResponse({
            success: true,
            accessToken,
          });
        });
      }
    );

    // Return true to indicate that the response is sent asynchronouslyF
    return true;
  } else if (message.type === "logout") {
    chrome.storage.sync.get("accessToken", (data) => {
      if (data.accessToken) {
        let logoutUrl = "https://dev-wn1ex84xnkicivjz.us.auth0.com/v2/logout";

        logoutUrl += `?client_id=${clientID}`;
        logoutUrl += `&returnTo=${callbackUrl}`;

        // `client_id=f4SsLnK6pIuSYhqCwqUUAwTO8k3L2gUO&returnTo=${encodeURIComponent(
        //   `chrome-extension://${chrome.runtime.id}/popup.html`
        // )}`;

        fetch(logoutUrl, {
          method: "GET",
          mode: "no-cors",
        })
          .then((res) => {
            chrome.storage.sync.remove("accessToken", () => {
              sendResponse({ success: true });
            });
          })
          .catch((error) => {
            console.error("Error during logout:", error);
            chrome.storage.sync.remove("accessToken", () => {
              sendResponse({ success: false, message: error.message });
            });
          });
      } else {
        sendResponse({ success: false, message: "No access token found" });
      }
    });

    return true;
  }
});
