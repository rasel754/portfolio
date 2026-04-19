"use client"

import { useEffect, useState } from "react"
import { fetchMessages } from "../utils/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Mail } from "lucide-react"

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadMessages = async () => {
    setLoading(true)
    try {
      const data = await fetchMessages()
      setMessages(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-2">View all inquiries from your visitors.</p>
        </div>
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg, idx) => (
                <TableRow key={msg._id || idx}>
                  <TableCell className="font-medium align-top pt-4">{msg.name}</TableCell>
                  <TableCell className="align-top pt-4">
                    <a href={`mailto:${msg.email}`} className="text-blue-500 hover:underline flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {msg.email}
                    </a>
                  </TableCell>
                  <TableCell className="whitespace-pre-wrap py-4 text-muted-foreground">
                    {msg.message}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
