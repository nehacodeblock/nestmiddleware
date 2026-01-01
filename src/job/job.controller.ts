import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { IdException } from 'src/exception/id-exception';
import { IdExceptionFilter } from 'src/exception/id-exception.filter';

@Controller('job')
@UseFilters(HttpExceptionFilter)
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

  @Get(':id')
  findJobById(@Param('id', ParseIntPipe) id: number) {
    if (id <= 0) {
      throw new BadRequestException(
        'id should be greater than zero',
        'invalid id',
      );
      //   throw new HttpException(
      //     {
      //       error: 'invalid id',
      //       data: id,
      //       msg: 'it should be greater than zero',
      //     },
      //     HttpStatus.BAD_REQUEST,
      //   );
    }
    return { success: true, id };
  }

  @Get('customFilter/:id')
  @UseFilters(IdExceptionFilter)
  findJob(@Param('id', ParseIntPipe) id: number) {
    if (id <= 0) {
      throw new IdException();
    }
    return { success: true, id };
  }
}
