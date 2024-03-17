import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { LegalUsers } from './models/legal-user.entity';
import { LegalUsersService } from './legal-user.service';
import { CreateLegalUserDto } from './dto/create-legal-user.dto';

@ApiTags('Legal Users')
@Controller('legal-users')
export class LegalUsersController {
    constructor(private readonly legalUsersService: LegalUsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new legal user' })
    @ApiResponse({ status: 201, description: 'The legal user has been successfully created.', type: LegalUsers })
    @ApiBadRequestResponse({ description: 'Invalid input data.' })
    async createLegalUser(@Body() createLegalUserDto: CreateLegalUserDto): Promise<LegalUsers> {
        return this.legalUsersService.createLegalUser(createLegalUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all legal users' })
    @ApiResponse({ status: 200, description: 'Returns all legal users.', type: LegalUsers, isArray: true })
    async findAllLegalUsers(): Promise<LegalUsers[]> {
        return this.legalUsersService.findAllLegalUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a legal user by ID' })
    @ApiResponse({ status: 200, description: 'Returns the legal user.', type: LegalUsers })
    @ApiNotFoundResponse({ description: 'Legal user not found.' })
    async findLegalUserById(@Param('id') id: number): Promise<LegalUsers> {
        return this.legalUsersService.findLegalUserById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a legal user by ID' })
    @ApiResponse({ status: 200, description: 'The legal user has been successfully updated.', type: LegalUsers })
    @ApiNotFoundResponse({ description: 'Legal user not found.' })
    async updateLegalUser(@Param('id') id: number, @Body() updateLegalUserDto: CreateLegalUserDto): Promise<LegalUsers> {
        return this.legalUsersService.updateLegalUser(id, updateLegalUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a legal user by ID' })
    @ApiResponse({ status: 200, description: 'The legal user has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'Legal user not found.' })
    async deleteLegalUser(@Param('id') id: number): Promise<boolean> {
        const deleted = await this.legalUsersService.deleteLegalUser(id);
        return deleted;
    }
}
