// lib/supabase/types.ts
import { Database } from './database.types'

// ─── Base Types (dari generated) ────────────────────────────────────
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type TeamInvitation = Database['public']['Tables']['team_invitations']['Row']
export type Tournament = Database['public']['Tables']['tournaments']['Row']
export type TournamentRegistration = Database['public']['Tables']['tournament_registrations']['Row']

// Insert types
export type InsertTeam = Database['public']['Tables']['teams']['Insert']
export type InsertTournament = Database['public']['Tables']['tournaments']['Insert']
export type InsertRegistration = Database['public']['Tables']['tournament_registrations']['Insert']

// Update types
export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateTournament = Database['public']['Tables']['tournaments']['Update']

export type GameCategory = Database['public']['Enums']['game_category']
export type TournamentStatus = Database['public']['Enums']['tournament_status']
export type RegistrationStatus = Database['public']['Enums']['registration_status']

export type TeamMemberWithProfile = TeamMember & {
  profiles: Pick<Profile, 'id' | 'username' | 'avatar_url'>
}

export type TeamWithMembers = Team & {
  team_members: TeamMemberWithProfile[]
}

export type TournamentWithOrganizer = Tournament & {
  profiles: Pick<Profile, 'id' | 'username' | 'avatar_url'>
}

export type RegistrationWithDetails = TournamentRegistration & {
  tournaments: Pick<Tournament, 'id' | 'name' | 'game_category' | 'banner_url'>
  teams: Pick<Team, 'id' | 'name' | 'logo_url'>
}

export type TeamMemberWithTeam = TeamMember & {
  teams: Pick<Team, 'id' | 'name' | 'logo_url' | 'description'>
}