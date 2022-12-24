import styles from "/styles/Attack.module.css"
import {useRouter} from "next/router"

export default function Attack(props){
	const router = useRouter();

	if(props.misc == true){
		return(
			<div className={styles.misc}>
				<h3>{props.attack.name}</h3>
				<p>Value : {props.attack.value}</p>
			</div>
			)
	}

	function handleImageClick(event){
		router.push(router.query.characterName + "/" + props.attack.name);
	}

	return(
		<div id={props.attack.name} className={styles.container}>
			<h3>{props.attack.name}</h3>
			<img src={props.gif} onClick={handleImageClick} alt="" />
			{props.attack.damage && <p>Damage : {`${props.attack.damage}`}</p>}
			<p>Active Frames : {`${props.attack.starts} - ${props.attack.ends}`}</p>
			<p>IASA : {`${props.attack.iasa}`}</p>	
			{props.attack.note && <p className={styles.note}>Note : {props.attack.note}</p>}
		</div>
		)
}