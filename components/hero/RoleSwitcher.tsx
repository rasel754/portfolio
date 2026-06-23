"use client"

import { useState, useEffect } from "react"

const roles = [
  "MERN Stack Developer",
  "Next.js Developer",
  "Full Stack Engineer",
  "React Specialist",
]

export default function RoleSwitcher() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentRole.length) {
            setCurrentText(currentRole.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2500)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentRole.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex])

  return (
    <div className="font-mono text-accent text-xl h-8 flex items-center justify-start">
      <span>{currentText}</span>
      <span className="ml-1 inline-block h-5 w-[2px] bg-accent animate-pulse" />
    </div>
  )
}
