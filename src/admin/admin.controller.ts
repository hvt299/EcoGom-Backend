import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin (Quản trị)')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập Admin' })
  @ApiBody({ schema: { type: 'object', properties: { passcode: { type: 'string' } } } })
  login(@Body() body: { passcode: string }) {
    return this.adminService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Tạo tài khoản Admin (Dùng để khởi tạo user đầu tiên)' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      required: ['username', 'password'],
      properties: { 
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: '*****' } 
      } 
    } 
  })
  createAdmin(@Body() body: any) {
    return this.adminService.createAdmin(body);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Lấy số liệu thống kê Dashboard' })
  getStats() {
    return this.adminService.getStats();
  }
}