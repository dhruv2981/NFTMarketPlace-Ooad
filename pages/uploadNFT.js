import React, { useContext } from 'react'

//INTERNAL IMPORT
import Style from '../styles/upload-nft.module.css'
import { UploadNFT } from '../UploadNFT/uploadNFTIndex'

//Smart contract import
import { NFTMarketplaceContext } from '../Context/NFTMarketPlace'

const uploadNFT = () => {
  //smart contract
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext)
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New Bucket</h1>
          <p>
            You can set preferred display name, create your desired composition and
            manage other personal settings.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
        </div>
      </div>
    </div>
  )
}

export default uploadNFT
