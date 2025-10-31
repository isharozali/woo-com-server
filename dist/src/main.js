"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        skipMissingProperties: true,
    }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        next();
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WooCommerce Products Service')
        .setDescription('API for managing products from WooCommerce with filtering capabilities')
        .setVersion('1.0')
        .addTag('products', 'Product management operations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'WooCommerce Products API',
        customfavIcon: 'https://avatars.githubusercontent.com/u/54212428?s=200&v=4',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        ],
    });
    const port = process.env.PORT ?? 8000;
    const host = process.env.HOST ?? '0.0.0.0';
    await app.listen(port, host);
    console.log(`Application is running on: http://${host}:${port}`);
    console.log(`Swagger documentation available at: http://${host}:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map