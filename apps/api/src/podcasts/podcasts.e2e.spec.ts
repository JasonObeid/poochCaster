import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Podcast } from "@poochCaster/models"
import * as supertest from "supertest"
import { Repository } from "typeorm"

import { configurationTest } from "../config/configuration.test"
import { getRootModuleImports } from "../utils"
import { PodcastsModule } from "./podcasts.module"

describe("Podcasts", () => {
  let app: INestApplication
  let repository: Repository<Podcast>

  const dateExpectations = { createdAt: expect.any(String), updatedAt: expect.any(String) }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [...getRootModuleImports(configurationTest), PodcastsModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    repository = module.get("PodcastRepository")
  })

  afterEach(async () => {
    await repository.delete({})
  })

  afterAll(async () => {
    await app.close()
  })

  describe("GET /podcasts", () => {
    it("should return an array of podcasts", async () => {
      await repository.save([{ text: "test-name-0" }, { text: "test-name-1" }])

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get("/podcasts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)

      expect(body).toEqual([
        { id: expect.any(Number), text: "test-name-0", ...dateExpectations },
        { id: expect.any(Number), text: "test-name-1", ...dateExpectations },
      ])
    })

    it("should return a single podcast", async () => {
      const podcast = await repository.save({ text: "test-name-0" })

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/podcasts/${podcast.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)

      expect(body).toEqual({ id: podcast.id, text: "test-name-0", ...dateExpectations })
    })

    it("should create one podcast", async () => {
      const podcast = { text: "test-name-0" }

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post("/podcasts")
        .send(podcast)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)

      expect(body).toEqual({ id: expect.any(Number), text: "test-name-0", ...dateExpectations })
    })

    it("should create multiple podcasts", async () => {
      const podcasts = [{ text: "test-name-0" }, { text: "test-name-1" }]

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post("/podcasts/bulk")
        .send({ bulk: podcasts })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)

      expect(body).toEqual([
        { id: expect.any(Number), text: "test-name-0", ...dateExpectations },
        { id: expect.any(Number), text: "test-name-1", ...dateExpectations },
      ])
    })

    it("should update the name of a podcast", async () => {
      const podcast = await repository.save({ text: "test-name-0" })

      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/podcasts/${podcast.id}`)
        .send({ text: "updated-name" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)

      expect(body).toEqual({ id: expect.any(Number), text: "updated-name", ...dateExpectations })
    })

    it("should delete one podcast", async () => {
      const podcast = await repository.save({ text: "test-name-0" })

      await supertest
        .agent(app.getHttpServer())
        .delete(`/podcasts/${podcast.id}`)
        .set("Accept", "application/json")
        .expect(200)
      const missingPodcast = await repository.findOne({ id: podcast.id })

      expect(missingPodcast).toBe(undefined)
    })
  })
})
