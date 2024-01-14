import { Module, forwardRef } from '@nestjs/common'
import { ConnectionsModule } from 'src/connections/connections.module'
import { SocketstateService } from './socketstate.service'

@Module({
  imports: [forwardRef(() => ConnectionsModule)],
  providers: [SocketstateService],
  exports: [SocketstateService]
})
export class SocketstateModule {}
