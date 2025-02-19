"use client";

import React, { useState } from "react";

const useTweetHandler = () => {
  const [tweet, setTweet] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleTweet = async (url: string) => {
    if (!tweet.trim()) {
      setMessage("Tweet cannot be empty!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const sessionId = localStorage.getItem("sessionId");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionId}`,
        },
        body: JSON.stringify({ tweetText: tweet }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Tweet posted successfully!");
        setTweet("");
      } else {
        setMessage(data.message || "Error posting tweet.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return { message, isLoading, tweet, setTweet, handleTweet };
};

export default useTweetHandler;
