import { ApiProperty } from "@nestjs/swagger";
import { Banks } from "src/bank/models/bank.entity";
import { LegalUsers } from "src/legaluser/models/legal-user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(({name:'account_number',database:'connection2'}))

export class AccountNumber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    valid_date: Date;

    @ApiProperty({description:'Account number'})
    @Column({nullable: false,unique: true})
    account_number: string;

    @ApiProperty()
    @Column({type: 'numeric',precision: 10,scale: 2,nullable: true})
    amount: number;

    @ApiProperty({description: 'bank id'})
    @Column()
    bank_id: number;
    
    @ApiProperty({description: 'user id'})
    @Column()
    user_id: number;

    @ManyToOne(() => LegalUsers)
    @JoinColumn({name: 'user_id'})
    user: LegalUsers;

    @ManyToOne(() => Banks)
    @JoinColumn({ name: 'bank_id'})
    banks: Banks;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}