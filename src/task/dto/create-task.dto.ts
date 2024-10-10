import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsString()
  priority: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;
}
