import { MEMBER_STYLES } from '@/lib/members'

export default function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const color = MEMBER_STYLES[name]?.avatar ?? 'bg-gray-400'
  const dims = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-10 w-10 text-base'
  return (
    <div
      className={`${color} ${dims} shrink-0 rounded-full text-white font-bold flex items-center justify-center shadow-sm`}
    >
      {name[0]}
    </div>
  )
}
