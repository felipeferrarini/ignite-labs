import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  listAllStudents() {
    return this.prismaService.student.findMany();
  }

  getStudentById(id: string) {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
    });
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prismaService.student.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
