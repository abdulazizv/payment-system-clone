import { Entity,PrimaryGeneratedColumn,Column, OneToMany, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { string } from "yargs";
import { TypePlasticCardEnum } from "src/utils/credit-cards.enum";
import { PhysicalUsers } from "src/physicaluser/models/physical-user.entity";
import { Banks } from "src/bank/models/bank.entity";

@Entity(({ name: 'plastic_card', database: 'connection2'}))
export class PlasticCard {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: 'Valid date of card'})
    @Column({type: Date,nullable: false})
    valid_date: Date;

    @ApiProperty({description: 'bank id'})
    @Column()
    bank_id: number;
    
    @ApiProperty({description: 'user id'})
    @Column()
    user_id: number;

    @ApiProperty()
    @Column({type: 'enum',enum: TypePlasticCardEnum})
    type_card: TypePlasticCardEnum;

    @ApiProperty()
    @Column()
    password: number;

    @ApiProperty()
    @Column({type: 'numeric',precision: 10,scale: 2})
    amount: number;

    @Column({type: Boolean,default: false})
    status: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => PhysicalUsers)
    user: PhysicalUsers;

    @ManyToOne(() => Banks)
    banks: Banks;
}