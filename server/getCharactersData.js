import fs from "fs"
import fsPromises from 'fs/promises';
import path from 'path'

export async function getCharacterFrameData(character) {
  const jsonFile = path.join(process.cwd(), `framedata-json/${character}.json`);
  const jsonData = await fsPromises.readFile(jsonFile, "utf8");

  return jsonData;
}

export function getCharactersNames(){
  const folderPath = path.join(process.cwd(), 'public/assets/csps/');
  const filesPath = fs.readdirSync(folderPath);
  const charactersNames = [];

  for(let i = 0; i < filesPath.length; i++){
    charactersNames.push(filesPath[i].toLowerCase().replace(".png", "").replace(" ", "-").replace(".",""))
  }

  return charactersNames
}

export function getCspsFilePath(){
  const folderPath = path.join(process.cwd(), 'public/assets/csps/');
  const filesPath = fs.readdirSync(folderPath);
  const fullFilesPath = [];

  for(let i = 0; i < filesPath.length; i++){
    let folderName = process.cwd() + "/public/assets/gifs/" + filesPath[i].replace(".png", "");
    if(!fs.existsSync(folderName)) fs.mkdirSync(folderName);
  }

  for(let i = 0; i < filesPath.length; i++){
    fullFilesPath.push("./assets/csps/" + filesPath[i]);
  }

  return fullFilesPath;
}

export function convertCharacterName(str){
  str = str.replace("-", " ");
  str = str.split('');
  str[0] = str[0].toUpperCase();

  for(let i = 1; i < str.length; i++){
    str[i] == " " ? str[i + 1] = str[i + 1].toUpperCase() : "";
  }

  str = str.toString();
  str = str.replaceAll(",", "");

  return str;
}

export function getAttackFrames(characterName, attackName){
  const folderPath = path.join(process.cwd(), `public/assets/frames/${characterName}/${attackName}`);
  const frames = fs.readdirSync(folderPath);

  for(let i = 0; i < frames.length; i++){
    frames[i] = `/assets/frames/${characterName}/${attackName}/${frames[i]}`;
  }

  return frames;
}

export async function getAttackTotalFrames(characterName, attackName){
  let response = await getCharacterFrameData(characterName);
  response = JSON.parse(response);
  let keys = [
    Object.keys(response.grounded),
    Object.keys(response.aerials),
    Object.keys(response.specials),
    Object.keys(response.grabs)
  ];


  for(let i = 0; i < keys.length; i++){
    let currentAttackType = Object.keys(response)[i];
    for(let j = 0; j < keys[i].length; j++){
      let currentAttack = {
        attackName: response[currentAttackType][keys[i][j]].name,
        totalFrames: response[currentAttackType][keys[i][j]].totalFrames
      }

      if(attackName == currentAttack.attackName) return currentAttack.totalFrames;
    }
  }
}