const mongoose = require("mongoose");

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const userSchema = new mongoose.Schema(
    {
        projectname: {
            type: String,
            trim: true,
            required: [true, "project name is required"],
        },
        slug: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
        },
        projecttype: {
            type: String,
            required: [true, "project type is required"]
        },
        projecttypeSlug: {
            type: String,
            trim: true,
            lowercase: true,
        },
        companyname: {
            type: String,
        },
        projectoverview: {
            type: String,
        },
        projectrequirements: {
            type: String,
        },
        workdescription: {
            type: String,
        },
        keyfeatures: {
            type: String,
        },
        projectgallery: [
            { type: String, }
        ],
        mainimage: {
            type: String,
        },
        technologies: [
            { type: String, }
        ],
        projectlink: {
            type: String,
        },
        maintechnology: [{
           maintech: { type: String,},
           techname: { type: String,}
        },]
    },
    {
        timestamps: true,
    },
);

userSchema.pre("validate", async function () {
  if (this.isModified("projectname") || !this.slug) {
    const baseSlug = generateSlug(this.projectname || "project");
    let slug = baseSlug;
    let count = 0;

    while (await mongoose.models.projects.findOne({ slug, _id: { $ne: this._id } })) {
      count += 1;
      slug = `${baseSlug}-${count}`;
    }

    this.slug = slug;
  }

  if (this.isModified("projecttype") || !this.projecttypeSlug) {
    this.projecttypeSlug = generateSlug(this.projecttype || "");
  }
});

module.exports = mongoose.model("projects", userSchema);