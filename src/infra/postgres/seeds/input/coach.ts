import { UserStatus } from "../../../../domain/enum/UserStatus";

export const coachesToSeed = [
  {
    email: "pep@city.com",
    name: "Pep Guardiola",
    document: "23016610086",
    birthdate: new Date("04/05/1962"),
    cref: "057515-G/SP",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2022-09-22 16:18:01.685"),
    team: {
      name: "Manchester City",
      code: "C65OQ",
    },
  },
  {
    email: "klopp@.liverpool.com",
    name: "Jürgen Klopp",
    document: "42775666850",
    birthdate: new Date("08/15/1975"),
    cref: "032300-G/RJ",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2022-10-22 17:21:32.003"),
    team: {
      name: "Liverpool",
      code: "VZX98",
    },
  },
  {
    email: "ten.hag@united.com",
    name: "Erik ten Hag",
    document: "18357986323",
    birthdate: new Date("01/24/1987"),
    cref: "028776-G/PR",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2022-11-22 13:00:14.967"),
    team: {
      name: "Manchester United",
      code: "E7WPL",
    },
  },
  {
    email: "alberto@gmail.com",
    name: "Alberto Valentim",
    document: "86961491812",
    birthdate: new Date("08/04/1990"),
    cref: "423899-G/PR",
    status: UserStatus.COACH_WITHOUT_TEAM,
    createdAt: new Date("2022-11-22 14:22:51.385"),
  },
];
