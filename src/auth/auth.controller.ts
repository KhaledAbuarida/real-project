import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guard/local.guard';
import { JwtGuard } from './guard/jwt.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {

    // inject auth service
    constructor(private authService: AuthService) { }

    // login endpoint
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    // status endpoint
    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request) {
        return req.user;
    }
}
