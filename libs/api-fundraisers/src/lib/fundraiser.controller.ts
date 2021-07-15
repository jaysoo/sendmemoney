import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Fundraiser } from '@sendmemoney/shared-models/fundraiser';
import { FundraiserService } from './fundraiser.service';
import { FundraiserCreateDto } from './fundraiser-create.dto';

@Controller('fundraisers')
export class FundraiserController {
  constructor(private service: FundraiserService) {}

  @Get()
  async getAllFundraisers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    @Query('email') email?: string
  ): Promise<Fundraiser[]> {
    return this.service.findFundraisers(page, perPage, email);
  }

  @Get('/:id')
  async getFundraiser(@Param('id') id: string): Promise<Fundraiser> {
    return this.service.getFundraiser(id);
  }

  @Post()
  async addFundraiser(@Body() dto: FundraiserCreateDto): Promise<Fundraiser> {
    return await this.service.addFundraiser(dto);
  }
}
