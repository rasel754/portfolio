"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

type FormData = {
  name: string
  icon: string
}

export function ToolDialog({
  tool,
  onSave,
}: {
  tool?: any
  onSave: (data: any, id?: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    icon: "",
  })

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name || "",
        icon: tool.icon || "",
      })
    }
  }, [tool])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        icon: formData.icon,
      }
      await onSave(payload, tool?._id)
      setOpen(false)
      if (!tool) {
        setFormData({ name: "", icon: "" })
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {tool ? (
          <Button variant="outline" size="sm">Edit</Button>
        ) : (
          <Button><Plus className="h-4 w-4 mr-2" /> Add Tool</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{tool ? "Edit Tool" : "Add New Tool"}</DialogTitle>
          <DialogDescription>
            {tool ? "Update the tool details below." : "Fill in the details to add a new tool."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Tool Name</Label>
            <Input
              required
              placeholder="e.g. VS Code"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon <span className="text-muted-foreground text-xs">(image URL)</span></Label>
            <Input
              required
              placeholder="e.g. https://cdn.jsdelivr.net/gh/devicons/..."
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
            {formData.icon && (
              <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 p-2">
                <img src={formData.icon} alt="Icon preview" className="h-8 w-8 object-contain" />
                <span className="text-xs text-muted-foreground">Icon preview</span>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Tool"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
