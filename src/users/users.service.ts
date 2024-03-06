import { Injectable } from '@nestjs/common';

interface User {
    userId: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        // 这里把用户列表写死了. 在真正的应用程序中，用户列表应该从数据库获取
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'riddle',
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
            },
            {
                userId: 3,
                username: 'maria',
                password: 'guess',
            },
        ];
    }

    async findOne(username: string) {
        return this.users.find((user) => user.username === username);
    }
}

