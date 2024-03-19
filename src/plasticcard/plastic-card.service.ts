import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlasticCard } from "./models/plastic-card.entity";
import { Repository } from "typeorm";
import { CreatePlasticCardDto } from "./dto/create-plasticcard.dto";
import { UpdatePlasticCardDto } from "./dto/update-plasticcard.dto";
import { createPlasticCardUserDto } from './dto/create-plastic-card-via-user.dto';
import { TypePlasticCardEnum } from "src/utils/credit-cards.enum";
import * as randomize from 'randomatic';
import { UpdatePasswordCardDto } from "./dto/update-password.card.dto";
import { PhysicalUserService } from "src/physicaluser/physical-user.service";
import { CreatePhysicalUserDto } from "src/physicaluser/dto/create-physical-user.dto";
import { BankService } from "src/bank/bank.service";

@Injectable()
export class PlasticCardService {
    constructor(
        @InjectRepository(PlasticCard,'connection2')
        private readonly plasticCardRepository: Repository<PlasticCard>,
        private readonly physicalUserService: PhysicalUserService,
        private readonly bankService: BankService
    ) { }

    async createPlasticCard(params: CreatePlasticCardDto) {
        let card_number_prefix = '';
        switch (params.type_card) {
            case TypePlasticCardEnum.Uzcard:
                card_number_prefix = '8600';
                break;
            case TypePlasticCardEnum.Humo:
                card_number_prefix = '9860';
                break;
            case TypePlasticCardEnum.Mir:
                card_number_prefix = '5614';
                break;
            default:
                throw new Error('Invalid card type');
        }

        let card_number_suffix = randomize('0',12);

        const card_number = `${card_number_prefix}${card_number_suffix}`;

        const valid_date = new Date();
        valid_date.setFullYear(valid_date.getFullYear() + 5);

        const new_data = this.plasticCardRepository.create({
            ...params,
            card_number,
            valid_date,
            status: false
        })

        const saved_plastic_card = await this.plasticCardRepository.save(new_data);
        
        const response = {
            status: 201,
            message:"success",
            url: `http://localhost:7777/plastic-card/password/${saved_plastic_card.id}`
        }

        return response;
    }

    async createPlasticCardByUser(params: createPlasticCardUserDto) {
        const userParams: CreatePhysicalUserDto = {
            passport: params.passport,
            first_name: params.first_name,
            last_name: params.last_name,
            birth_date: params.birth_date
        }

        const {id} = await this.physicalUserService.createPhysicalUser(userParams);

        if(!id) {
            throw new HttpException(
                'Error on finding error',
                HttpStatus.BAD_REQUEST
            )
        }

        let card_number_prefix = '';
        switch (params.type_card) {
            case TypePlasticCardEnum.Uzcard:
                card_number_prefix = '8600';
                break;
            case TypePlasticCardEnum.Humo:
                card_number_prefix = '9860';
                break;
            case TypePlasticCardEnum.Mir:
                card_number_prefix = '5614';
                break;
            default:
                throw new Error('Invalid card type');
        }

        let card_number_suffix = randomize('0',12);

        const card_number = `${card_number_prefix}${card_number_suffix}`;

        const valid_date = new Date();
        valid_date.setFullYear(valid_date.getFullYear() + 5);

        const new_data = this.plasticCardRepository.create({
            ...params,
            card_number,
            valid_date,
            status: false,
            user_id: id
        })

        const saved_plastic_card = await this.plasticCardRepository.save(new_data);
        
        const response = {
            status: 201,
            message:"success",
            url: `http://localhost:7777/plastic-card/password/${saved_plastic_card.id}`
        }

        return response;
    }

    async findPlasticCardById(id: number): Promise<PlasticCard> {
        const data:any = await this.plasticCardRepository
        .createQueryBuilder('plastic_card')
        .leftJoinAndSelect('plastic_card.user', 'user')
        .where('plastic_card.id = :id', { id })
        .getOne();

        data.bank = await this.bankService.findBankById(data.bank_id);

        return data;
    }
    
    async findPlasticCardsByUserId(user_id: number) {
        const data:any = await this.plasticCardRepository
        .createQueryBuilder('plastic_card')
        .leftJoinAndSelect('plastic_card.user', 'user')
        .where('plastic_card.user_id = :user_id', { user_id })
        .getMany();

        for (let x of data) {
            x.bank = await this.bankService.findBankById(x.bank_id)
        }
        return data;
    }

    async updatePlasticCard(id: number,params: UpdatePlasticCardDto) {
        await this.plasticCardRepository.update(id,{...params});
        return this.findPlasticCardById(id);
    }

    async updatePasswordCard(id: number,params: UpdatePasswordCardDto) {
        const data = await this.plasticCardRepository.update(id,{...params,status: true});
        return this.findPlasticCardById(id);
    }

    async deletePlasticalCard(id: number): Promise<boolean> {
        const deleteResult = await this.plasticCardRepository.delete(id);
        return deleteResult.affected > 0;
    }

}