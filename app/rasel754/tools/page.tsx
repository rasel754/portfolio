"use client"

import { useEffect, useState } from "react"
import { fetchTools, createTool, updateTool, deleteTool } from "../utils/api"
import { ToolDialog } from "../components/ToolDialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react"

export default function ToolsPage() {
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadTools = async () => {
    setLoading(true)
    try {
      const data = await fetchTools()
      setTools(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTools()
  }, [])

  const handleSave = async (toolData: any, id?: string) => {
    if (id) {
      await updateTool(id, toolData)
    } else {
      await createTool(toolData)
    }
    await loadTools()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      try {
        await deleteTool(id)
        await loadTools()
      } catch (error) {
        console.error(error)
        alert("Failed to delete tool")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground mt-2">Manage your tools displayed on the portfolio.</p>
        </div>
        <ToolDialog onSave={handleSave} />
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                  Loading tools...
                </TableCell>
              </TableRow>
            ) : tools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                  No tools found. Add your first tool!
                </TableCell>
              </TableRow>
            ) : (
              tools.map((tool) => (
                <TableRow key={tool._id}>
                  <TableCell>
                    <span className="text-2xl">{tool.icon}</span>
                  </TableCell>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <ToolDialog tool={tool} onSave={handleSave} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tool._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
