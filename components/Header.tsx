import { MessagesSquare } from 'lucide-react'

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 text-white">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        <div className="flex items-center gap-3">
          <MessagesSquare size={32} />
          <h1 className="text-3xl font-bold">Our Forum</h1>
        </div>
        {children}
      </div>
    </header>
  )
}
