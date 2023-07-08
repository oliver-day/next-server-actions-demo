"use client";

import React, { experimental_useOptimistic as useOptimistic } from "react";
import { like, dislike } from "./actions";

export default function LikesOptimistic({ likeCount, id }: any) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { likeCount, sending: false },
    (state, newLikeCount) => ({ ...state, likeCount: newLikeCount, sending: true })
    );

  return (
    <div>
      <div>
        OptimisticLikes: {optimisticLikes.likeCount}
        {optimisticLikes.sending && " Sending..."}
      </div>
      <button
        onClick={async () => {
          addOptimisticLike(optimisticLikes.likeCount + 1);
          await like(id);
        }}
      >
        Like
      </button>

      <button
        onClick={async () => {
          addOptimisticLike(optimisticLikes.likeCount - 1);
          await dislike(id);
        }}
      >
        Unlike
      </button>

    </div>
  );
}
