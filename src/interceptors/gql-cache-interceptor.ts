import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Cache } from 'cache-manager'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class GqlCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context)
    const info = ctx.getInfo()
    const args = ctx.getArgs()
    const operationType = info.operation.operation // 'query' or 'mutation'

    // Cache handling for queries
    if (operationType === 'query') {
      const cacheKey = this.getCacheKey(info.fieldName, args)
      const cachedResponse = await this.cacheManager.get(cacheKey)

      if (cachedResponse) {
        console.log(`Cache hit - ${cacheKey}`)
        return of(cachedResponse)
      } else {
        console.log(`Cache miss - ${cacheKey}`)
      }

      return next.handle().pipe(
        tap((data) => {
          this.cacheManager.set(cacheKey, data)
        })
      )
    }

    // Invalidate cache for mutations
    if (operationType === 'mutation') {
      this.cacheManager.reset()
    }

    return next.handle()
  }

  private getCacheKey(fieldName: string, args: any): string {
    const argsString = JSON.stringify(args)
    return `${fieldName}-${argsString}`
  }
}
