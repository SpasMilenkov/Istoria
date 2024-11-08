import { PrismaClient } from '@istoria/database';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
