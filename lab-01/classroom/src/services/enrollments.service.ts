import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCouseAndStudentIdParas {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParas {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  getByCouseAndStudentId({ courseId, studentId }: GetByCouseAndStudentIdParas) {
    return this.prismaService.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromStudent(studentId: string) {
    return this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
        studentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createEnrollment({ courseId, studentId }: CreateEnrollmentParas) {
    return this.prismaService.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
