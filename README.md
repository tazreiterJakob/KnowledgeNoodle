# KnowledgeNoodle
A simple AI-Tutor

![logo](/logo_KnowledgeNoodle.jpg)


[Trello-Board](https://trello.com/b/f0EG87VE/knowledgenoodle)


## Setup
- make shure you have node.js installed and configured
- clone the repo
- create a "key.txt"-file in the "src" directory and paste your OpenAI-API-Key in it
- run src/server.js with node


## Team Members
- Brandstetter Fabian ([@BrandstetterFabian](https://github.com/BrandstetterFabian)) - Frontend
- Schmölz Felix ([@schmoelzFelix](https://github.com/schmoelzFelix)) - Backend
- Tazreiter Jakob ([@tazreiterJakob](https://github.com/tazreiterJakob)) - Backend, Repo
- Wieser Jonas ([@JonasWieser](https://github.com/JonasWieser)) - Frontend


## Conventions
- (based on) GitHub-Flow
- use english if possible
- no commits on main (except README, ...)

### Files
- all code is stored in the src/-directory
- all files that are available publicly via the webserver are stored in the src/pages-directory
    - the paths in it are identical to the public paths o the webserver (src/pages/example.html = ourdomain.com/example.html)
- global media-files are stored in src/pages/media

### Branches
- feature: feature/[nameOfFeature]
- bug: bug/[nameOfBug]
- other: other/[fittingName]

### Commits
- frequent commits
- one topic/change per commit
- commit-messages start with lower-case, no period at the end
