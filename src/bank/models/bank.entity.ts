import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'banks',database:'connection2' })
export class Banks {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Sanoat qurilish bank', description: 'name of bank' })
  @Column({ unique: true })
  bank_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
