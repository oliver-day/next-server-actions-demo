"use client";

import React, { useTransition } from "react";
import { like, dislike } from "./actions";

export default function Likes({ id }: any) {
  let [isPending, startTransition] = useTransition();


  return (
    <div>
      <button onClick={() => startTransition(() => like(id))}>Like</button>
      <button onClick={() => startTransition(() => dislike(id))}>Unlike</button>
    </div>
  );
}
