export interface Team {
  idTeam: string;
  idESPN: string | null;
  intLoved: string;
  strTeam: string;
  strTeamAlternate: string;
  strTeamShort: string;
  intFormedYear: string;
  strSport: string;
  strLeague: string;
  idLeague: string;
  strDivision: string | null;
  idVenue: string;
  strStadium: string;
  strKeywords: string;
  strLocation: string;
  intStadiumCapacity: string;
  strWebsite: string;
  strFacebook: string;
  strTwitter: string;
  strInstagram: string;
  strDescriptionEN: string;
  strColour1: string;
  strColour2: string;
  strColour3: string;
  strGender: string;
  strCountry: string;
  strBadge: string;
  strLogo: string;
  strFanart1: string;
  strFanart2: string;
  strFanart3: string;
  strFanart4: string;
  strBanner: string;
  strEquipment: string;
  strYoutube: string;
  strRSS: string;
  strLocked: string;
}

export interface Player {
  idPlayer: string;
  idTeam: string;
  strPlayer: string;
  strTeam: string;
  strSport: string;
  strNationality: string;
  dateBorn: string | null;
  strNumber: string | null;
  strPosition: string | null;
  strStatus: string | null;
  strThumb: string | null;
  strDescriptionEN: string | null;
}

export interface TeamsApiResponse {
  teams: Team[] | null;
}

export interface PlayersApiResponse {
  player: Player[] | null;
}
