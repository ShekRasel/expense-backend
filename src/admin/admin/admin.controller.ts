import {
  Controller,
  Get,
  Param,
  UseGuards,
  Delete,
  NotFoundException,
  ParseIntPipe 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { UserService } from 'src/user/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthAdminGuard)
  @Get('findbyEmail/:email')
  async findAdminByEmail(@Param('email') email: string): Promise<object> {
    const admin = await this.adminService.findbyEmail(email);
    return admin;
  }

  @UseGuards(AuthAdminGuard) // Ensure only admins can access this endpoint
  @Delete('users/:id')
async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<{ message: string }> {
  try {
    await this.adminService.deleteUser(userId);
    return { message: `User with ID ${userId} has been deleted successfully` };
  } catch (error) {
    throw new NotFoundException(error.message);
  }
}
}