'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useMember } from '@/lib/useMember'
import { MEMBER_STYLES } from '@/lib/members'
import MemberPicker from '@/components/MemberPicker'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'

type Thread = { id: number; title: string; body: string; author: string; created_at: string }
type Reply = { id: number; body: string; author: string; created_at: string }

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>()
  const { member, setMember } = useMember()
  const [thread, setThread] = useState<Thread | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [body, setBody] = useState('')

  async function load() {
    const { data: t } = await supabase.from('threads').select('*').eq('id', id).single()
    const { data: r } = await supabase
      .from('replies').select('*').eq('thread_id', id)
      .order('created_at', { ascending: true })
    setThread(t); setReplies(r ?? [])
  }

  useEffect(() => { load() }, [id])

  async function reply(e: React.FormEvent) {
    e.preventDefault()
    if (!member) return
    const { error } = await supabase
      .from('replies')
      .insert({ thread_id: Number(id), body, author: member })
    if (error) return alert(error.message)
    setBody(''); load()
  }

  return (
    <>
      <Header>
        <MemberPicker member={member} setMember={setMember} />
      </Header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-sky-700 hover:underline">
          <ArrowLeft size={16} /> All threads
        </Link>

        {!thread ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <>
            <article className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={thread.author} />
                <div>
                  <span className={`${MEMBER_STYLES[thread.author]?.badge ?? ''} rounded-full px-2 py-0.5 text-xs font-medium`}>
                    {thread.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock size={12} /> {new Date(thread.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
              <p className="whitespace-pre-wrap text-gray-800">{thread.body}</p>
            </article>

            <section className="space-y-3">
              {replies.map(r => (
                <div key={r.id} className="flex gap-3">
                  <Avatar name={r.author} size="sm" />
                  <div className="flex-1 rounded-2xl rounded-tl-none bg-white p-4 shadow-sm border border-slate-200">
                    <p className="whitespace-pre-wrap">{r.body}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span className={`${MEMBER_STYLES[r.author]?.badge ?? ''} rounded-full px-2 py-0.5 font-medium`}>
                        {r.author}
                      </span>
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {member ? (
              <form onSubmit={reply} className="space-y-3 rounded-2xl bg-white p-4 shadow-md border border-slate-200">
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  rows={3} placeholder="Write a reply…" value={body}
                  onChange={e => setBody(e.target.value)} required
                />
                <button className={`${MEMBER_STYLES[member].button} flex items-center gap-2 rounded-lg px-4 py-2 font-medium shadow transition`}>
                  <Send size={16} /> Reply as {member}
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-500">Pick your name at the top to reply.</p>
            )}
          </>
        )}
      </main>
    </>
  )
}
