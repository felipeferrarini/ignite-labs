import { Field, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Student {
  @Field()
  id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
