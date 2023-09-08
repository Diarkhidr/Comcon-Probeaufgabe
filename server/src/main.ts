import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './data/model/user.model';
import { Project } from './data/model/project.model';

async function createProject(title: string, description: string): Promise<Project> {
  let project = await Project.findOne({where: {title: title}});
  if(!project) {
    project = new Project();
    project.title = title;
    project.description = description;
    project = await project.save();
  }
  return project;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  let admin = await User.findOne({where: {userName: 'Administrator'}});
  if(!admin) {
    admin = new User();
    admin.userName = 'Administrator';
    admin.firstName = 'Armin';
    admin.lastName = 'Admin';
    admin.roles = ['admin', 'employee'];
    admin.setPassword('password');
    await admin.save();
  }

  let project1 = await createProject('TestProjekt 1', 'Beschreibung 1');
  let project2 = await createProject('TestProjekt 2', 'Beschreibung 2');
  let project3 = await createProject('TestProjekt 3', 'Beschreibung 3');
  let project4 = await createProject('TestProjekt 4', 'Beschreibung 4');
  let project5 = await createProject('TestProjekt 5', 'Beschreibung 5');


  let employee = await User.findOne({where: {userName: 'BBenutzer'}});
  if(!employee) {
    employee = new User();
    employee.userName = 'BBenutzer';
    employee.firstName = 'Bernd';
    employee.lastName = 'Benutzer';
    employee.roles = ['employee'];
    employee.projects = Promise.resolve([project1, project2, project5]);
    employee.setPassword('password');
    await employee.save();
  }

  employee = await User.findOne({where: {userName: 'MMitarbeiter'}});
  if(!employee) {
    employee = new User();
    employee.userName = 'MMitarbeiter';
    employee.firstName = 'Max';
    employee.lastName = 'Mitarbeiter';
    employee.roles = ['employee'];
    employee.projects = Promise.resolve([project3, project4, project5]);
    employee.setPassword('password');
    await employee.save();
  }  

  await app.listen(3000);
}
bootstrap();
