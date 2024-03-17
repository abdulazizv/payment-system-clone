import { PartialType } from "@nestjs/swagger";
import { CreatePhysicalUserDto } from "./create-physical-user.dto";

export class UpdatePhysicalUserDto extends PartialType(CreatePhysicalUserDto) {}