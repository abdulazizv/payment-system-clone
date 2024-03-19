import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalUsers } from './models/legal-user.entity';
import { CreateLegalUserDto } from './dto/create-legal-user.dto';

@Injectable()
export class LegalUsersService {
    constructor(
        @InjectRepository(LegalUsers,'connection2')
        private readonly legalUsersRepository: Repository<LegalUsers>,
    ) {}

    async createLegalUser(createLegalUserDto: CreateLegalUserDto): Promise<LegalUsers> {
        try {
            return this.legalUsersRepository.save(createLegalUserDto)
        } catch(e) {
            console.log(e)
        }
    }

    async findAllLegalUsers(): Promise<LegalUsers[]> {
        return this.legalUsersRepository.find();
    }

    async findLegalUserById(id: number): Promise<LegalUsers> {
        const legalUser = await this.legalUsersRepository.findOne({where: {id }});
        if (!legalUser) {
            throw new NotFoundException('Legal user not found');
        }
        return legalUser;
    }

    async updateLegalUser(id: number, updateLegalUserDto: CreateLegalUserDto): Promise<LegalUsers> {
        const legalUser = await this.findLegalUserById(id);
        this.legalUsersRepository.merge(legalUser, updateLegalUserDto);
        return this.legalUsersRepository.save(legalUser);
    }

    async deleteLegalUser(id: number): Promise<boolean> {
        const result = await this.legalUsersRepository.delete(id);
        return result.affected > 0;
    }
}
