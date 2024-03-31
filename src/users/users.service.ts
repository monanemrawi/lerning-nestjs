import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Mona',
      email: 'Mona@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Ayham',
      email: 'Ayham@loml.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Lena',
      email: 'Lena@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Aya',
      email: 'Aya@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Wasan',
      email: 'Wasan@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(createUserDto: CreateUsersDto) {
    const usersByHighestId = [...this.users].sort((a, b) => (b.id = a.id));
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
