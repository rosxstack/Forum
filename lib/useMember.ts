'use client'
import { useEffect, useState } from 'react'
import { MEMBERS, type Member } from './members'

export { MEMBERS }
export type { Member }

export function useMember() {
  const [member, setMemberState] = useState<Member | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('forum-member')
    if (saved && (MEMBERS as readonly string[]).includes(saved)) {
      setMemberState(saved as Member)
    }
  }, [])

  function setMember(m: Member | null) {
    if (m) localStorage.setItem('forum-member', m)
    else localStorage.removeItem('forum-member')
    setMemberState(m)
  }

  return { member, setMember }
}
