import { AppDataSource } from "../data-source";
import { Athlete } from "../schema/Athlete.schema";
import { User } from "../schema/User.schema";

export class RegisterRepo {
    async registerAthlete(name: string, email: string, password: string) {
        console.log('user')
        const user = new User();
        user.email = email;
        user.password = password;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        await AppDataSource.manager.save(user);
        console.log('athlete')
        const athlete = new Athlete();
        athlete.name = name;
        athlete.document = "document";
        athlete.birthDate = new Date();
        athlete.user = user;
        athlete.createdAt = new Date();
        athlete.updatedAt = new Date();
        await AppDataSource.manager.save(athlete);
        return 'Atleta salvo com sucesso';
    }
}