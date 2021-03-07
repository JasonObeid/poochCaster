import { Controller, Get, Param, Req, Post, Body, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

let PodcastIndexClient = require("podcastdx-client");
const API_KEY = 'NBQWUW27WADSKUYNJFND';
const API_SECRET = 'vJWk#9wEAXeRtZH^dtsENxSgDCXM6SQs2$VjEr3D';
const client = new PodcastIndexClient({
  key: API_KEY,
  secret: API_SECRET,
  enableAnalytics: false
});
import { OAuth2Client } from 'google-auth-library';
const clients = new OAuth2Client("384920596947-68g7ga9dfqt43bouolbrtghn45p9g2dt.apps.googleusercontent.com")
//require("dotenv").config({ path: './.env' }
//console.log(process.env.API_KEY)
@Controller("api")
export class ApiController {
  // @Post('resize')
  // async resize(@Body() body): Promise<string> {
  //   const filename = body.source.substring(body.source.lastIndexOf('/') + 1);
  //   const localFilePath = `${path.join(__dirname, 'img')}/${filename}`;
  //   console.log(body)
  //   const resizer = sharp().resize(body.width, body.height).toFile(localFilePath, (err, info) => { 
  //     console.log('err: ', err);
  //     console.log('info: ', info);
  //   });    
  //   axios.request(body.source).pipe(resizer);
  //   return localFilePath;
  // }
  //@UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    const { token } = req.body
    try {
      const ticket = await clients.verifyIdToken({
          idToken: token,
          audience: "384920596947-68g7ga9dfqt43bouolbrtghn45p9g2dt.apps.googleusercontent.com"
      });
      const { name, email, picture } = ticket.getPayload();
      return { loginSuccess: true, name: name, email: email, picture: picture };
    }
    catch {
      return { loginSuccess: false };
    }
  }

  @Post('getSubscriptionsDetails')
  async getSubscriptionsDetails(@Body() body): Promise<Array<any>> {
    let subscriptionsArray:Array<any> = [];
    const subs = body.subscriptions;
    for (let index = 0; index < subs.length; index++) {
      const resp = await client.podcastById(subs[index]);
      subscriptionsArray.push(resp.feed);
    }
    return subscriptionsArray;
  }
  @Post('getFeedEpisodes')
  async getFeedEpisodes(@Body() body): Promise<Array<any>> {
    let episodesArray:Array<any> = [];
    const subs = body.subscriptions;
    for (let index = 0; index < subs.length; index++) {
      const subEpisodes = await client.episodesByFeedId(subs[index]);
      for (const episode of subEpisodes.items) {
          episodesArray.push(episode);
      }
    }
    const sortedEpisodes = episodesArray.sort(function (a, b) {
        return b.datePublished - a.datePublished;
    });
    return sortedEpisodes;
  }
  @Get()
  findAll(): string {
    return "resp";
  }
  @Get('search/:term')
  async test(@Param() params): Promise<any> {
    console.log(params)
    const resp = client.search(params.term);
    return resp;
  }
  @Get('podcasByUrl/:url')
  async podcastByUrl(@Param() params): Promise<any> {
    console.log(params)
    const resp = client.podcastByUrl(params.url);
    return resp;
  }
  @Get('podcastById/:id')
  async podcastById(@Param() params): Promise<any> {
    const resp = await client.podcastById(params.id);
    return resp;
  }
  @Get('podcastByItunesId/:id')
  async podcastByItunesId(@Param() params): Promise<any> {
    const resp = await client.podcastByItunesId(params.id);
    return resp;
  }
  @Get('episodesByFeedId/:id')
  async episodesByFeedId(@Param() params): Promise<any> {
    const resp = await client.episodesByFeedId(params.id);
    return resp;
  }
  @Get('episodesByFeedUrl/:url')
  async episodesByFeedUrl(@Param() params): Promise<any> {
    const resp = await client.episodesByFeedUrl(params.url);
    return resp;
  }
  @Get('episodesByItunesId/:id')
  async episodesByItunesId(@Param() params): Promise<any> {
    const resp = await client.episodesByItunesId(params.id);
    return resp;
  }
  @Get('recentEpisodes/:number/:exclude)')
  async recentEpisodes(@Param() params): Promise<any> {
    const resp = await client.recentEpisodes(
      params.number,
      params.exclude,
    );
    return resp;
  }
}
