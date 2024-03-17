import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhysicalUsers } from "./models/physical-user.entity";
import { Repository } from "typeorm";
import { CreatePhysicalUserDto } from "./dto/create-physical-user.dto";
import { UpdatePhysicalUserDto } from "./dto/update-physical-user.dto";

@Injectable()
export class PhysicalUserService {
    constructor(
        @InjectRepository(PhysicalUsers,'connection2')
        private readonly userRepository: Repository<PhysicalUsers>
    ){}

    async createPhysicalUser(user: CreatePhysicalUserDto): Promise<PhysicalUsers> {
        return this.userRepository.save(user);
    }

    async findAllPhysicalUsers(): Promise<PhysicalUsers[]> {
        return this.userRepository.find();
    }

    async findPhysicalUserById(id: number): Promise<PhysicalUsers> {
        return this.userRepository.findOne({where: {id}});
    }

    async updatePhysicalUser(id: number, userData: UpdatePhysicalUserDto): Promise<PhysicalUsers> {
        await this.userRepository.update(id, userData);
        return this.findPhysicalUserById(id);
    }

    async deletePhysicalUser(id: number): Promise<boolean> {
        const deleteResult = await this.userRepository.delete(id);
        return deleteResult.affected > 0;
    }
}