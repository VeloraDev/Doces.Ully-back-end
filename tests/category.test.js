import supertest from "supertest";
import app from "../app";
const request = supertest(app);

describe("GET /categories", () => {
  it("Deve retornar um array de categorias, com status 200", async () => {
    const res = await request.get("/categories");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
