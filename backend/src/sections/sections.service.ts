import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  async createDummySections(idea: string): Promise<Section[]> {
    const dummySections = [
      { type: 'Hero', content: `Welcome to ${idea}!` },
      { type: 'About', content: `This is an About section for ${idea}.` },
      {
        type: 'Contact',
        content: `Contact us at contact@${idea.replace(/\s+/g, '').toLowerCase()}.com`,
      },
    ];

    const docs = await this.sectionModel.insertMany(dummySections);
    return docs;
  }

  async getAllSections(): Promise<Section[]> {
    return this.sectionModel.find().sort({ createdAt: 1 }).exec();
  }
}
