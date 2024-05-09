import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardsService } from './boards.service';

import { CreateBoardDto } from './dto/create-board.dto';

import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('여기는 BoardsController입니다.');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(
      `${user.username} 사용자가 모든 게시물을 가져오고 있습니다.`,
    );
    return this.boardsService.getAllBoards(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `${user.username} 사용자가 새로운 게시물을 생성하고 있습니다. Payload: ${JSON.stringify(createBoardDto)}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
