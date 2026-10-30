const assert = require("node:assert/strict");
const { randomBytes } = require("node:crypto");
const { after, before, test } = require("node:test");

process.env.JWT_SECRET = randomBytes(32).toString("hex");

const app = require("../index");
const UserModel = require("../model/User.model");
const FaqContentModel = require("../model/faq.model");
const generateToken = require("../helpers/generateToken");

const adminId = "64b000000000000000000001";
const userId = "64b000000000000000000002";
const users = {
  [adminId]: { _id: adminId, role: "admin", status: "active", tokenVersion: 0 },
  [userId]: { _id: userId, role: "user", status: "active", tokenVersion: 0 },
};

const originalFindUser = UserModel.findById;
const originalFindFaq = FaqContentModel.findById;
const originalUpdateFaq = FaqContentModel.findByIdAndUpdate;
let storedContent = null;
let server;
let baseUrl;

UserModel.findById = (id) => ({
  select: async () => users[String(id)] || null,
});
FaqContentModel.findById = () => {
  const document = {
    initialized: storedContent?.initialized || false,
    faqItems: (storedContent?.faqItems || []).map((item) => ({ ...item })),
    async save() {
      storedContent = {
        initialized: this.initialized,
        faqItems: this.faqItems.map((item) => {
          const { toObject, ...plainItem } = item;
          return plainItem;
        }),
      };
    },
  };
  return {
    lean: async () => storedContent,
    then: (resolve, reject) => Promise.resolve(document).then(resolve, reject),
  };
};
FaqContentModel.findByIdAndUpdate = (_id, update) => ({
  lean: async () => {
    storedContent = { ...update.$set };
    return storedContent;
  },
});

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/routes/api`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  UserModel.findById = originalFindUser;
  FaqContentModel.findById = originalFindFaq;
  FaqContentModel.findByIdAndUpdate = originalUpdateFaq;
});

async function request(path, { token, method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

test("FAQ content is public and administrators can add, edit, and delete questions", async () => {
  storedContent = null;
  const adminToken = generateToken(adminId);
  const userToken = generateToken(userId);
  const initialFaq = [
    { id: "faq-one", question: "First question?", answer: "First answer.", category: "General" },
    { id: "faq-two", question: "Second question?", answer: "Second answer.", category: "Pricing" },
  ];

  const publicBefore = await request("/home/faq");
  assert.equal(publicBefore.status, 200);
  assert.equal(publicBefore.body.data.initialized, false);

  const forbidden = await request("/admin/faq", {
    token: userToken,
    method: "PUT",
    body: { faqItems: initialFaq },
  });
  assert.equal(forbidden.status, 403);

  const created = await request("/admin/faq", {
    token: adminToken,
    method: "PUT",
    body: { faqItems: initialFaq },
  });
  assert.equal(created.status, 200);
  assert.deepEqual(created.body.data.faqItems, initialFaq);

  const updated = await request("/admin/faq/faq-one", {
    token: adminToken,
    method: "PATCH",
    body: { question: "Updated question?", answer: "Updated answer.", category: "Technical" },
  });
  assert.equal(updated.status, 200);
  assert.deepEqual(updated.body.data.faqItems[0], {
    id: "faq-one",
    question: "Updated question?",
    answer: "Updated answer.",
    category: "Technical",
  });
  assert.deepEqual(updated.body.data.faqItems[1], initialFaq[1]);

  const publicAfterEdit = await request("/home/faq");
  assert.equal(publicAfterEdit.body.data.faqItems[0].answer, "Updated answer.");

  const deleted = await request("/admin/faq", {
    token: adminToken,
    method: "PUT",
    body: { faqItems: updated.body.data.faqItems.filter((item) => item.id !== "faq-one") },
  });
  assert.equal(deleted.status, 200);
  assert.deepEqual(deleted.body.data.faqItems, [initialFaq[1]]);

  const invalid = await request("/admin/faq", {
    token: adminToken,
    method: "PUT",
    body: { faqItems: [{ id: "bad", question: "", answer: "Missing question" }] },
  });
  assert.equal(invalid.status, 400);
});
