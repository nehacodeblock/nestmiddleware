import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('job')
export class JobController {
  @Get('refs')
  findJobRefs(@Req() req: Request) {
    console.log(req['ua'], 'ua in controller----');

    return { success: true, message: 'Job Refs List' };
  }

  @Post('refs')
  createJobRefs() {
    return { success: true, message: 'Job Refs created' };
  }
}
