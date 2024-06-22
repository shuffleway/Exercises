process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest"); //npm i --save-dev supertest
// app imports
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "silly", price:200 }


beforeEach(function(){
    items.push(item);
});

afterEach(function(){
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () =>{
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [{ name: "silly", price:200 }]});
    })
})

describe("GET /items/:name", () => {
    test("Get item by name", async () =>{
        const res = await request(app).get(`/items/${item.name}`);
        console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "silly", price:200 } });
    })

    test("Get invalid item name", async () =>{
        const res = await request(app).get(`/items/icecube`);
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", () => {
    test("Creating an item", async () => {
     const res = await request(app).post("/items").send({name: "inny", price: 75});
     expect(res.statusCode).toBe(200);
     expect(res.body).toEqual({ item: { name: "inny", price: 75} });
    })

    test("Respond with 400 if name is mission", async () => {
        const res = await request(app).post("/items").send({name: "yumi"});
        expect(res.statusCode).toBe(400);
    })
})

describe("PATCH /items/:name", () => {
    test("Update an item using patch", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({name: "Monster"});;
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "Monster"} });
    })

    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).patch(`/items/Piggles`).send({name: "Monster"});;
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted"});
    })

    test("Deleting an invalid item", async () => {
        const res = await request(app).delete(`/items/kitchenbugger`);
        expect(res.statusCode).toBe(404);
    })
})