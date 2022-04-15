import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller('test')
export class TestController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  async hello() {
    return this.prismaService.customer.findMany();
  }
}
