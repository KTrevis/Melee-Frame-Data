import styles from "/styles/Layout.module.css"
import Link from "next/link"

export default function Layout({children}){
	return(
    <>
      <div className={styles.centerImage}>
        <Link href="/"><img src="/assets/logo.png" alt="" /></Link>
      </div>
      {children}
    </>
      )
}
