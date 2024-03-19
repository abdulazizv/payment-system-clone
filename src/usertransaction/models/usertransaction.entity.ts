import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import crypto from 'node:crypto';
import { Transaction } from "src/transaction/models/transaction.entity";

@Entity({name: 'usertransaction',database: 'connection2'})
export class UserTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transaction_id: number;

    @OneToOne(() => Transaction)
    @JoinColumn({name:'transaction_id'})
    transaction: Transaction;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}