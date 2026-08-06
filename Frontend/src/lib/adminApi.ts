const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5100/routes/api";

type ApiResponse<T> = { success: boolean; message: string; data: T };

export type TeamMember = {
  _id: string;
  name: string;
  position: string;
  image?: string;
  facebookLink?: string;
  LinkedInLink?: string;
  whatsappNum?: string;
};

export type Project = {
  _id: string;
  projectname: string;
  projecttype: string;
  companyname?: string;
  projectoverview?: string;
  projectlink?: string;
  mainimage?: string;
  technologies?: string[];
};

function getToken() {
  return localStorage.getItem("webmarkio_auth_token");
}

async function request<T>(path: string, options: RequestInit = {}) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !body.success) throw new Error(body.message || "Something went wrong.");
  return body.data;
}

export const adminApi = {
  getTeam: () => request<TeamMember[]>("/team/all-members"),
  addTeam: (member: Omit<TeamMember, "_id">) => request<TeamMember>("/team/add-member", { method: "POST", body: JSON.stringify(member) }),
  updateTeam: (id: string, member: Omit<TeamMember, "_id">) => request<TeamMember>(`/team/update-member/${id}`, { method: "PATCH", body: JSON.stringify(member) }),
  deleteTeam: (id: string) => request<null>(`/team/delete-member/${id}`, { method: "DELETE" }),
  getProjects: () => request<Project[]>("/projects/all-projects"),
  addProject: (project: Omit<Project, "_id">) => request<Project>("/projects/add-project", { method: "POST", body: JSON.stringify(project) }),
  updateProject: (id: string, project: Omit<Project, "_id">) => request<Project>(`/projects/update-project/${id}`, { method: "PATCH", body: JSON.stringify(project) }),
  deleteProject: (id: string) => request<Project>(`/projects/delete-project/${id}`, { method: "DELETE" }),
};
