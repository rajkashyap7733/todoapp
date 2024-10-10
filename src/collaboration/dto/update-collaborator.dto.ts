import { IsDate, IsOptional, IsString } from "class-validator"

export class CollaboratorUpdateDto {


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
}