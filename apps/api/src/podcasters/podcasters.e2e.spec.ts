import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Podcaster } from "@poochCaster/models";
import * as supertest from "supertest";
import { Repository } from "typeorm";

import { configurationTest } from "../config/configuration.test";
import { getRootModuleImports } from "../utils";
import { PodcastersModule } from "./podcasters.module";

describe("Podcasts", () => {
  let app: INestApplication;
  let repository: Repository<Podcaster>;

  const dateExpectations = { createdAt: expect.any(String), updatedAt: expect.any(String) };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [...getRootModuleImports(configurationTest), PodcastersModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    repository = module.get("PodcastRepository");
  });

  afterEach(async () => {
    await repository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /podcasters", () => {
    it("should return an array of podcasters", async () => {
      await repository.save([{ text: "test-name-0" }, { text: "test-name-1" }]);

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get("/podcasters")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual([
        { id: expect.any(Number), text: "test-name-0", ...dateExpectations },
        { id: expect.any(Number), text: "test-name-1", ...dateExpectations },
      ]);
    });

    it("should return a single podcaster", async () => {
      const podcaster = await repository.save({ text: "test-name-0" });

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/podcasters/${podcaster.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual({ id: podcaster.id, text: "test-name-0", ...dateExpectations });
    });

    it("should create one podcaster", async () => {
      const podcaster = { text: "test-name-0" };

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post("/podcasters")
        .send(podcaster)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(body).toEqual({ id: expect.any(Number), text: "test-name-0", ...dateExpectations });
    });

    it("should create multiple podcasters", async () => {
      const podcasters = [{ text: "test-name-0" }, { text: "test-name-1" }];

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post("/podcasters/bulk")
        .send({ bulk: podcasters })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(body).toEqual([
        { id: expect.any(Number), text: "test-name-0", ...dateExpectations },
        { id: expect.any(Number), text: "test-name-1", ...dateExpectations },
      ]);
    });

    it("should update the name of a podcaster", async () => {
      const podcaster = await repository.save({ text: "test-name-0" });

      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/podcasters/${podcaster.id}`)
        .send({ text: "updated-name" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual({ id: expect.any(Number), text: "updated-name", ...dateExpectations });
    });

    it("should delete one podcaster", async () => {
      const podcaster = await repository.save({ text: "test-name-0" });

      await supertest
        .agent(app.getHttpServer())
        .delete(`/podcasters/${podcaster.id}`)
        .set("Accept", "application/json")
        .expect(200);
      const missingPodcast = await repository.findOne({ id: podcaster.id });

      expect(missingPodcast).toBe(undefined);
    });
  });
});
