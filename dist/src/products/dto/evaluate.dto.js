"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EvaluateDto {
    conditions;
}
exports.EvaluateDto = EvaluateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text conditions for filtering products',
        example: 'on sale and in stock',
        examples: {
            on_sale: {
                summary: 'Products on sale',
                value: 'on sale',
            },
            in_stock: {
                summary: 'Products in stock',
                value: 'in stock',
            },
            price_filter: {
                summary: 'Products under $50',
                value: 'price < 50',
            },
            category_filter: {
                summary: 'Electronics category',
                value: 'category = Electronics',
            },
            complex_filter: {
                summary: 'Complex filtering',
                value: 'price < 100 and in stock and category = Electronics',
            },
        },
    }),
    __metadata("design:type", String)
], EvaluateDto.prototype, "conditions", void 0);
//# sourceMappingURL=evaluate.dto.js.map