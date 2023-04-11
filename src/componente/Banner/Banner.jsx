import React from 'react'

import imageUrl from '../../assets/imagini/banner.svg'

import styles from './BannerElements.module.scss';


const Banner = () => {
  return (
    <div className={`${styles.textImageContainer} ${styles.bnr}`}>
      <div className={styles.textImageContainerText}>
        <h2 className={styles.textImageContainerTitle}>NOI AVEM GRIJA DE INTREAGA TA CALATORIE</h2>
        <p className={styles.textImageContainerDescription}>DESCRIERE</p>
      </div>
      <div className={styles.textImageContainerImage}>
        <img src={imageUrl} alt="Image" />
      </div>
    </div>

  )
}

export default Banner