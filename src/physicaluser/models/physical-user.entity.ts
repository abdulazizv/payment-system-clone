import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'physicalusers', database: 'connection2' })
export class PhysicalUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'AA213123' })
  @Column({ unique: true })
  passport: string;

  @ApiProperty({ example: 'Nodirbek' })
  @Column()
  first_name: string;

  @ApiProperty({ example: 'Qobilov' })
  @Column()
  last_name: string;

  @ApiProperty({ example: '12-02-1991' })
  @Column()
  birth_date: Date;
}
