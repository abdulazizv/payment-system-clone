import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'legalusers',database: 'connection2'})

export class LegalUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "Najot ta'lim"})
    @Column({unique: true})
    company_name: string;

    @ApiProperty({example: 'Full name'})
    @Column()
    full_name: string;

    @ApiProperty({example: '998900249424'})
    @Column()
    phone: string;

    @ApiProperty({ example: 'nodirbek@gmail.com' })
    @Column()
    email: string;

    @ApiProperty({ example: 'AA213123' })
    @Column({ unique: true })
    passport: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}