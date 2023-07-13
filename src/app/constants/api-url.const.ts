import { environment } from './../../environments/environment';


const API = environment.GATEWAY_API_URL;
const SKILL_TRACKER = API + '/skill-tracker';
const AUTH_API = SKILL_TRACKER + '/auth';
const ADMIN_API = SKILL_TRACKER + '/api/v1/admin';
const ENGINEER_API = SKILL_TRACKER + '/api/v1/engineer';

export const AUTH_URLS = {
  LOGIN: `${AUTH_API}/login`
};

export const COMMAND_URLS = {
  ADD_PROFILE: `${ENGINEER_API}/add-profile`,
  UPDATE_PROFILE: `${ENGINEER_API}/update-profile`
};

export const QUERY_URLS = {
  SEARCH_SKILLS: `${ADMIN_API}`
}
