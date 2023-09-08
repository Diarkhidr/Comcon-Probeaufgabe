import { Controller, UseInterceptors, ClassSerializerInterceptor, UseGuards, Post, Req, Get, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './model/user.model';
import { TimeTracking } from './model/timetracking.model';
import { Project } from './model/project.model';
import { Equal, IsNull } from 'typeorm';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

  @Get('self')
  async GetSelf(@Req() req: any) {
    return req.user;
  }

  @Get('project')
  async GetProjects(@Req() req: any, @Query('query') query?: string) {
    let user: User = req.user;
    return (await user.projects).filter((prj) => prj.title.toLowerCase().indexOf((query || '').toLowerCase()) > -1);
  }

  @Get('project/:id')
  async GetProject(@Req() req: any, @Param('id') id: string) {
    let user: User = req.user;
    return (await user.projects).find(project => project.id);
  }

  @Get('tracking')
  async GetTrackings(@Req() req: any) {
    let user: User = req.user;
    return user.trackings;
  }

  @Get('tracking/current')
  async GetCurrentTracking(@Req() req: any) {
    return await TimeTracking.findOne({where: {endDate: IsNull()}});
  }

  @Get('tracking/:id')
  async GetTracking(@Req() req: any, @Param('id') id: string) {
    return await TimeTracking.findOne(id);
  }

  @Post('tracking')
  async CreateTracking(@Req() req: any, @Body() tracking: any) {
      let track = new TimeTracking();
      track.project = await Project.findOne(tracking.projectId);
      track.user = req.user;
      track.trackings = tracking.trackings;
      track.startDate = tracking.startDate;
      track.endDate = tracking.endDate;
      return track.save();
  }

  @Put('tracking/:id')
  async UpdateTracking(@Req() req: any, @Param('id') id: string, @Body() tracking: any) {
      let track = await TimeTracking.findOne(id);
      track.startDate = tracking.startDate;
      track.trackings = tracking.trackings;
      track.endDate = tracking.endDate;
      return track.save();
  }

  @Delete('tracking/:id')
  async DeleteTracking(@Req() req: any, @Param('id') id: string) {
      let track = await TimeTracking.findOne(id);
      return track.remove();
  }
}
