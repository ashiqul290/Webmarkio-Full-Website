import { type FormEvent, useEffect, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  FolderKanban,
  MessageSquareText,
  UserRound,
  Users,
} from "lucide-react";
import {
  adminApi,
  type AdminOverview,
  type AdminUser,
  type ContactSubmission,
  type Service,
  type ServiceCategory,
} from "../../lib/adminApi";

const cardClass = "rounded-2xl border border-white/[0.08] bg-[#17171F] p-5";
const tableClass = "w-full min-w-[700px] text-left text-sm";

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10B981]">
        WebMarkio admin
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
    </header>
  );
}

function LoadError({ text }: { text: string }) {
  return (
    <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-200">
      {text}
    </p>
  );
}

export function AdminHomePage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    adminApi.getOverview().then(setOverview).catch((requestError: Error) => setError(requestError.message));
  }, []);

  const stats = overview
    ? [
        { label: "Registered users", value: overview.users, icon: Users, tone: "text-[#10B981]" },
        { label: "Active accounts", value: overview.activeUsers, icon: Activity, tone: "text-[#8B5CF6]" },
        { label: "Portfolio projects", value: overview.projects, icon: FolderKanban, tone: "text-[#10B981]" },
        { label: "Website services", value: overview.services, icon: BriefcaseBusiness, tone: "text-[#8B5CF6]" },
        { label: "Contact inquiries", value: overview.contacts, icon: MessageSquareText, tone: "text-[#10B981]" },
      ]
    : [];

  return (
    <section>
      <PageTitle title="Dashboard overview" subtitle="A snapshot of your agency, users, and incoming inquiries." />
      {error && <LoadError text={error} />}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className={cardClass}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">{label}</p>
              <Icon aria-hidden="true" className={`h-5 w-5 ${tone}`} />
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-white">
              {overview ? value.toLocaleString() : "—"}
            </p>
          </article>
        ))}
        {!overview && !error && (
          <p className="p-4 text-sm text-zinc-400">Loading dashboard statistics…</p>
        )}
      </div>
      {overview && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className={cardClass}>
            <p className="text-sm font-medium text-white">Account health</p>
            <p className="mt-2 text-sm text-zinc-400">
              {overview.activeUsers} active · {overview.suspendedUsers} suspended
            </p>
          </article>
          <article className={cardClass}>
            <p className="text-sm font-medium text-white">Latest activity</p>
            <p className="mt-2 text-sm text-zinc-400">
              {overview.contacts} contact submissions are available to review.
            </p>
          </article>
        </div>
      )}
    </section>
  );
}

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  const loadUsers = () => {
    setLoading(true);
    setError("");
    adminApi.getUsers()
      .then(setUsers)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  };
  useEffect(loadUsers, []);

  const updateUser = async (
    user: AdminUser,
    change: "status" | "role",
  ) => {
    setUpdating(user._id);
    setError("");
    try {
      const updated = change === "status"
        ? await adminApi.updateUserStatus(
            user._id,
            user.status === "active" ? "suspended" : "active",
          )
        : await adminApi.updateUserRole(
            user._id,
            user.role === "admin" ? "user" : "admin",
          );
      setUsers((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update account.");
    } finally {
      setUpdating("");
    }
  };

  return (
    <section>
      <PageTitle title="Registered users" subtitle="Review account status and manage administrator access." />
      {error && <LoadError text={error} />}
      <div className={`${cardClass} mt-5 overflow-hidden p-0`}>
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-5 py-4">Account</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-zinc-400">Loading accounts…</td></tr>
              ) : users.length ? users.map((user) => (
                <tr key={user._id} className="border-t border-white/[0.07]">
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-zinc-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#8B5CF6]/10 px-2.5 py-1 text-xs font-medium text-[#B9A1FF]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.status === "active"
                        ? "bg-[#10B981]/10 text-[#5EE0B3]"
                        : "bg-rose-400/10 text-rose-300"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        disabled={updating === user._id}
                        onClick={() => void updateUser(user, "status")}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-[#10B981]/40 hover:text-white disabled:opacity-50"
                      >
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        type="button"
                        disabled={updating === user._id}
                        onClick={() => void updateUser(user, "role")}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-[#8B5CF6]/50 hover:text-white disabled:opacity-50"
                      >
                        {user.role === "admin" ? "Remove admin" : "Make admin"}
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-zinc-400">No user accounts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function AdminProfilePage() {
  const [profile, setProfile] = useState<Omit<AdminUser, "createdAt"> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.getCurrentUser()
      .then(setProfile)
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  return (
    <section>
      <PageTitle title="Administrator profile" subtitle="Your verified account details and access status." />
      {error && <LoadError text={error} />}
      {profile && (
        <article className={`${cardClass} max-w-2xl`}>
          <div className="flex items-center gap-4 border-b border-white/[0.07] pb-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#5EE0B3]">
              <UserRound aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold text-white">{profile.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{profile.email}</p>
            </div>
          </div>
          <dl className="grid gap-5 pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Account role</dt>
              <dd className="mt-2 text-sm font-medium capitalize text-[#B9A1FF]">{profile.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Account status</dt>
              <dd className="mt-2 text-sm font-medium capitalize text-[#5EE0B3]">{profile.status}</dd>
            </div>
          </dl>
        </article>
      )}
      {!profile && !error && <p className="text-sm text-zinc-400">Loading profile…</p>}
    </section>
  );
}

const emptyService: Omit<Service, "_id"> = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  icon: "sparkles",
  category: "",
  price: "",
  image: "",
};

export function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [draft, setDraft] = useState<Omit<Service, "_id">>(emptyService);
  const [editingId, setEditingId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCategories, setSavingCategories] = useState(false);
  const [error, setError] = useState("");

  const loadServices = () => {
    setLoading(true);
    Promise.all([adminApi.getServices(), adminApi.getServiceCategories()])
      .then(([loadedServices, loadedCategories]) => {
        setServices(loadedServices);
        setCategories(loadedCategories);
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  };
  useEffect(loadServices, []);

  const addCategory = () => {
    const category = categoryDraft.trim();
    if (!category || categories.some((item) => item.toLocaleLowerCase() === category.toLocaleLowerCase())) return;
    setCategories((current) => [...current, category]);
    setCategoryDraft("");
    setError("");
  };

  const removeCategory = (category: string) => {
    if (services.some((service) => service.category.toLocaleLowerCase() === category.toLocaleLowerCase())) {
      setError(`Move or delete services in "${category}" before removing that category.`);
      return;
    }
    setCategories((current) => current.filter((item) => item !== category));
    setError("");
  };

  const saveCategories = async () => {
    setSavingCategories(true);
    setError("");
    try {
      setCategories(await adminApi.updateServiceCategories(categories));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save categories.");
    } finally {
      setSavingCategories(false);
    }
  };

  const edit = (service?: Service) => {
    setEditingId(service?._id ?? "");
    setDraft(service ? {
      slug: service.slug,
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      category: service.category,
      price: service.price,
      image: service.image,
    } : emptyService);
    setShowForm(true);
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const service = editingId
        ? await adminApi.updateService(editingId, draft)
        : await adminApi.addService(draft);
      setServices((current) => editingId
        ? current.map((item) => item._id === editingId ? service : item)
        : [service, ...current]);
      setShowForm(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save service.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (service: Service) => {
    if (!window.confirm(`Delete "${service.title}"?`)) return;
    setError("");
    try {
      await adminApi.deleteService(service._id);
      setServices((current) => current.filter((item) => item._id !== service._id));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete service.");
    }
  };

  const field = (key: keyof typeof emptyService, label: string, required = true) => (
    <label key={key} className="block text-xs font-medium text-zinc-300">
      {label}
      {key === "description" || key === "shortDescription" ? (
        <textarea
          required={required}
          value={draft[key]}
          onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
          className="mt-2 min-h-20 w-full rounded-lg border border-white/10 bg-[#101016] px-3 py-2 text-sm text-white outline-none focus:border-[#10B981]"
        />
      ) : (
        <input
          required={required}
          value={draft[key]}
          onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
          className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#101016] px-3 text-sm text-white outline-none focus:border-[#10B981]"
        />
      )}
    </label>
  );

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <PageTitle title="Website services" subtitle="Manage the services shown across your website." />
        <button
          type="button"
          onClick={() => edit()}
          className="rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-[#07120E] transition hover:bg-[#34D399]"
        >
          Add service
        </button>
      </div>
      {error && <LoadError text={error} />}
      <section className={`${cardClass} mb-5`}>
        <h3 className="text-base font-semibold text-white">Service categories</h3>
        <p className="mt-1 text-sm text-zinc-400">Create categories, then assign each service to one category.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#101016] px-3 py-1.5 text-sm text-zinc-200">
              {category}
              <button type="button" aria-label={`Remove ${category}`} onClick={() => removeCategory(category)} className="text-zinc-400 hover:text-rose-300">×</button>
            </span>
          ))}
          {!categories.length && <span className="text-sm text-zinc-500">No categories yet.</span>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            aria-label="New service category"
            value={categoryDraft}
            onChange={(event) => setCategoryDraft(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addCategory(); } }}
            placeholder="e.g. Graphic Design"
            className="h-10 min-w-56 rounded-lg border border-white/10 bg-[#101016] px-3 text-sm text-white outline-none focus:border-[#10B981]"
          />
          <button type="button" onClick={addCategory} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:border-[#10B981]">Add category</button>
          <button type="button" onClick={() => void saveCategories()} disabled={savingCategories} className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-[#07120E] disabled:opacity-60">
            {savingCategories ? "Saving…" : "Save categories"}
          </button>
        </div>
      </section>
      {showForm && (
        <form onSubmit={save} className={`${cardClass} mb-5 grid gap-4 sm:grid-cols-2`}>
          <h3 className="text-base font-semibold text-white sm:col-span-2">
            {editingId ? "Edit service" : "New service"}
          </h3>
          {field("title", "Title")}
          {field("slug", "Slug")}
          {field("shortDescription", "Short description")}
          {field("description", "Description")}
          {field("icon", "Icon key")}
          <label className="block text-xs font-medium text-zinc-300">
            Category
            <select
              required
              value={draft.category}
              onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
              className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#101016] px-3 text-sm text-white outline-none focus:border-[#10B981]"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          {field("price", "Price")}
          {field("image", "Image URL")}
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-[#07120E] disabled:opacity-60">
              {saving ? "Saving…" : "Save service"}
            </button>
          </div>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-sm text-zinc-400">Loading services…</p> :
          services.length ? services.map((service) => (
            <article key={service._id} className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wide text-[#A78BFA]">{service.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">{service.shortDescription}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="text-sm text-zinc-300">{service.price}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => edit(service)} className="text-xs text-[#5EE0B3] hover:text-white">Edit</button>
                  <button type="button" onClick={() => void remove(service)} className="text-xs text-rose-300 hover:text-white">Delete</button>
                </div>
              </div>
            </article>
          )) : !error && <p className="text-sm text-zinc-400">No services are configured yet.</p>}
      </div>
    </section>
  );
}

export function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    adminApi.getContacts()
      .then(setContacts)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <PageTitle title="Contact submissions" subtitle="Review inquiries sent through the WebMarkio website." />
      {error && <LoadError text={error} />}
      <div className={`${cardClass} mt-5 overflow-hidden p-0`}>
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-500">
              <tr><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Service</th><th className="px-5 py-4">Message</th><th className="px-5 py-4">Received</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-zinc-400">Loading submissions…</td></tr>
              ) : contacts.length ? contacts.map((contact) => (
                <tr key={contact._id} className="border-t border-white/[0.07] align-top">
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{contact.name}</p>
                    <a className="mt-1 block text-xs text-[#5EE0B3]" href={`mailto:${contact.email}`}>{contact.email}</a>
                    {contact.phone && <p className="mt-1 text-xs text-zinc-500">{contact.phone}</p>}
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{contact.service || "—"}</td>
                  <td className="max-w-md whitespace-pre-wrap px-5 py-4 text-zinc-400">{contact.message}</td>
                  <td className="px-5 py-4 text-xs text-zinc-500">{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-zinc-400">No contact submissions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
