const { spec } = require("pactum");
const { string } = require("pactum-matchers");

it("generate token", async () => {
  const userData = {
    userName: "Aszton",
    password: "thisIsTest1!",
  };

  await spec()
    .post("https://demoqa.com/Account/v1/GenerateToken")
    .withJson(userData)
    .withHeaders({})
    .expectJsonMatch({
      token: string(),
    })
    .stores("TOKEN", "token")
    .expectBodyContains("User authorized successfully.")
    .expectStatus(200);
});

it("load token", async () => {
  await spec()
    .get(
      "https://demoqa.com/Account/v1/User/99f9a612-023f-49eb-b285-796455b889f7"
    )
    .withHeaders({
      Authorization: "Bearer $S{TOKEN}",
      "Content-Type": "application/json",
    })
    .expectStatus(200);
});

it("get books", async () => {
  await spec()
  .get("https://demoqa.com/BookStore/v1/Books")
  .expectStatus(200)
})