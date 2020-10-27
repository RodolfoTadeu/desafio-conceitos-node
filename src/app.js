const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  
  repositories.push(repository)
  
  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {title, url, techs } = request.body
  const {id} = request.params
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'})
  }
  
  const repository = {
    id,
    title,
    url,
    techs,
    likes:  repositories[repositoryIndex].likes,
  }
  repositories[repositoryIndex] = repository

  response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex > 0) {
   
    repositories.splice(repositoryIndex, 1)
  }else {
    return response.status(400).json({error: 'Repository does not exists'})
  }
  
  response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'})
  }    
 
  repositories[repositoryIndex].likes ++ 

  response.json(repositories[repositoryIndex])
});

module.exports = app;
