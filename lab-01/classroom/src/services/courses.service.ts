import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  listAllCourses() {
    return this.prismaService.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getCourseById(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prismaService.course.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Course with same slug already exists');
    }

    return await this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
