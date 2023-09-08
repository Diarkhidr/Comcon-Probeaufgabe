import { Controller, UseInterceptors, ClassSerializerInterceptor, UseGuards, Post, Req, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './model/user.model';
import { TimeTracking } from './model/timetracking.model';
import { Project } from './model/project.model';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('admin')
export class AdminController {

  @Get('user')
  async GetUsers() {
    return User.find();
  }

  @Get('project')
  async GetProjects(@Req() req: any) {
    return Project.find();
  }

  @Post('project')
  async CreateProject(@Body() tracking: TimeTracking) {
      let track = new TimeTracking();
      track.project = tracking.project;
      track.startDate = tracking.startDate;
      track.endDate = tracking.endDate;
      return track.save();
  }

  @Put('project/:id')
  async UpdateProject(@Param('id') id: string, @Body() tracking: TimeTracking) {
      let track = await TimeTracking.findOne(id);
      track.project = tracking.project;
      track.startDate = tracking.startDate;
      track.endDate = tracking.endDate;
      return track.save();
  }

  @Delete('project/:id')
  async DeleteProject(@Param('id') id: string) {
      let track = await TimeTracking.findOne(id);
      return track.remove();
  }

  @Get('tracking')
  async GetTrackings(@Req() req: any) {
    return TimeTracking.find();
  }
}
