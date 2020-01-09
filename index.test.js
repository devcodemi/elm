const request = require("supertest");
const expect = require("chai").expect;
const app = require('./index.js').app;

describe("POST /save", () => {
    it("should add records and return response 200", async () => {
    const res =  request(app)
    .post("/save")
    .send({
        inst_name: "fake MIT",
        inst_type: "Medical",
        inst_address: "Fake main road",
        inst_city: "fake city",
        inst_state: "fake state", 
        inst_country: "fake country",
        inst_zip: "0000", 
        inst_status: "ACTIVE"
        })
        .expect(200);
    });
});

describe("GET /", () => {
    it("should return all records and return response 200", async () => {
        const res = request(app)
        .get("/")
        .expect(200);
    });
});

describe("GET /delete_all", () => {
    it("should delete all records and return response 200", async () => {
    const res = request(app)
    .get("/delete_all")
    .expect(200);
    });
});      