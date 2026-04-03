import { db } from "@db";

export interface CaptureShape {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export const CaptureDAO = {
  async createOne(idUser: string, content: string) {
    return db.from("sparks").insert({ user_id: idUser, content }).select("*").single();
  },
  async getAll(idUser: string) {
    return db.from("sparks").select("*").eq("user_id", idUser).order("created_at", { ascending: false }) ;
  },
  async deleteOne(id: string) {
    return db.from("sparks").delete().eq("id", id).single();
  }
}