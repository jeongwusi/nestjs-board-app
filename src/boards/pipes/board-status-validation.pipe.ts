import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    if (this.isStatusValid(value))
      throw new BadRequestException(`잘못된 입력입니다.`);

    return value;
  }

  private isStatusValid(value: any) {
    value = value.toUpperCase();

    return !this.StatusOptions.includes(value);
  }
}
