import { Controller, Post, Get, Put, Param, Body, Patch, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PlasticCardService } from './plastic-card.service';
import { CreatePlasticCardDto } from './dto/create-plasticcard.dto';
import { UpdatePlasticCardDto } from './dto/update-plasticcard.dto';
import { createPlasticCardUserDto } from './dto/create-plastic-card-via-user.dto';
import { PlasticCard } from './models/plastic-card.entity';
import { UpdatePasswordCardDto } from './dto/update-password.card.dto';

@ApiTags('Plastic Cards')
@Controller('plastic-cards')
export class PlasticCardController {
    constructor(private readonly plasticCardService: PlasticCardService) {}

    @ApiOperation({ summary: 'Create a plastic card for a user' })
    @ApiCreatedResponse({ description: 'The plastic card has been successfully created' })
    @ApiBadRequestResponse({ description: 'Error creating plastic card by user' })
    @ApiBody({ type: createPlasticCardUserDto })
    @Post('create-by-user')
    async createPlasticCardByUser(@Body() createPlasticCardUserDto: createPlasticCardUserDto) {
        try {
            const response = await this.plasticCardService.createPlasticCardByUser(createPlasticCardUserDto);
            return response;
        } catch (error) {
            console.log(error)
            throw new HttpException('Error creating plastic card by user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: 'Create a new plastic card' })
    @ApiBody({ type: CreatePlasticCardDto })
    @ApiResponse({ status: 201, description: 'The plastic card has been successfully created' })
    @Post()
    async createPlasticCard(@Body() createPlasticCardDto: CreatePlasticCardDto) {
        return this.plasticCardService.createPlasticCard(createPlasticCardDto);
    }

    @ApiOperation({ summary: 'Get plastic card by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Return the plastic card with the specified ID', type: PlasticCard })
    @Get('user/:id')
    async findPlasticCardByUserId(@Param('id') id: number): Promise<PlasticCard[]> {
        return this.plasticCardService.findPlasticCardsByUserId(id);
    }


    @ApiOperation({ summary: 'Get plastic card by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Return the plastic card with the specified ID', type: PlasticCard })
    @Get(':id')
    async findPlasticCardById(@Param('id') id: number): Promise<PlasticCard> {
        return this.plasticCardService.findPlasticCardById(id);
    }

    @ApiOperation({ summary: 'Update plastic password card by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdatePasswordCardDto })
    @ApiResponse({ status: 200, description: 'Return the updated plastic card', type: PlasticCard })
    @Patch('plastic-card/password/:id')
    async update(@Param('id') id: number, @Body() updatePlasticCardDto: UpdatePasswordCardDto): Promise<PlasticCard> {
        return this.plasticCardService.updatePasswordCard(id, updatePlasticCardDto);
    }

    @ApiOperation({ summary: 'Update plastic card by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdatePlasticCardDto })
    @ApiResponse({ status: 200, description: 'Return the updated plastic card', type: PlasticCard })
    @Patch(':id')
    async updatePlasticCard(@Param('id') id: number, @Body() updatePlasticCardDto: UpdatePlasticCardDto): Promise<PlasticCard> {
        return this.plasticCardService.updatePlasticCard(id, updatePlasticCardDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<boolean> {
        return this.plasticCardService.deletePlasticalCard(id);
    }

}
