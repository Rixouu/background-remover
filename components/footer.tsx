export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-primary/5">
      <div className="container flex flex-col items-center justify-center gap-2">
        <p className="text-center text-sm font-bold tracking-tight text-muted-foreground/60">
          Background Remover &copy; {new Date().getFullYear()}
        </p>
        <p className="text-center text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/30">
          Built with Next.js & AI
        </p>
      </div>
    </footer>
  )
}