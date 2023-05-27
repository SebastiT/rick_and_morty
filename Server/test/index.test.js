const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = (await agent.get("/rickandmorty/character/1")).body;
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response).toHaveProperty("species");
      expect(response).toHaveProperty("gender");
      expect(response).toHaveProperty("status");
      expect(response).toHaveProperty("origin");
      expect(response).toHaveProperty("image");
    });
    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/1102").expect(500);
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Validar que email y password son correctos", async () => {
      const email = "sebastiantovar1812@gmail.com";
      const password = "12345rick";
      const response = (
        await agent.get(
          `/rickandmorty/login/?email=${email}&password=${password}`
        )
      ).body;
      expect(response.access).toEqual(true);
    });
    it("Validar cuando el email y password son incorrectos", async () => {
      const email = "random@gmail.com";
      const password = "rick1234";
      const response = (
        await agent.get(
          `/rickandmorty/login/?email=${email}&password=${password}`
        )
      ).body;
      expect(response.access).toEqual(false);
    });
  });
  describe("POST /rickandmorty/fav", () => {
    const char1 = { id: 1, name: "Nombre 1" }
    const char2 = { id: 2, name: "Nombre 2" };
    it("Devuelve el objeto con el elemento enviado", async () => {
      const response = (await agent.post("/rickandmorty/fav").send(char1)).body;
      expect(response).toContainEqual(char1)
    })
    it("Devuelve el objeto con el elemento enviado anteriormente y el actual", async () => {
      const response = (await agent.post("/rickandmorty/fav").send(char2)).body;
      expect(response).toContainEqual(char1);
      expect(response).toContainEqual(char2);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    const char1 = { id: 1, name: "Nombre 1" };
    const char2 = { id: 2, name: "Nombre 2" };
    it("Validar que no haya un personaje con el id que se envia", async () => {
      const id = 3
      const response = (await agent.delete(`/rickandmorty/fav/${id}`)).body;
      expect(response).toContainEqual(char1);
      expect(response).toContainEqual(char2);
    })
    it("Validar que se elimine un personaje correctamente", async () => {
      const id = 1;
      const response = (await agent.delete(`/rickandmorty/fav/${id}`)).body;
      expect(response).not.toContainEqual(char1);
      expect(response).toContainEqual(char2);
    })
  });
});
