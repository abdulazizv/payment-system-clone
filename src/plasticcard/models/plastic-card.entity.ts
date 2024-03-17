import { Entity,PrimaryGeneratedColumn,Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
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

    @ApiProperty()
    @Column()
    card_number: string;

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
    @Column({nullable: true})
    password: number;

    @ApiProperty()
    @Column({type: 'numeric',precision: 10,scale: 2,nullable: true})
    amount: number;

    @ApiProperty()
    @Column()
    phone_number: string;
    
    @Column()
    status: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => PhysicalUsers)
    @JoinColumn({name: 'user_id'})
    user: PhysicalUsers;

    @ManyToOne(() => Banks)
    @JoinColumn({ name: 'bank_id'})
    banks: Banks;
}