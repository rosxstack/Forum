'use client'
import { UserRound, RefreshCw } from 'lucide-react'
import { MEMBERS, MEMBER_STYLES } from '@/lib/members'
import type { Member } from '@/lib/members'
import Avatar from './Avatar'

export default function MemberPicker({
  member,
  setMember,
}: {
  member: Member | null
  setMember: (m: Member | null) => void
}) {
  if (member) {
    return (
      <div className="flex items-center gap-3 rounded-full bg-white/90 px-3 py-1.5 text-sm shadow w-fit">
        <Avatar name={member} size="sm" />
        <span className="text-gray-700">
          Posting as <b>{member}</b>
        </span>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
          onClick={() => setMember(null)}
        >
          <RefreshCw size={14} /> Switch
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="flex items-center gap-1 text-white/90">
        <UserRound size={16} /> Who are you?
      </span>
      {MEMBERS.map(m => (
        <button
          key={m}
          className={`${MEMBER_STYLES[m].button} rounded-full px-4 py-1.5 font-medium shadow transition`}
          onClick={() => setMember(m)}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
