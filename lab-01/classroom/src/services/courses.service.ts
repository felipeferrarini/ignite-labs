import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
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

  getCourseBySlug(slug: string) {
    return this.prismaService.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
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
