import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { UserService } from 'src/user/user/user.service';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly UserService: UserService,
  ) {}
  @UseGuards(AuthAdminGuard)
  @Get('findbyEmail/:email')
  async findAdminByEmail(@Param('email') email: string): Promise<object> {
    const admin = await this.adminService.findbyEmail(email);
    return admin;
  }
}
