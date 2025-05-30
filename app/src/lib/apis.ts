import axios from "axios";
import { Member, Team } from "./types";

const apiUrl = 'http://localhost:9000';


/**
 * Get a list of teams
 * @returns A list of teams
 */
export const getTeams = () => axios.get<Team[]>(`${apiUrl}/teams`);