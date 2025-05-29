import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findFirst() {
    return this.organizationService.findFirst();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }
}
