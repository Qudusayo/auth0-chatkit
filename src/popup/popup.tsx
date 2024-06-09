import React, { useEffect, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";

import "./popup.css";
import { UserMessage, BotMessage } from "./components/chat";
import Layout from "./layout/layout";
import LoginButton from "./login";
import Loader from "./components/loader";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const Popup = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      type: "user" | "bot";
    }[]
  >([]);

  const getProfile = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://dev-wn1ex84xnkicivjz.us.auth0.com/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const profile = await response.json();
      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    chrome.storage.sync.get("accessToken", async (data) => {
      try {
        if (data.accessToken) {
          const profile = await getProfile(data.accessToken);
          setProfile(profile);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const login = () => {
    chrome.runtime.sendMessage({ type: "login" }, {}, async (response) => {
      try {
        if (response) {
          if (response.success) {
            const { accessToken } = response;
            const profile = await getProfile(accessToken);
            setProfile(profile);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    });
  };

  const resetProfile = () => {
    setProfile(null);
  };

  const propagateUsrMsg = (msg: string) => {
    setMessages((messages) => [
      ...messages,
      { id: Date.now().toString(), text: msg, type: "user" },
    ]);

    setTimeout(() => {
      setMessages((messages) => [
        ...messages,
        {
          id: Date.now().toString(),
          text: lorem.generateSentences(1),
          type: "bot",
        },
      ]);
    }, 1000);
  };

  if (loading) {
    return <Loader />;
  }

  return profile ? (
    <Layout propagateUsrMsg={propagateUsrMsg} resetProfile={resetProfile}>
      <div className="space-y-4">
        {messages.map((message) =>
          message.type === "user" ? (
            <UserMessage
              key={message.id}
              message={message.text}
              date={new Date().toLocaleTimeString()}
            />
          ) : (
            <BotMessage
              key={message.id}
              message={message.text}
              date={new Date().toLocaleTimeString()}
            />
          )
        )}
      </div>
    </Layout>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <LoginButton login={login} />
    </div>
  );
};

export default Popup;
