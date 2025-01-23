import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user/user.service';
import { UserLoginDTO, CreateUserDTO } from 'src/user/DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private expenseService: ExpenseService,
  ) {}
  async signUp(myobj: CreateUserDTO): Promise<object> {
    const newUser = this.userRepo.create(myobj);
    const savedUser = await this.userRepo.save(newUser);
    await this.expenseService.createExpenseWithUserId(savedUser.id);
    return savedUser;
  }
  /*async signIn(logindata: UserLoginDTO): Promise<{ access_token: string }> {
    console.log('SignIn Attempt:', logindata.email);
    const user = await this.userService.findOne(logindata);
    if (!user) {
      console.error('User not found:', logindata.email);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('User found:', user.email);
    console.log('Stored Hashed Password:', user.password);
    const isMatch = await bcrypt.compare(
      logindata.password.trim(),
      user.password,
    );
    console.log('Password Match:', isMatch);
    if (!isMatch) {
      console.error('Password mismatch for user:', logindata.email);
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Token generated for user:', user.email);
    return {
      access_token: token,
    };
  }*/
  async signIn(logindata: UserLoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(logindata);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Define a secure payload
    const payload = {
      sub: user.id,
      username: user.username,
      userRole: user.role,
    };

    // Sign the token with the secure payload
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
