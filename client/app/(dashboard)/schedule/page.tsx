"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [tweet, setTweet] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/auth";
    };

    const handleTweet = async () => {
        if (!tweet.trim()) {
            setMessage("Tweet cannot be empty!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const sessionId = localStorage.getItem("sessionId");

            const res = await fetch("http://localhost:8000/tweet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`,
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

        setLoading(false);
    };

    return (
        <div className="space-y-4 p-4">
            <Button onClick={handleLogin}>Login with Twitter</Button>
            <Textarea
                placeholder="What do you want to tweet today? 🤗"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                className="w-full"
            />
            <Button onClick={handleTweet} disabled={loading}>
                {loading ? "Tweeting..." : "Tweet"}
            </Button>
            {message && <p className="text-sm text-gray-500">{message}</p>}
        </div>
    );
}