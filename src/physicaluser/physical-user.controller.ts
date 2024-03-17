import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PhysicalUserService } from './physical-user.service';
import { PhysicalUsers } from './models/physical-user.entity';
import { CreatePhysicalUserDto } from './dto/create-physical-user.dto';
import { UpdatePhysicalUserDto } from './dto/update-physical-user.dto';

@ApiTags('Physical Users')
@Controller('physical-users')
export class PhysicalUserController {
    constructor(private readonly physicalUserService: PhysicalUserService) {}

    @ApiOperation({ summary: 'Create a new physical user' })
    @ApiBody({ type: CreatePhysicalUserDto })
    @ApiResponse({ status: 201, description: 'The physical user has been successfully created', type: PhysicalUsers })
    @Post()
    async createPhysicalUser(@Body() createPhysicalUserDto: CreatePhysicalUserDto): Promise<PhysicalUsers> {
        return this.physicalUserService.createPhysicalUser(createPhysicalUserDto);
    }

    @ApiOperation({ summary: 'Get all physical users' })
    @ApiResponse({ status: 200, description: 'Return all physical users', type: [PhysicalUsers] })
    @Get()
    async findAllPhysicalUsers(): Promise<PhysicalUsers[]> {
        return this.physicalUserService.findAllPhysicalUsers();
    }

    @ApiOperation({ summary: 'Get physical user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Return the physical user with the specified ID', type: PhysicalUsers })
    @Get(':id')
    async findPhysicalUserById(@Param('id') id: number): Promise<PhysicalUsers> {
        return this.physicalUserService.findPhysicalUserById(id);
    }

    @ApiOperation({ summary: 'Update physical user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdatePhysicalUserDto })
    @ApiResponse({ status: 200, description: 'Return the updated physical user', type: PhysicalUsers })
    @Put(':id')
    async updatePhysicalUser(@Param('id') id: number, @Body() updatePhysicalUserDto: UpdatePhysicalUserDto): Promise<PhysicalUsers> {
        return this.physicalUserService.updatePhysicalUser(id, updatePhysicalUserDto);
    }

    @ApiOperation({ summary: 'Delete physical user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Physical user has been successfully deleted', type: Boolean })
    @Delete(':id')
    async deletePhysicalUser(@Param('id') id: number): Promise<boolean> {
        return this.physicalUserService.deletePhysicalUser(id);
    }
}
