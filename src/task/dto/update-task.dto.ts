import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsDate()
  @IsOptional()
    deadline?: Date;
    
    @IsNumber()
    userId:number
}
