# Repo Multi Cloner

Clone repo into multiple **new** Gitlab repo.
This script is quite messy, I had to wrote it fast :).

## How To Run?

```bash
git clone URL
// fill .env file and project folder
npm i
node index.js

```

## Parameters

Params are set in .env file.

| Param  | Type | Description | Is Required | example |
|---|---|---|---|---|
| GITLAB_TOKEN  | string  | Token to auth against GitLab  | *| |
| GROUP_ID  | number | ID Of GitLab Group -> The script pushes into the group`s subgroups  | *| |
| FORBIDDEN_IDS  | array\<number>  | Token to auth against GitLab  | *|1,2,3|
------