// API utilities for dashboard
const BASE_URL = "http://localhost:5000/api/p4"

export async function fetchProjects() {
  const res = await fetch(`${BASE_URL}/projects`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch projects")
  const data = await res.json()
  return data.data || data
}

export async function createProject(project: any) {
  const res = await fetch(`${BASE_URL}/projects/create-project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  })
  if (!res.ok) throw new Error("Failed to create project")
  return res.json()
}

export async function updateProject(id: string, project: any) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  })
  if (!res.ok) throw new Error("Failed to update project")
  return res.json()
}

export async function deleteProject(id: string) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete project")
  return res.json()
}

export async function fetchBlogs() {
  const res = await fetch(`${BASE_URL}/blogs`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch blogs")
  const data = await res.json()
  return data.data || data
}

export async function createBlog(blog: any) {
  const res = await fetch(`${BASE_URL}/blogs/create-blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  })
  if (!res.ok) throw new Error("Failed to create blog")
  return res.json()
}

export async function updateBlog(id: string, blog: any) {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  })
  if (!res.ok) throw new Error("Failed to update blog")
  return res.json()
}

export async function deleteBlog(id: string) {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete blog")
  return res.json()
}

export async function fetchMessages() {
  const res = await fetch(`${BASE_URL}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch messages")
  const data = await res.json()
  return data.data || data
}

export async function fetchSkills() {
  const res = await fetch(`${BASE_URL}/skills`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch skills")
  const data = await res.json()
  return data.data || data
}

export async function createSkill(skill: any) {
  const res = await fetch(`${BASE_URL}/skills/create-skill`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill),
  })
  if (!res.ok) throw new Error("Failed to create skill")
  return res.json()
}

export async function updateSkill(id: string, skill: any) {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill),
  })
  if (!res.ok) throw new Error("Failed to update skill")
  return res.json()
}

export async function deleteSkill(id: string) {
  const res = await fetch(`${BASE_URL}/skills/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete skill")
  return res.json()
}
