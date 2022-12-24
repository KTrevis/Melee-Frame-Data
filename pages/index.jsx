import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import styles from "/styles/Home.module.css"
import {useRouter} from "next/router"

export default function Home(props) {
  const router = useRouter();

  function showCharacterFrameData(event){ 
    router.push(event.target.dataset.charactername);
  }

  const images = props.images.map((image, index) => {
    return <img key={index} onClick={showCharacterFrameData} 
    data-charactername={props.charactersNames[index]} src={image} />
  })

  return (
    <div className={styles.container}>
      <div className={styles.cspContainer}>
        {images}
      </div>
    </div>
  )
}

import {getCharactersNames, getCspsFilePath} from "/server/getCharactersData"

export async function getStaticProps() {
  const images = getCspsFilePath();
  const charactersNames = getCharactersNames();

  return{
    props: {
      images,
      charactersNames
    }
  }
}