import { Controller, Post, Body, Get } from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async create(@Body('idea') idea: string) {
    return this.sectionsService.createDummySections(idea);
  }

  @Get()
  async findAll() {
    return this.sectionsService.getAllSections();
  }
}
