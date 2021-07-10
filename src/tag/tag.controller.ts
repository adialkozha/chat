import { Controller, Get } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }
    @Get()
    async findAll(): Promise<{ tags: string[] }> {
        const list = await this.tagService.findAll();
        return {
            tags: list.map((tag) => tag.name),
        };
    }
}