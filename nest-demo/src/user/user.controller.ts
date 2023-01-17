import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Header,
  Headers,
  HttpCode,
  Redirect,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

// @Controller({
//   path: 'user',
//   version: '1',
// })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // findAll(@Request() req) {
  findAll(@Query() query) {
    console.log('query', query);

    return {
      code: 200,
      message: query.name,
    };
  }

  @Post()
  // create(@Request() req) {
  // create(@Body() body) {
  create(@Body('age') age) {
    console.log(age);

    return {
      code: 200,
      message: age,
    };
  }

  // @Get(':id')
  // // @HttpCode(500)
  // // @Redirect('')
  // findId(@Param('id') id, @Headers() headers) {
  //   return {
  //     code: 200,
  //     id: id,
  //     headers,
  //   };
  // }

  // 一般放在Service里面
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 38,
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log('session.code', session.code);
    console.log('body.code', body.code);
    if (session.code?.toLowerCase() === body.code?.toLowerCase()) {
      return {
        code: 200,
        message: 'ok',
      };
    } else {
      return {
        code: 200,
        message: 'error',
      };
    }
  }
}
