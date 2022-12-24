import {useRouter} from "next/router"
import {useState} from "react"
import Link from "next/link"
import styles from "/styles/AttackName.module.css"

export default function AttackFrames(props){
	const [currentImage, setCurrentImage] = useState(1);
	const router = useRouter();

	function changeFrame(nbr){
		if(currentImage + nbr < 1){
			setCurrentImage(props.frames.length - 1)
		}
		else if(currentImage + nbr > props.frames.length - 1){
			setCurrentImage(1);
		}
		else{
			setCurrentImage(currentImage + (nbr))
		}
	}

	return(
		<div className={styles.container}>
			<Link href={`/${router.query.characterName}#${router.query.attackName}`} ><a href="" className={styles.closeAttackFrames}>X</a></Link>
			<img src={`/assets/frames/${props.characterName}/${router.query.attackName}/${router.query.attackName}[${currentImage}].png`} alt="" />
			<div className={styles.buttonContainer}>
				<button onClick={() => changeFrame(-1)}>Previous Frame</button>
				<button onClick={() => changeFrame(1)}>Next Frame</button>
			</div>
			<p>Current Frame : {currentImage}</p>
		</div>
		)
}

import {convertCharacterName, getAttackFrames} from "/server/getCharactersData"

export async function getServerSideProps({params}){
	const attackName = params.attackName
	const characterName = convertCharacterName(params.characterName);	

	const frames = getAttackFrames(characterName, attackName);

	return {
		props: {
			frames,
			characterName
		}
	}
}