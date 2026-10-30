const assert = require("node:assert/strict");
const { randomBytes } = require("node:crypto");
const { readFileSync } = require("node:fs");
const { after, before, test } = require("node:test");
const vm = require("node:vm");
const bcrypt = require("bcrypt");

process.env.JWT_SECRET = randomBytes(32).toString("hex");

const app = require("../index");
const UserModel = require("../model/User.model");
const ProjectModel = require("../model/projects.model");
const ServiceModel = require("../model/service.model");
const ContactModel = require("../model/contact.model");
const BannerModel = require("../model/banner.model");
const TestimonialsContentModel = require("../model/testimonials.model");
const generateToken = require("../helpers/generateToken");

const ids = {
  admin: "64b000000000000000000001",
  user: "64b000000000000000000002",
  target: "64b000000000000000000003",
};
const users = {
  [ids.admin]: { _id: ids.admin, name: "Test Admin", email: "admin@example.test", role: "admin", status: "active", tokenVersion: 0 },
  [ids.user]: { _id: ids.user, name: "Test User", email: "user@example.test", role: "user", status: "active", tokenVersion: 0 },
};

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/routes/api`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

function installAuthenticationMocks() {
  const original = {
    findById: UserModel.findById,
    findOne: UserModel.findOne,
    exists: UserModel.exists,
    create: UserModel.create,
    updateOne: UserModel.updateOne,
  };

  UserModel.findById = (id) => ({
    select: async () => users[String(id)] || null,
  });
  UserModel.updateOne = async (filter, update) => {
    const user = users[String(filter._id)];
    if (user) user.tokenVersion += update.$inc.tokenVersion;
    return { modifiedCount: user ? 1 : 0 };
  };

  return () => {
    Object.assign(UserModel, original);
  };
}

function bearer(userId, tokenVersion = 0) {
  return `Bearer ${generateToken(userId, tokenVersion)}`;
}

async function request(path, { token, method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: token } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

test("auth and admin endpoints enforce server-verified roles", async (t) => {
  const restore = installAuthenticationMocks();
  try {
    await t.test("unauthenticated requests are denied by admin APIs", async () => {
      const overview = await request("/admin/overview");
      const contacts = await request("/contact/all-contact");
      assert.equal(overview.status, 401);
      assert.equal(contacts.status, 401);
    });

    test("homepage banner content is public to read and restricted to admin updates", async () => {
      const restoreAuthentication = installAuthenticationMocks();
      const originalFindById = BannerModel.findById;
      const originalFindByIdAndUpdate = BannerModel.findByIdAndUpdate;
      let storedBanner = null;
      BannerModel.findById = () => ({ lean: async () => storedBanner });
      BannerModel.findByIdAndUpdate = (_id, update) => ({
        lean: async () => {
          storedBanner = update.$set;
          return storedBanner;
        },
      });

      test("homepage testimonials are public to read and only administrators can manage reviews", async () => {
        const restoreAuthentication = installAuthenticationMocks();
        const originalFindById = TestimonialsContentModel.findById;
        const originalFindByIdAndUpdate = TestimonialsContentModel.findByIdAndUpdate;
        let storedContent = null;
        TestimonialsContentModel.findById = () => ({ lean: async () => storedContent });
        TestimonialsContentModel.findByIdAndUpdate = (_id, update) => ({
          lean: async () => {
            storedContent = { ...update.$set };
            return storedContent;
          },
        });

        const review = {
          id: "review-one",
          name: "Alex Client",
          role: "Founder",
          company: "Example Co",
          image: "https://example.com/client.jpg",
          video: "",
          text: "The website project was excellent.",
          serviceType: "Website Design",
          rating: 5,
        };

        try {
          const publicContent = await request("/home/testimonials");
          assert.equal(publicContent.status, 200);
          assert.equal(publicContent.body.data.initialized, false);

          const unauthenticatedUpdate = await request("/admin/testimonials", {
            method: "PUT",
            body: { testimonials: [review] },
          });
          assert.equal(unauthenticatedUpdate.status, 401);

          const userUpdate = await request("/admin/testimonials", {
            token: bearer(ids.user),
            method: "PUT",
            body: { testimonials: [review] },
          });
          assert.equal(userUpdate.status, 403);

          const saved = await request("/admin/testimonials", {
            token: bearer(ids.admin),
            method: "PUT",
            body: { testimonials: [review] },
          });
          assert.equal(saved.status, 200);
          assert.equal(saved.body.data.testimonials[0].serviceType, "Website Design");

          const publicAfterSave = await request("/home/testimonials");
          assert.equal(publicAfterSave.body.data.initialized, true);
          assert.deepEqual(publicAfterSave.body.data.testimonials, [review]);

          const invalid = await request("/admin/testimonials", {
            token: bearer(ids.admin),
            method: "PUT",
            body: { testimonials: [{ ...review, video: "javascript:alert(1)" }] },
          });
          assert.equal(invalid.status, 400);
          assert.deepEqual(storedContent.testimonials, [review]);
        } finally {
          TestimonialsContentModel.findById = originalFindById;
          TestimonialsContentModel.findByIdAndUpdate = originalFindByIdAndUpdate;
          restoreAuthentication();
        }
      });

      const content = {
        headlineBefore: "Design",
        headlineHighlight: "Better",
        headlineAfter: "Websites",
        description: "We build high-performing websites.",
        stats: [
          { value: "120+", label: "Projects" },
          { value: "60+", label: "Clients" },
          { value: "5★", label: "Rating" },
        ],
      };

      try {
        const publicContent = await request("/home/banner");
        assert.equal(publicContent.status, 200);
        assert.equal(publicContent.body.data.headlineBefore, "We Build");

        const unauthorizedUpdate = await request("/admin/banner", {
          method: "PUT",
          body: content,
        });
        assert.equal(unauthorizedUpdate.status, 401);

        const userUpdate = await request("/admin/banner", {
          token: bearer(ids.user),
          method: "PUT",
          body: content,
        });
        assert.equal(userUpdate.status, 403);

        const saved = await request("/admin/banner", {
          token: bearer(ids.admin),
          method: "PUT",
          body: content,
        });
        assert.equal(saved.status, 200);
        assert.deepEqual(saved.body.data, content);

        const invalid = await request("/admin/banner", {
          token: bearer(ids.admin),
          method: "PUT",
          body: { ...content, stats: content.stats.slice(0, 2) },
        });
        assert.equal(invalid.status, 400);
        assert.deepEqual(storedBanner, content);

        const updatedPublicContent = await request("/home/banner");
        assert.equal(updatedPublicContent.body.data.headlineHighlight, "Better");
      } finally {
        BannerModel.findById = originalFindById;
        BannerModel.findByIdAndUpdate = originalFindByIdAndUpdate;
        restoreAuthentication();
      }
    });

    await t.test("authenticated users without admin role are forbidden", async () => {
      const authorization = bearer(ids.user);
      const dashboard = await request("/admin/overview", { token: authorization });
      const userManagement = await request("/admin/users", { token: authorization });
      const projectMutation = await request("/projects/add-project", {
        token: authorization,
        method: "POST",
        body: { projectname: "Attempt", projecttype: "Test" },
      });
      assert.equal(dashboard.status, 403);
      assert.equal(userManagement.status, 403);
      assert.equal(projectMutation.status, 403);
    });

    await t.test("an admin can verify identity and read admin statistics", async () => {
      const originalCounts = {
        user: UserModel.countDocuments,
        project: ProjectModel.countDocuments,
        service: ServiceModel.countDocuments,
        contact: ContactModel.countDocuments,
      };
      UserModel.countDocuments = async (filter) => filter?.status === "active" ? 1 : 2;
      ProjectModel.countDocuments = async () => 3;
      ServiceModel.countDocuments = async () => 4;
      ContactModel.countDocuments = async () => 5;
      try {
        const authorization = bearer(ids.admin);
        const identity = await request("/auth/me", { token: authorization });
        const overview = await request("/admin/overview", { token: authorization });
        assert.equal(identity.status, 200);
        assert.equal(identity.body.data.role, "admin");
        assert.equal("password" in identity.body.data, false);
        assert.equal(overview.status, 200);
        assert.deepEqual(overview.body.data, {
          users: 2,
          activeUsers: 1,
          suspendedUsers: 2,
          projects: 3,
          services: 4,
          contacts: 5,
        });
      } finally {
        UserModel.countDocuments = originalCounts.user;
        ProjectModel.countDocuments = originalCounts.project;
        ServiceModel.countDocuments = originalCounts.service;
        ContactModel.countDocuments = originalCounts.contact;
      }
    });

    test("the administrator seed script parses without running or reading credentials", () => {
      const seedScript = readFileSync(require.resolve("../scripts/seedAdmin.js"), "utf8");
      assert.doesNotThrow(() => new vm.Script(seedScript, { filename: "seedAdmin.js" }));
    });

    let ordinaryAuthorization;
    let administratorAuthorization;
    await t.test("login issues role-scoped tokens without returning password hashes", async () => {
      const originalFindOne = UserModel.findOne;
      const ordinaryPassword = randomBytes(16).toString("hex");
      const administratorPassword = randomBytes(16).toString("hex");
      const credentials = new Map([
        ["user@example.test", { user: users[ids.user], hash: await bcrypt.hash(ordinaryPassword, 12) }],
        ["admin@example.test", { user: users[ids.admin], hash: await bcrypt.hash(administratorPassword, 12) }],
      ]);
      UserModel.findOne = (filter) => ({
        select: async () => {
          const record = credentials.get(filter.email);
          return record ? { ...record.user, password: record.hash } : null;
        },
      });

      try {
        const userLogin = await request("/auth/login", {
          method: "POST",
          body: { email: "user@example.test", password: ordinaryPassword },
        });
        const adminLogin = await request("/auth/login", {
          method: "POST",
          body: { email: "admin@example.test", password: administratorPassword },
        });
        assert.equal(userLogin.status, 200);
        assert.equal(adminLogin.status, 200);
        assert.equal("password" in userLogin.body.data.user, false);
        assert.equal("password" in adminLogin.body.data.user, false);
        ordinaryAuthorization = `Bearer ${userLogin.body.data.token}`;
        administratorAuthorization = `Bearer ${adminLogin.body.data.token}`;

        const userDashboard = await request("/admin/overview", { token: ordinaryAuthorization });
        const adminIdentity = await request("/auth/me", { token: administratorAuthorization });
        assert.equal(userDashboard.status, 403);
        assert.equal(adminIdentity.status, 200);
        assert.equal(adminIdentity.body.data.role, "admin");
      } finally {
        UserModel.findOne = originalFindOne;
      }
    });

    await t.test("an authorized administrator can manage roles and revoke updated sessions", async () => {
      const selfRoleChange = await request(`/admin/users/${ids.admin.toUpperCase()}/role`, {
        token: administratorAuthorization,
        method: "PATCH",
        body: { role: "user" },
      });
      assert.equal(selfRoleChange.status, 400);

      const target = {
        _id: ids.target,
        name: "Role Target",
        email: "target@example.test",
        role: "user",
        status: "active",
        tokenVersion: 0,
        async save() {
          users[ids.target] = this;
        },
      };
      users[ids.target] = target;
      const staleTargetAuthorization = bearer(ids.target);
      const originalFindById = UserModel.findById;
      UserModel.findById = (id) => ({
        select: async () => String(id) === ids.target ? target : users[String(id)] || null,
      });
      try {
        const result = await request(`/admin/users/${ids.target}/role`, {
          token: administratorAuthorization,
          method: "PATCH",
          body: { role: "admin" },
        });
        const oldSession = await request("/auth/me", { token: staleTargetAuthorization });
        assert.equal(result.status, 200);
        assert.equal(result.body.data.role, "admin");
        assert.equal(target.tokenVersion, 1);
        assert.equal(oldSession.status, 401);
      } finally {
        UserModel.findById = originalFindById;
      }
    });

    await t.test("logout revokes the existing JWT", async () => {
      const logout = await request("/auth/logout", {
        token: administratorAuthorization,
        method: "POST",
      });
      const protectedRequest = await request("/admin/users", { token: administratorAuthorization });
      assert.equal(logout.status, 200);
      assert.equal(protectedRequest.status, 401);
    });

    await t.test("registration ignores client-supplied administrator roles", async () => {
      const originalExists = UserModel.exists;
      const originalCreate = UserModel.create;
      let createdUser;
      UserModel.exists = async () => false;
      UserModel.create = async (fields) => {
        createdUser = fields;
        return {
          _id: ids.target,
          name: fields.name,
          email: fields.email,
          role: fields.role,
          status: fields.status,
        };
      };
      try {
        const password = randomBytes(16).toString("hex");
        const registration = await request("/auth/signup", {
          method: "POST",
          body: {
            name: "New Account",
            email: "new@example.test",
            password,
            role: "admin",
            status: "active",
          },
        });
        assert.equal(registration.status, 201);
        assert.equal(createdUser.role, "user");
        assert.equal(createdUser.status, "active");
        assert.notEqual(createdUser.password, password);
        assert.equal("password" in registration.body.data, false);
      } finally {
        UserModel.exists = originalExists;
        UserModel.create = originalCreate;
      }
    });

    await t.test("ordinary users cannot access protected role-management APIs", async () => {
      const result = await request(`/admin/users/${ids.target}/role`, {
        token: ordinaryAuthorization,
        method: "PATCH",
        body: { role: "admin" },
      });
      assert.equal(result.status, 403);
    });

    await t.test("authentication endpoints enforce a per-IP request limit", async () => {
      const originalFindOne = UserModel.findOne;
      UserModel.findOne = () => ({ select: async () => null });
      try {
        for (let attempt = 0; attempt < 7; attempt += 1) {
          await request("/auth/login", {
            method: "POST",
            body: { email: "missing@example.test", password: "invalid" },
          });
        }
        const limited = await request("/auth/login", {
          method: "POST",
          body: { email: "missing@example.test", password: "invalid" },
        });
        assert.equal(limited.status, 429);
      } finally {
        UserModel.findOne = originalFindOne;
      }
    });
  } finally {
    restore();
  }
});
