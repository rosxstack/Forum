'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquarePlus, MessageCircle, Clock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useMember } from '@/lib/useMember'
import { MEMBER_STYLES } from '@/lib/members'
import MemberPicker from '@/components/MemberPicker'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'

type Thread = {
  id: number
  title: string
  author: string
  created_at: string
  replies: { count: number }[]
}

export default function Home() {
  const { member, setMember } = useMember()
  const [threads, setThreads] = useState<Thread[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  async function load() {
    const { data } = await supabase
      .from('threads')
      .select('id,title,author,created_at,replies(count)')
      .order('created_at', { ascending: false })
    setThreads((data as Thread[]) ?? [])
  }

  useEffect(() => { load() }, [])

  async function createThread(e: React.FormEvent) {
    e.preventDefault()
    if (!member) return
    const { error } = await supabase
      .from('threads')
      .insert({ title, body, author: member })
    if (error) return alert(error.message)
    setTitle(''); setBody(''); load()
  }

  return (
    <>
      <Header>
        <MemberPicker member={member} setMember={setMember} />
      </Header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {member && (
          <form onSubmit={createThread} className="space-y-3 rounded-2xl bg-white p-5 shadow-md border border-slate-200">
            <h2 className="flex items-center gap-2 font-semibold text-gray-700">
              <MessageSquarePlus size={18} className="text-sky-500" /> Start a new thread
            </h2>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Thread title"
              value={title} onChange={e => setTitle(e.target.value)} required
            />
            <textarea
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              rows={4} placeholder="What's on your mind?"
              value={body} onChange={e => setBody(e.target.value)} required
            />
            <button className={`${MEMBER_STYLES[member].button} flex items-center gap-2 rounded-lg px-4 py-2 font-medium shadow transition`}>
              <Send size={16} /> Post thread
            </button>
          </form>
        )}

        <ul className="space-y-3">
          {threads.map(t => (
            <li key={t.id}>
              <Link
                href={`/thread/${t.id}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 transition"
              >
                <Avatar name={t.author} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{t.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className={`${MEMBER_STYLES[t.author]?.badge ?? ''} rounded-full px-2 py-0.5 font-medium`}>
                      {t.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(t.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MessageCircle size={16} /> {t.replies?.[0]?.count ?? 0}
                </div>
              </Link>
            </li>
          ))}
          {threads.length === 0 && (
            <p className="text-center text-gray-500 py-10">No threads yet. Start one! 🎉</p>
          )}
        </ul>
      </main>
    </>
  )
}
