import { PartialType } from "@nestjs/swagger";
import { CreateAccountNumberDto } from "./create-account-number.dto";

export class updateAccountNumberDto extends PartialType(CreateAccountNumberDto) {}