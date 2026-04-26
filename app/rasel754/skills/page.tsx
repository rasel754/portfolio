"use client"

import { useEffect, useState } from "react"
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../utils/api"
import { SkillDialog } from "../components/SkillDialog"
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

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadSkills = async () => {
    setLoading(true)
    try {
      const data = await fetchSkills()
      setSkills(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const handleSave = async (skillData: any, id?: string) => {
    if (id) {
      await updateSkill(id, skillData)
    } else {
      await createSkill(skillData)
    }
    await loadSkills()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id)
        await loadSkills()
      } catch (error) {
        console.error(error)
        alert("Failed to delete skill")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technical Skills</h1>
          <p className="text-muted-foreground mt-2">Manage your technical skills displayed on the portfolio.</p>
        </div>
        <SkillDialog onSave={handleSave} />
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Loading skills...
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No skills found. Add your first skill!
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill._id}>
                  <TableCell>
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${skill.color}`} />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`h-5 w-20 rounded-md bg-gradient-to-r ${skill.color}`} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <SkillDialog skill={skill} onSave={handleSave} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(skill._id)}>
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
