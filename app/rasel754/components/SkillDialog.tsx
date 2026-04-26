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
import { Slider } from "@/components/ui/slider"
import { Plus } from "lucide-react"

const COLOR_PRESETS = [
  { label: "JavaScript Yellow", value: "from-yellow-400 to-yellow-600" },
  { label: "React Cyan", value: "from-cyan-400 to-cyan-600" },
  { label: "Node Green", value: "from-green-400 to-green-600" },
  { label: "Express Gray", value: "from-gray-400 to-gray-600" },
  { label: "Mongo Green", value: "from-green-500 to-green-700" },
  { label: "Next Dark", value: "from-black to-gray-700" },
  { label: "TypeScript Blue", value: "from-blue-400 to-blue-600" },
  { label: "API Purple", value: "from-purple-400 to-purple-600" },
  { label: "HTML Orange", value: "from-orange-400 to-red-500" },
  { label: "Tailwind Teal", value: "from-teal-400 to-teal-600" },
  { label: "Redux Violet", value: "from-violet-400 to-violet-600" },
  { label: "Git Red", value: "from-orange-500 to-red-600" },
  { label: "Pink Rose", value: "from-pink-400 to-rose-600" },
  { label: "Indigo", value: "from-indigo-400 to-indigo-600" },
]

type FormData = {
  name: string
  level: number
  color: string
  logo: string
}

export function SkillDialog({
  skill,
  onSave,
}: {
  skill?: any
  onSave: (data: any, id?: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    level: 80,
    color: "from-yellow-400 to-yellow-600",
    logo: "",
  })

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        level: skill.level ?? 80,
        color: skill.color || "from-yellow-400 to-yellow-600",
        logo: skill.logo || "",
      })
    }
  }, [skill])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        level: formData.level,
        color: formData.color,
        logo: formData.logo || undefined,
      }
      await onSave(payload, skill?._id)
      setOpen(false)
      if (!skill) {
        setFormData({ name: "", level: 80, color: "from-yellow-400 to-yellow-600", logo: "" })
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
        {skill ? (
          <Button variant="outline" size="sm">Edit</Button>
        ) : (
          <Button><Plus className="h-4 w-4 mr-2" /> Add Skill</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {skill ? "Update the skill details below." : "Fill in the details to add a new technical skill."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <Input
              required
              placeholder="e.g. JavaScript"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Proficiency Level — <span className="text-primary font-bold">{formData.level}%</span></Label>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[formData.level]}
              onValueChange={(vals) => setFormData({ ...formData, level: vals[0] })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gradient Color</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: preset.value })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all hover:border-primary ${
                    formData.color === preset.value ? "border-primary bg-primary/10 font-medium" : "border-border"
                  }`}
                >
                  <div className={`h-4 w-8 rounded-sm bg-gradient-to-r ${preset.value} shrink-0`} />
                  <span className="truncate text-xs">{preset.label}</span>
                </button>
              ))}
            </div>
            <Input
              placeholder="or enter custom: from-xxx to-xxx"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Logo URL <span className="text-muted-foreground text-xs">(optional — use devicons CDN)</span></Label>
            <Input
              placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/..."
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />
            {formData.logo && (
              <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 p-2">
                <img src={formData.logo} alt="logo preview" className="h-8 w-8 object-contain" />
                <span className="text-xs text-muted-foreground">Logo preview</span>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Skill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
