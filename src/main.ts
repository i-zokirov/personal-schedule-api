import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule
} from '@nestjs/swagger'
import { AppModule } from './app.module'

const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Schelule API',
  swaggerOptions: {
    authActions: {
      bearerAuth: {
        name: 'Bearer',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      },
      value: 'Bearer <JWT>'
    }
  }
}

const config = new DocumentBuilder()
  .setTitle('Schelule API')
  .setDescription('')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
  .build()

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api', app, document, customOptions)

  app.enableCors({ origin: '*', credentials: true })
  app.useWebSocketAdapter(new IoAdapter(app))
  await app.listen(PORT)
}
bootstrap()
