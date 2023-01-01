import fetch from "node-fetch";
import config from './config';

const { baseURL, groupId, gitlabToken, forbiddenIds } = config;

const spinner = ora('Loading unicorns').start();
const folders = await (await fetch(`${baseURL}/groups/${groupId}/subgroups`, {
    headers: [['PRIVATE-TOKEN', gitlabToken]]
})).json();


await Promise.all(folders.map(async (folder) => {
    const { id } = folder;
    if (forbiddenIds.find((forbiddenId) => forbiddenId == id)) return;
    const newProject = await (await fetch(`${baseURL}/projects`, {
        headers: [['PRIVATE-TOKEN', gitlabToken], ['Content-Type', 'application/json']],
        method: 'POST',
        body: {
            namespace_id: id,
            default_branch: 'master',
            name: 'CR Mission',
            initialize_with_readme: true,
        }
    })).json();
    const { id: newProjectId } = newProject;
    await fetch(`${baseURL}/projects/${newProjectId}/repository/branches?branch=develop&ref=master`, {
        headers: [['PRIVATE-TOKEN', gitlabToken], ['Content-Type', 'application/json']],
        method: 'POST',
    });
    await fetch(`${baseURL}/projects/${newProjectId}/repository/commits`, {
        headers: [['PRIVATE-TOKEN', gitlabToken], ['Content-Type', 'application/json']],
        method: 'POST',
    });

}));

spinner.succeed('DONE')