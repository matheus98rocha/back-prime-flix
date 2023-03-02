import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Res() response) {
    try {
      const users = await this.userService.get();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        users,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Users not founded',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  async create(@Res() response, @Body() body: CreateUserDto) {
    try {
      const userCreate = await this.userService.create(body);
      return response.status(HttpStatus.CREATED).json({
        message: `User has been created successfully`,
        userCreate,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not created',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/:id')
  async getById(@Res() response, @Param('id') id: string) {
    try {
      const userFounded = await this.userService.getById(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        userFounded,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not founded',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Patch('/:id')
  async updateUser(
    @Res() response,
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ) {
    try {
      const userUpdated = await this.userService.update(body, id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        userUpdated,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not updated',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') id: string) {
    try {
      const userDeleted = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        userDeleted,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not deleted',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
