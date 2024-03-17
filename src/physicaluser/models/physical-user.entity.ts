import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PlasticCard } from 'src/plasticcard/models/plastic-card.entity';


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

  @OneToMany(() => PlasticCard, card => card.user)
  cards: PlasticCard[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
