const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5100/routes/api";

type ApiResponse<T> = { success: boolean; message: string; data: T };

export type BannerContent = {
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  description: string;
  stats: { value: string; label: string }[];
};

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  video: string;
  text: string;
  serviceType: string;
  rating: number;
};

export type TestimonialsContent = {
  initialized: boolean;
  testimonials: AdminTestimonial[];
};

export type AdminFaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type FaqContent = {
  initialized: boolean;
  faqItems: AdminFaqItem[];
};

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  createdAt: string;
};

export type AdminOverview = {
  users: number;
  activeUsers: number;
  suspendedUsers: number;
  projects: number;
  services: number;
  contacts: number;
};

export type Service = {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: string;
  price: string;
  image: string;
  features?: string[];
  benefits?: string[];
  process?: { step: number; title: string; description: string }[];
  pricing?: {
    name: "Basic" | "Standard" | "Premium";
    price: string;
    description: string;
    features: string[];
  }[];
};

export type ServiceCategory = string;

export type ContactSubmission = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: string;
};

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
  return localStorage.getItem("webmarkio_auth_token") || sessionStorage.getItem("webmarkio_auth_token");
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
  if (!response.ok || !body.success) {
    const message = typeof body.message === "string" ? body.message : "Something went wrong.";
    throw new ApiError(message, response.status);
  }
  return body.data;
}

export const adminApi = {
  getBannerContent: () => request<BannerContent>("/home/banner"),
  updateBannerContent: (content: BannerContent) =>
    request<BannerContent>("/admin/banner", { method: "PUT", body: JSON.stringify(content) }),
  getTestimonials: () => request<TestimonialsContent>("/home/testimonials"),
  updateTestimonials: (testimonials: AdminTestimonial[]) =>
    request<TestimonialsContent>("/admin/testimonials", {
      method: "PUT",
      body: JSON.stringify({ testimonials }),
    }),
  updateTestimonial: (testimonial: AdminTestimonial) =>
    request<TestimonialsContent>(`/admin/testimonials/${encodeURIComponent(testimonial.id)}`, {
      method: "PATCH",
      body: JSON.stringify(testimonial),
    }),
  getFaq: () => request<FaqContent>("/home/faq"),
  updateFaq: (faqItems: AdminFaqItem[]) =>
    request<FaqContent>("/admin/faq", {
      method: "PUT",
      body: JSON.stringify({ faqItems }),
    }),
  updateFaqItem: (faqItem: AdminFaqItem) =>
    request<FaqContent>(`/admin/faq/${encodeURIComponent(faqItem.id)}`, {
      method: "PATCH",
      body: JSON.stringify(faqItem),
    }),
  getCurrentUser: () => request<Omit<AdminUser, "createdAt">>("/auth/me"),
  logout: () => request<null>("/auth/logout", { method: "POST" }),
  getOverview: () => request<AdminOverview>("/admin/overview"),
  getUsers: () => request<AdminUser[]>("/admin/users"),
  updateUserStatus: (id: string, status: AdminUser["status"]) =>
    request<AdminUser>(`/admin/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  updateUserRole: (id: string, role: AdminUser["role"]) =>
    request<AdminUser>(`/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
  getContacts: () => request<ContactSubmission[]>("/admin/contacts"),
  getTeam: () => request<TeamMember[]>("/team/all-members"),
  addTeam: (member: Omit<TeamMember, "_id">) =>
    request<TeamMember>("/team/add-member", { method: "POST", body: JSON.stringify(member) }),
  updateTeam: (id: string, member: Omit<TeamMember, "_id">) =>
    request<TeamMember>(`/team/update-member/${id}`, { method: "PATCH", body: JSON.stringify(member) }),
  deleteTeam: (id: string) =>
    request<null>(`/team/delete-member/${id}`, { method: "DELETE" }),
  getProjects: () => request<Project[]>("/projects/all-projects"),
  addProject: (project: Omit<Project, "_id">) =>
    request<Project>("/projects/add-project", { method: "POST", body: JSON.stringify(project) }),
  updateProject: (id: string, project: Omit<Project, "_id">) =>
    request<Project>(`/projects/update-project/${id}`, { method: "PATCH", body: JSON.stringify(project) }),
  deleteProject: (id: string) =>
    request<Project>(`/projects/delete-project/${id}`, { method: "DELETE" }),
  getServices: () => request<Service[]>("/services/all-services"),
  getServiceCategories: () => request<ServiceCategory[]>("/services/categories"),
  updateServiceCategories: (categories: ServiceCategory[]) =>
    request<ServiceCategory[]>("/services/categories", {
      method: "PUT",
      body: JSON.stringify({ categories }),
    }),
  getServiceBySlug: (slug: string) => request<Service>(`/services/single-service/${encodeURIComponent(slug)}`),
  addService: (service: Omit<Service, "_id">) =>
    request<Service>("/services/add-service", { method: "POST", body: JSON.stringify(service) }),
  updateService: (id: string, service: Omit<Service, "_id">) =>
    request<Service>(`/services/update-service/${id}`, { method: "PATCH", body: JSON.stringify(service) }),
  deleteService: (id: string) =>
    request<Service>(`/services/delete-service/${id}`, { method: "DELETE" }),
};
