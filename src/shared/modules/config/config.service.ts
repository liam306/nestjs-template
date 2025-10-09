import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import { EnvVars } from './env.schema';

@Injectable()
export class ConfigService {
  constructor(public readonly config: Config<EnvVars>) {}
}
