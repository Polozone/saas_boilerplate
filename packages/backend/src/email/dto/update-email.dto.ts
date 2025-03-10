import { PartialType } from '@nestjs/mapped-types';
import { SendEmailDto } from './send-email.dto';

export class UpdateEmailDto extends PartialType(SendEmailDto) {}
