import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as crypto from 'node:crypto';

@Entity({name: 'transaction',database: 'connection2'})
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    transaction_id: string;

    @BeforeInsert() 
    generateUUID() {
        this.transaction_id = crypto.randomUUID()
    }

    @Column({nullable: true})
    card_receiver: string;

    @Column({nullable: true})
    card_sender: string;

    @Column({nullable: true})
    account_number_receiver: string;

    @Column({nullable: true})
    account_number_sender: string;
         
    @Column()
    amount: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}