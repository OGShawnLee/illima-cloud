import { db } from "@db"

export interface DocumentShape {
  id: string
  user_id: string;
  name: string
  title: string;
  content: {},
  is_archived: boolean,
  created_at: string,
  updated_at: string
}

export type DocumentSnapshot = Pick<DocumentShape, "id" | "title" | "updated_at" | "is_archived">; 

export const DocumentDAO = {
  async createOne(idUser: string) {
    return db.from("documents").insert({ user_id: idUser, title: "Untitled Document", content: {} }).select("*").single();
  },
  async getOne(id: string) {
    return db.from("documents").select("*").eq("id", id).single();
  },
  async getAll(idUser: string) {
    return db.from("documents").select("id, title, updated_at, is_archived").eq("user_id", idUser).order("updated_at", { ascending: false }) ;
  },
  async updateOneContent(id: string, content: {}) {
    return db.from("documents").update({ content }).eq("id", id).single();
  },
  async updateOneTitle(id: string, title: string) {
    return db.from("documents").update({ title }).eq("id", id).single();
  },
  async deleteOne(id: string) {
    return db.from("documents").delete().eq("id", id).single();
  }
}