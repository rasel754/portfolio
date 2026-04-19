import type React from "react"
import Link from "next/link"
import { LayoutDashboard, FileText, LayoutGrid, MessageSquare } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm hidden md:flex flex-col">
        <div className="h-14 flex items-center px-6 border-b">
          <Link href="/rasel754" className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
            Portfolio Admin
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link
            href="/rasel754"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </Link>
          <Link
            href="/rasel754/projects"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <LayoutGrid className="h-5 w-5" />
            Projects
          </Link>
          <Link
            href="/rasel754/blog"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <FileText className="h-5 w-5" />
            Blogs
          </Link>
          <Link
            href="/rasel754/messages"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <MessageSquare className="h-5 w-5" />
            Messages
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b flex items-center px-6 md:hidden">
          <Link href="/rasel754" className="font-bold text-lg">
            Portfolio Admin
          </Link>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
