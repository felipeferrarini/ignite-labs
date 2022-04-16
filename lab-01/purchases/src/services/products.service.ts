import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  listAllProducts() {
    return this.prismaService.product.findMany();
  }

  getProductById(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Product with same slug already exists');
    }

    return await this.prismaService.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
