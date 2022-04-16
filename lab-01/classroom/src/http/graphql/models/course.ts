import { Field, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Course {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => [Enrollment])
  enrolledOn: Enrollment[];
}
