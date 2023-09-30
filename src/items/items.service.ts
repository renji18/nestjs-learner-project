import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async addItem(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async deleteItem(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove({ _id: id });
  }

  async updateItem(id: string, newData: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate({ _id: id }, newData, {
      new: true,
    });
  }
}
