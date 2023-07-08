import React from "react";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import styles from './page.module.scss'
import { redirect } from 'next/navigation'

interface Dog {
  name: string;
  image: string;
  breed: string;
}

export default async function DogEditPage({
  params,
}: {
  params: { id: string };
}) {

  // Fetch data
  const key = `dogs:${params.id}`;
  const dog = await kv.get<Dog>(key);

  async function upDog(formData: FormData) {
    // with `use server` directive Next.js will turn this into a server-side endpoint
    "use server";

    // Mutate data
    await kv.set(key, {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    });

    // Revalidate page and update server components
    revalidatePath(`/dogs/${params.id}/edit`);
  }

  async function upDogDeuce(formData: FormData) {
    "use server";

    // Mutate data
    await kv.set(key, {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    });

    redirect(`/dogs/${params.id}`);
  }

  return (
      <div className={styles.cardBody}>
        {/* action is a special property that takes a function and will provide the data
           from the form to run server-side code.
        */}
        <h2>Edit {dog?.name}</h2>

        <form action={upDog}>
          <label>Name</label>
          <input name="title" type="text" defaultValue={dog?.name} />
          <label>Image</label>
          <input name="image" type="text" defaultValue={dog?.image} />
          <label>Breed</label>
          <input name="breed" type="text" defaultValue={dog?.breed} />
          <button type="submit">Save and Continue</button>

          <button formAction={upDogDeuce}>Save and Quit</button>
        </form>
      </div>
  );
}
