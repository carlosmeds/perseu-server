import { RequestStatus } from "../../../../domain/enum/RequestStatus";
import { UserStatus } from "../../../../domain/enum/UserStatus";

export const requestsToSeed = [
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 1,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-23 16:18:01.685"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 2,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-22 09:50:54.431"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 3,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-11 15:30:24.347"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 4,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-17 19:18:21.322"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 5,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-17 15:28:34.094"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 6,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-27 12:58:58.319"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 7,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-07 02:40:00.922"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 8,
    teamId: 2,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-04 02:56:03.425"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 9,
    teamId: 2,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-30 22:45:32.878"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 10,
    teamId: 2,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-30 16:22:12.448"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 11,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-16 14:39:39.109"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 12,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-10 04:13:19.998"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 13,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-17 23:08:19.477"),
  },
  {
    requestStatus: RequestStatus.ACCEPTED,
    athleteId: 14,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_TEAM,
    createdAt: new Date("2023-01-26 11:11:14.349"),
  },
  {
    requestStatus: RequestStatus.PENDING,
    athleteId: 15,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_PENDING_TEAM,
    createdAt: new Date("2023-01-24 12:00:11.685"),
  },
  {
    requestStatus: RequestStatus.PENDING,
    athleteId: 16,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITH_PENDING_TEAM,
    createdAt: new Date("2023-01-28 02:20:14.602"),
  },
  {
    requestStatus: RequestStatus.DECLINED,
    athleteId: 17,
    teamId: 1,
    athleteStatus: UserStatus.ATHLETE_WITHOUT_TEAM,
    createdAt: new Date("2023-01-22 11:50:53.096"),
  },
  {
    requestStatus: RequestStatus.DECLINED,
    athleteId: 18,
    teamId: 2,
    athleteStatus: UserStatus.ATHLETE_WITHOUT_TEAM,
    createdAt: new Date("2023-01-20 10:19:31.233"),
  },
  {
    requestStatus: RequestStatus.PENDING,
    athleteId: 19,
    teamId: 2,
    athleteStatus: UserStatus.ATHLETE_WITH_PENDING_TEAM,
    createdAt: new Date("2023-01-27 14:40:08.321"),
  },
  {
    requestStatus: RequestStatus.PENDING,
    athleteId: 20,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_PENDING_TEAM,
    createdAt: new Date("2022-07-23 07:25:01.033"),
  },
  {
    requestStatus: RequestStatus.PENDING,
    athleteId: 21,
    teamId: 3,
    athleteStatus: UserStatus.ATHLETE_WITH_PENDING_TEAM,
    createdAt: new Date("2023-01-22 19:57:59.333"),
  },
];