import { Controller, Get, Param, Req } from "@nestjs/common";
import PodcastIndexClient from "podcastdx-client";

// assumes you have an your key and secret set as environment variables
const API_KEY='NBQWUW27WADSKUYNJFND'
const API_SECRET='vJWk#9wEAXeRtZH^dtsENxSgDCXM6SQs2$VjEr3D'
const client = new PodcastIndexClient({
  key: API_KEY,
  secret: API_SECRET,
  enableAnalytics: false,
});
//require("dotenv").config({ path: './.env' });
//console.log(process.env.API_KEY)
@Controller("api")
export class ApiController {
  @Get()
  findAll(): string {
    return "processed";
  }
  @Get(':term')
  async test(@Param() params): Promise<Object> {
    console.log(params)
    const x = client.search(params.term);
    return x;
  }
}
