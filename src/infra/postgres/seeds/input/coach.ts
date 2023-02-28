import { UserStatus } from "../../../../domain/enum/UserStatus";

export const coachesToSeed = [
  {
    email: "jorge@cwb.com",
    name: "Jorge Guimarães",
    document: "23016610086",
    birthdate: new Date("04/05/1962"),
    cref: "057515-G/SP",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2023-01-01 16:18:01.685"),
    team: {
      name: "Curitiba",
      code: "C65OQ3",
    },
  },
  {
    email: "roberto@colombo.com",
    name: "Roberto Novaes",
    document: "42775666850",
    birthdate: new Date("08/15/1979"),
    cref: "032300-G/RJ",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2023-01-22 17:21:32.003"),
    team: {
      name: "Colombo",
      code: "VZX98C",
    },
  },
  {
    email: "erick@cmourao.com",
    name: "Erick Noronha",
    document: "18357986323",
    birthdate: new Date("01/24/1987"),
    cref: "028776-G/PR",
    status: UserStatus.COACH_WITH_TEAM,
    createdAt: new Date("2023-01-01 13:00:14.967"),
    team: {
      name: "Campo Mourão",
      code: "E7WPL3",
    },
  },
  {
    email: "alberto@gmail.com",
    name: "Alberto Cruz",
    document: "86961491812",
    birthdate: new Date("08/04/1990"),
    cref: "423899-G/PR",
    status: UserStatus.COACH_WITHOUT_TEAM,
    createdAt: new Date("2023-01-01 14:22:51.385"),
  },
  {
    email: "cristovao@gmail.com",
    name: "Cristovão Bueno",
    document: "86961491812",
    birthdate: new Date("08/04/1989"),
    cref: "423899-G/PR",
    status: UserStatus.COACH_WITHOUT_TEAM,
    createdAt: new Date("2023-01-01 14:22:51.385"),
  },
];
