// app/(protected)/profile/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Profile, TeamMember, Team, RegistrationWithDetails } from "@/lib/supabase/type"
import { redirect } from "next/navigation"
import ProfileClient from "@/components/profilePage/profile" 

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/sign-in")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>()  

  // Fetch team member dengan join
  const { data: teamMember } = await supabase
    .from("team_members")
    .select(`
      role,
      joined_at,
      teams (
        id,
        name,
        logo_url,
        description
      )
    `)
    .eq("user_id", user.id)
    .single<TeamMember & { teams: Team }>()

  const { data: registrations } = await supabase
    .from("tournament_registrations")
    .select(`
      status,
      registered_at,
      tournaments (
        name,
        game_category,
        banner_url
      )
    `)
    .eq("registered_by", user.id)
    .order("registered_at", { ascending: false })
    .limit(5)
    .returns<RegistrationWithDetails[]>()  

  return (
    <ProfileClient
      profile={profile!}
      email={user.email ?? ""}
      teamMember={teamMember}
      registrations={registrations ?? []}
    />
  )
}