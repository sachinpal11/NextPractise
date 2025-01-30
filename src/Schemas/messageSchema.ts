import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(10, { message: "Content must be at least 10 Characters" }).max(300, { message: "content cannot greater than 300 Characters" })
})