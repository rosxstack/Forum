export const MEMBERS = ['Christy', 'Roshan', 'Rose'] as const
export type Member = (typeof MEMBERS)[number]

// Full class names are written out so Tailwind can find them.
export const MEMBER_STYLES: Record<string, { avatar: string; badge: string; button: string }> = {
  Christy: {
    avatar: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-700',
    button: 'bg-violet-500 hover:bg-violet-600 text-white',
  },
  Roshan: {
    avatar: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-500 hover:bg-sky-600 text-white',
  },
  Rose: {
    avatar: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-700',
    button: 'bg-rose-500 hover:bg-rose-600 text-white',
  },
}
