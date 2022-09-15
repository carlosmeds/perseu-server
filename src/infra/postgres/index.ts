import { AppDataSource } from "./data-source";
import { Athlete } from "./schema/Athlete.schema";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new athlete into the database...");
    const athlete = new Athlete();
    athlete.name = "Timber";
    athlete.document = "25";
    athlete.birthDate = new Date();
    await AppDataSource.manager.save(athlete);
    console.log("Saved a new athlete with id: " + athlete.id);

    console.log("Loading athletes from the database...");
    const athletes = await AppDataSource.manager.find(Athlete);
    console.log("Loaded athletes: ", athletes);
  })
  .catch((error) => console.log(error));
