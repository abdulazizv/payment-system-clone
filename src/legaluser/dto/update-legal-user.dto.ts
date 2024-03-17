import { PartialType } from "@nestjs/swagger";
import { CreateLegalUserDto } from "./create-legal-user.dto";

export class UpdateLegalUserDto extends PartialType(CreateLegalUserDto) {}