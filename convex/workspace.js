import Error from "next/error";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new workspace
export const createWorkspace = mutation({
  args: {
    userId: v.id("users"),
    messages: v.array(v.any()),
    fileData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      userId: args.userId,
      fileData: args.fileData ?? null,
    });
    console.log("id of workspace is ", workspaceId);

    return workspaceId;
  },
});

// Fetch a workspace by ID
export const getWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return workspace;
  },
});

// updating the messages
export const updateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const updatedMessage = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return updatedMessage;
  },
});

export const updateFiles = mutation({
  args: {
    workspaceId:v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return result;
  },
});


export const getAllWorkspace = query({
  args: v.object({
    userId: v.optional(v.id("users"))
  }),
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    return result;
  },
});

