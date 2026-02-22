export default function TaskCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='overflow-hidden rounded-lg bg-zinc-900/65 p-5 shadow-sm ring-1 ring-white/5 transition-all'>
      {children}
    </div>
  );
}
