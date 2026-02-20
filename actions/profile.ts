// actions/profile.ts
"use server"
import { createClient } from "@/lib/supabase/server"
import { Profile } from "@/lib/supabase/type" 
import { revalidatePath } from "next/cache"


// ini contoh getData ( method: GET)

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<Profile>()

  return data
}

// ini contoh updateData (method: PUT)
export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  //buat dapetin type nya buka file Lib trus buka type.ts
  const updates: Partial<Pick<Profile, "username" | "full_name">> = {
    username: formData.get("username") as string,
    full_name: formData.get("full_name") as string,
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/profile")
  return { success: true }
}


// note: kalo ga ngerti udah, vibe coding aja cuma prompt lu yg bner ya jan asal asalan nanti malah ngerusak
// tiap mau ngevibe struktur nya begini
// -kasih type nya dlu di folder lib/type
// -trus kasih logic apa yang mau di taro di hal tsb
 