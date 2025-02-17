"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import useTweetHandler from '../api/tweet';
import { handleLogin } from '../hooks/connect-account';

const MakeXPost = () => {
    const { message, isLoading, tweet, setTweet, handleTweet } = useTweetHandler();
  return (<>
  <Button onClick={handleLogin}>Login with Twitter</Button>
    <Textarea
                placeholder="What do you want to tweet today? 🤗"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                className="w-full"
                />
            <Button onClick={() => handleTweet("http://localhost:8000/tweet")} disabled={isLoading}>
                {isLoading ? "Tweeting..." : "Tweet"}
            </Button>
            {message && <p className="text-sm text-gray-500">{message}</p>}
                </>
  )
}

export default MakeXPost