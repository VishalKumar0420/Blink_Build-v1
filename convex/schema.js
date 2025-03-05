import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
    token:v.optional(v.number())
  }).index("by_uid", ["uid"])
  .index("users_by_email", ["email"]),

  workspace: defineTable({
    messages: v.array(v.any()), 
    fileData: v.optional(v.any()), 
    userId: v.id("users"), 
  }).index("by_user", ["userId"]),
  
});
