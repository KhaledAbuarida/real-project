import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers: AuthPayloadDto[] = [
    { id:1, username: 'admin', password: 'admin' },
    { id:2, username: 'user', password: 'user' },
    { id:3, username: 'test', password: 'test' },
];

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    validateUser({ id, username, password }: AuthPayloadDto) {
        // find user in fake users
        const findUser = fakeUsers.find(user => user.username === username);

        // if user not found, return null
        if (!findUser) {
            return null;
        }
        // if password is not correct, return null
        if (findUser.password !== password) {
            return null;
        }
        
        // if password is correct, return the token
        const token = this.jwtService.sign({username, id: findUser.id});   
        return token;
    }
}
