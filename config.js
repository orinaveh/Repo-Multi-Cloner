import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

export default {
    baseURL: env.get('BASE_URL').default('https://gitlab.com/api/v4'),
    groupId: env.get('GROUP_ID').asIntPositive().required(),
    gitlabToken: env.get('GITLAB_TOKEN').required(),
    forbiddenIds: env.get('FORBIDDEN_IDS').asArray().default([]),
}