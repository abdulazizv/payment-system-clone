import { ApiProperty } from "@nestjs/swagger";
import { DataType,HasMany,Table,Model,Column } from "sequelize-typescript";

@Table({tableName: 'banks'})

export class Banks extends Model<Banks> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({example: 'Sanoat qurilish bank',description:'name of bank'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false
    })
    bank_name: string;
}