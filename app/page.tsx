import { ImageProcessor } from "@/components/image-processor"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pb-10">
      <div className="flex w-full justify-end mb-2">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>
      <div className="space-y-4 text-center pt-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70">
          Background Remover
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A simple tool to remove backgrounds from your images. No watermarks, no signup required.
        </p>
      </div>
      <ImageProcessor />
    </div>
  )
} 