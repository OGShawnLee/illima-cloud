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
  async createOneForDocument(idUser: string, idDocument: string, content: string) {
    return db.from("sparks").insert({ user_id: idUser, document_id: idDocument, content }).select("*").single();
  },
  async getAll(idUser: string) {
    return db.from("sparks").select("*").eq("user_id", idUser).is("document_id", null).order("created_at", { ascending: false }) ;
  },
  async getAllByDocument(idDocument: string) {
    return db.from("sparks").select("*").eq("document_id", idDocument).order("created_at", { ascending: false }) ;
  },
  async deleteOne(id: string) {
    return db.from("sparks").delete().eq("id", id).single();
  }
}