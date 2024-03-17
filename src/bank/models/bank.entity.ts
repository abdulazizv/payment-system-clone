import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'banks' })
export class Banks {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Sanoat qurilish bank', description: 'name of bank' })
  @Column({ unique: true })
  bank_name: string;
}
