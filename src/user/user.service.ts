import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async get(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    const userFounded = await this.userModel.findById(id).exec();

    if (!userFounded) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return userFounded;
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const userFounded = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
    if (!userFounded) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return userFounded;
  }

  async delete(id: string) {
    const userFounded = await this.userModel.findByIdAndDelete(id).exec();

    if (!userFounded) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return userFounded;
  }
}
