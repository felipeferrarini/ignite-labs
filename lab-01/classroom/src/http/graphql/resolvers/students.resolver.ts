import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@UseGuards(AuthorizationGuard)
@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField(() => Enrollment)
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listAllFromStudent(student.id);
  }
}
