import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers: AuthPayloadDto[] = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
    { username: 'test', password: 'test' },
];

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    validateUser({ username, password }: AuthPayloadDto) {
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
        const token = this.jwtService.sign({username});   
        return token;
    }
}
