import styles from "/styles/CharacterFrameData.module.css"
import Attack from "/components/Attack"

export default function CharacterFrameData(props){
	const display = {
		Grounded: [],
		Aerials: [],
		Specials: [],
		Grabs: [],
		Misc: []
	}

	const gifPath = `assets/gifs/${props.characterName}/`

	for(let i = 0; i < Object.keys(props.frameData.grounded).length; i++){
		display.Grounded.push(Object.values(props.frameData.grounded)[i]);
		display.Grounded[i] = <Attack gif={gifPath + display.Grounded[i].name + ".gif"} attack={display.Grounded[i]} key={i} />
	}

	for(let i = 0; i < Object.keys(props.frameData.aerials).length; i++){
		display.Aerials.push(Object.values(props.frameData.aerials)[i]);
		display.Aerials[i] = <Attack gif={gifPath + display.Aerials[i].name + ".gif"} attack={display.Aerials[i]} key={i} />
	}

	for(let i = 0; i < Object.keys(props.frameData.specials).length; i++){
		display.Specials.push(Object.values(props.frameData.specials)[i]);
		display.Specials[i] = <Attack gif={gifPath + display.Specials[i].name + ".gif"} attack={display.Specials[i]} key={i} />
	}

	for(let i = 0; i < Object.keys(props.frameData.grabs).length; i++){
		display.Grabs.push(Object.values(props.frameData.grabs)[i]);
		display.Grabs[i] = <Attack gif={gifPath + display.Grabs[i].name + ".gif"} attack={display.Grabs[i]} key={i} />
	}

	for(let i = 0; i < Object.keys(props.frameData.miscellaneous).length; i++){
		display.Misc.push(Object.values(props.frameData.miscellaneous)[i]);
		display.Misc[i] = <Attack gif={gifPath + display.Misc[i].name + ".gif"} misc={true} attack={display.Misc[i]} key={i} />
	}


	return(
		<div className={styles.container}>
			<h1>{props.characterName}</h1>
			<h2>Grounded</h2>
			<div className={styles.containerAttacks}>
				{display.Grounded}
			</div>
			<h2>Aerials</h2>
			<div className={styles.containerAttacks}>
				{display.Aerials}
			</div>
			<h2>Specials</h2>
			<div className={styles.containerAttacks}>
				{display.Specials}
			</div>
			<h2>Grabs</h2>
			<div className={styles.containerAttacks}>
				{display.Grabs}
			</div>
			<h2>Miscellaneous</h2>
			<div className={styles.containerAttacks}>
				{display.Misc}
			</div>
		</div>
		)
}

import { getCharactersNames, getCharacterFrameData, convertCharacterName } from "../../server/getCharactersData"

export async function getStaticProps({params}){
	let character = convertCharacterName(params.characterName);
	let frameData = await getCharacterFrameData(character);

	frameData = JSON.parse(frameData);

	return{
		props: {
			frameData,
			characterName: character,
		}
	}
}


export async function getStaticPaths(){
	let frameData = await getCharacterFrameData("Captain Falcon");
	frameData = JSON.parse(frameData);

	const charactersNames = getCharactersNames();

	for(let i = 0; i < charactersNames.length; i++){
		charactersNames[i] = {
			params: {
				characterName: charactersNames[i]
			}
		}
	}

	return{
		paths: charactersNames,
		fallback: false
	}
}