import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDTO } from '../DTO/LoginDTO.dto';
import { Repository } from 'typeorm';
import { Admin } from 'src/entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}
  async findOne(logindata: LoginDTO): Promise<any> {
    return await this.adminRepo.findOneBy({ email: logindata.email });
  }
  async findbyEmail(email: string) {
    return await this.adminRepo.findOne({ where: { email: email } });
  }
  async addAdmin(adminData: Partial<Admin>): Promise<Admin> {
    // Check if admin already exists
    const existingAdmin = await this.adminRepo.findOne({
      where: { email: adminData.email },
    });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const admin = this.adminRepo.create(adminData);
    return this.adminRepo.save(admin);
  }
}
