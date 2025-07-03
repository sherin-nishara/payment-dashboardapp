import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<string | null> {
    const user = await this.userModel.findOne({ username });
    if (user && user.password === password) {
      return this.jwtService.sign({ sub: user._id, username: user.username });
    }
    return null;
  }
}
